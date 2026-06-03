import { useState, useEffect } from 'react'
import { Gantt, ViewMode } from 'gantt-task-react'
import 'gantt-task-react/dist/index.css'
import { flattenTasksForGantt } from '../utils/dateUtils'
import './GanttChart.css'

function GanttChartComponent({ project }) {
  const [tasks, setTasks] = useState([])
  const [viewMode, setViewMode] = useState(ViewMode.Month)

  useEffect(() => {
    if (project?.tasks) {
      const flatTasks = flattenTasksForGantt(project.tasks)
      setTasks(flatTasks)
    }
  }, [project])

  if (tasks.length === 0) {
    return <div className="gantt-empty">Нет данных для отображения</div>
  }

  return (
    <div className="gantt-wrapper">
      <div className="gantt-controls">
        <button
          className={`control-btn ${viewMode === ViewMode.Day ? 'active' : ''}`}
          onClick={() => setViewMode(ViewMode.Day)}
        >
          День
        </button>
        <button
          className={`control-btn ${viewMode === ViewMode.Week ? 'active' : ''}`}
          onClick={() => setViewMode(ViewMode.Week)}
        >
          Неделя
        </button>
        <button
          className={`control-btn ${viewMode === ViewMode.Month ? 'active' : ''}`}
          onClick={() => setViewMode(ViewMode.Month)}
        >
          Месяц
        </button>
      </div>

      <div className="gantt-container">
        <Gantt
          tasks={tasks}
          viewMode={viewMode}
          // Read-only: pass empty handlers
          onDateChange={() => {}}
          onProgressChange={() => {}}
          onDoubleClick={() => {}}
          onSelect={() => {}}
        />
      </div>
    </div>
  )
}

export default GanttChartComponent