import { useState, useEffect, useCallback, useRef } from 'react'
import { Gantt, ViewMode } from 'gantt-task-react'
import 'gantt-task-react/dist/index.css'
import { flattenTasksForGantt } from '../utils/dateUtils'
import './GanttChart.css'

const MIN_COL_WIDTH = 60

function ResizableHeader({ columns, onResize }) {
  const dragging = useRef(null)

  const onMouseDown = (e, index) => {
    e.preventDefault()
    dragging.current = { index, startX: e.clientX, startWidth: columns[index].width }

    const onMouseMove = (e) => {
      if (!dragging.current) return
      const delta = e.clientX - dragging.current.startX
      const newWidth = Math.max(MIN_COL_WIDTH, dragging.current.startWidth + delta)
      onResize(dragging.current.index, newWidth)
    }

    const onMouseUp = () => {
      dragging.current = null
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  return (
    <div className="gtl-header-row">
      {columns.map((col, i) => (
        <div
          key={col.id}
          className="gtl-header-cell"
          style={{ width: col.width, minWidth: col.width }}
        >
          <span className="gtl-header-label">{col.label}</span>
          <div
            className="gtl-resize-handle"
            onMouseDown={(e) => onMouseDown(e, i)}
            title="Потяните для изменения ширины"
          />
        </div>
      ))}
    </div>
  )
}

function ResizableTaskList({ columns, tasks }) {
  return (
    <div className="gtl-body">
      {tasks.map((task) => (
        <div key={task.id} className="gtl-row">
          {columns.map((col) => (
            <div
              key={col.id}
              className="gtl-cell"
              style={{ width: col.width, minWidth: col.width }}
              title={col.getValue(task)} // tooltip с полным текстом
            >
              <span className="gtl-cell-text">{col.getValue(task)}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const getColumnWidth = (mode) => {
  switch (mode) {
    case ViewMode.Day:   return 65
    case ViewMode.Week:  return 75
    case ViewMode.Month: return 120  
    default:             return 120
  }
}

function GanttChartComponent({ project }) {
  const [tasks, setTasks] = useState([])
  const [viewMode, setViewMode] = useState(ViewMode.Month)

  const [columns, setColumns] = useState([
    { id: 'name',  label: 'Название', width: 200, getValue: (t) => t.name },
    { id: 'start', label: 'Начало',   width: 130, getValue: (t) => t.start.toLocaleDateString('ru-RU') },
    { id: 'end',   label: 'Конец',    width: 130, getValue: (t) => t.end.toLocaleDateString('ru-RU') },
  ])

  const handleResize = useCallback((index, newWidth) => {
    setColumns((prev) =>
      prev.map((col, i) => (i === index ? { ...col, width: newWidth } : col))
    )
  }, [])
  

  useEffect(() => {
    if (project?.tasks) {
      const flatTasks = flattenTasksForGantt(project.tasks)
      setTasks(flatTasks)
    }
  }, [project])

  if (tasks.length === 0) {
    return <div className="gantt-empty">Нет данных для отображения</div>
  }

  const totalListWidth = columns.reduce((sum, c) => sum + c.width, 0)

  return (
    <div className="gantt-wrapper">
      <div className="gantt-controls">
        <button
          className={`control-btn ${viewMode === ViewMode.Day ? 'active' : ''}`}
          onClick={() => setViewMode(ViewMode.Day)}
        >День</button>
        <button
          className={`control-btn ${viewMode === ViewMode.Week ? 'active' : ''}`}
          onClick={() => setViewMode(ViewMode.Week)}
        >Неделя</button>
        <button
          className={`control-btn ${viewMode === ViewMode.Month ? 'active' : ''}`}
          onClick={() => setViewMode(ViewMode.Month)}
        >Месяц</button>
      </div>

      <div className="gantt-container">
        <Gantt
          tasks={tasks}
          viewMode={viewMode}
          columnWidth={getColumnWidth(viewMode)}
          // Пустые функции, т.к. read-only диаграмма
          onDateChange={() => {}}
          onProgressChange={() => {}}
          onDoubleClick={() => {}}
          onSelect={() => {}}
          // Кастомные колонки с resize
          TaskListHeader={({ headerHeight }) => (
            <div style={{ height: headerHeight }}>
              <ResizableHeader columns={columns} onResize={handleResize} />
            </div>
          )}
          TaskListTable={({ rowHeight, tasks: ganttTasks }) => (
            <div style={{ width: totalListWidth }}>
              <ResizableTaskList
                columns={columns}
                tasks={ganttTasks}
                rowHeight={rowHeight}
              />
            </div>
          )}
          listCellWidth={`${totalListWidth}px`}
        />
      </div>
    </div>
  )
}

export default GanttChartComponent