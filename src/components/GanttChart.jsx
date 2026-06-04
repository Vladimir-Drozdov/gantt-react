import { useState, useEffect, useCallback, useRef } from 'react'
import { Gantt, ViewMode } from 'gantt-task-react'
import 'gantt-task-react/dist/index.css'
import { flattenTasksForGantt } from '../utils/dateUtils'
import './GanttChart.css'

const MIN_COL_WIDTH = 48

const STATUS_MAP = {
  completed:  { label: 'Завершено',  cls: 'st-done'     },
  in_progress:{ label: 'В процессе', cls: 'st-progress'  },
  pending:    { label: 'Ожидание',   cls: 'st-pending'   },
  on_hold:    { label: 'На паузе',   cls: 'st-hold'      },
  default:    { label: 'Новое',      cls: 'st-new'       },
}

/* ══════════════════════════════════
   Resizable Header
══════════════════════════════════ */
function GtlHeader({ headerHeight, columns, onResize }) {
  const drag = useRef(null)

  const startDrag = (e, i) => {
    e.preventDefault()
    drag.current = { i, x0: e.clientX, w0: columns[i].width }
    const move = e2 => {
      if (!drag.current) return
      onResize(drag.current.i, Math.max(MIN_COL_WIDTH, drag.current.w0 + e2.clientX - drag.current.x0))
    }
    const up = () => {
      drag.current = null
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }

  return (
    <div className="gtl-header" style={{ height: headerHeight }}>
      {columns.map((col, i) => (
        <div key={col.id} className="gtl-hcell" style={{ width: col.width }}>
          <span className="gtl-hcell-label">{col.label}</span>
          <div className="gtl-resizer" onMouseDown={e => startDrag(e, i)} />
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════
   Resizable Table
══════════════════════════════════ */
function GtlTable({ rowHeight, tasks, columns, onExpanderClick }) {
  return (
    <div className="gtl-body">
      {tasks.map(task => {
        const isProject = task.type === 'project'
        const st = STATUS_MAP[task.status] ?? STATUS_MAP.default

        return (
          <div key={task.id} className="gtl-row" style={{ height: rowHeight }}>

            {/* Название */}
            <div className="gtl-cell gtl-cell-name" style={{ width: columns[0].width }}>
              <div className="gtl-name-inner"
                style={{ paddingLeft: `${(task.depth ?? 0) * 14 + 4}px` }}>
                {isProject ? (
                  <button
                    className={`gtl-arrow ${task.hideChildren ? '' : 'open'}`}
                    onClick={() => onExpanderClick(task)}
                    title={task.hideChildren ? 'Развернуть' : 'Свернуть'}
                  >▶</button>
                ) : (
                  <span className="gtl-dot" style={{ background: task.color }} />
                )}
                <span className="gtl-name-text" title={task.name}>{task.name}</span>
              </div>
            </div>

            {/* Статус */}
            <div className="gtl-cell" style={{ width: columns[1].width }}>
              <span className={`gtl-badge ${st.cls}`}>{st.label}</span>
            </div>

            {/* Дата нач. */}
            <div className="gtl-cell" style={{ width: columns[2].width }}>
              <span className="gtl-date">{task.start.toLocaleDateString('ru-RU')}</span>
            </div>

            {/* Дата зав. */}
            <div className="gtl-cell" style={{ width: columns[3].width }}>
              <span className="gtl-date">{task.end.toLocaleDateString('ru-RU')}</span>
            </div>

          </div>
        )
      })}
    </div>
  )
}

const colWidth = m => ({ [ViewMode.Day]: 38, [ViewMode.Week]: 60, [ViewMode.Month]: 95 }[m] ?? 95)

/* ══════════════════════════════════
   Main component
══════════════════════════════════ */
export default function GanttChartComponent({ project }) {
  const [tasks,    setTasks]    = useState([])
  const [viewMode, setViewMode] = useState(ViewMode.Month)

  const [columns, setColumns] = useState([
    { id: 'name',   label: 'Название',  width: 260 },
    { id: 'status', label: 'Статус',    width: 110 },
    { id: 'start',  label: 'Дата нач.', width: 95  },
    { id: 'end',    label: 'Дата зав.', width: 95  },
  ])

  const resize = useCallback((i, w) =>
    setColumns(p => p.map((c, j) => j === i ? { ...c, width: w } : c)), [])

  useEffect(() => {
    if (project?.tasks) setTasks(flattenTasksForGantt(project.tasks))
  }, [project])

  // Переключение свёрнутого/развёрнутого состояния группы
  const handleExpander = useCallback(task =>
    setTasks(p => p.map(t => t.id === task.id ? { ...t, hideChildren: !t.hideChildren } : t)),
  [])

  if (!tasks.length) return <div className="gantt-empty">Нет задач для отображения</div>

  const listW = columns.reduce((s, c) => s + c.width, 0)

  return (
    <div className="gantt-wrapper">
      {/* Тулбар */}
      <div className="gantt-toolbar">
        <div className="gantt-controls">
          {[[ViewMode.Day,'День'],[ViewMode.Week,'Неделя'],[ViewMode.Month,'Месяц']].map(([m,l]) => (
            <button
              key={m}
              className={`ctrl-btn ${viewMode === m ? 'active' : ''}`}
              onClick={() => setViewMode(m)}
            >{l}</button>
          ))}
        </div>
      </div>

      {/* Диаграмма Ганта */}
      <div className="gantt-scroll-area">
        <Gantt
          tasks={tasks}
          viewMode={viewMode}
          columnWidth={colWidth(viewMode)}
          todayColor="rgba(239,68,68,0.45)"
          arrowColor="#334466"
          fontFamily="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
          fontSize="12px"
          onDateChange={() => {}}
          onProgressChange={() => {}}
          onDoubleClick={() => {}}
          onSelect={() => {}}
          onExpanderClick={handleExpander}
          TaskListHeader={({ headerHeight }) => (
            <GtlHeader
              headerHeight={headerHeight}
              columns={columns}
              onResize={resize}
            />
          )}
          TaskListTable={({ rowHeight, tasks: t, onExpanderClick }) => (
            <GtlTable
              rowHeight={rowHeight}
              tasks={t}
              columns={columns}
              onExpanderClick={onExpanderClick ?? handleExpander}
            />
          )}
          listCellWidth={`${listW}px`}
        />
      </div>
    </div>
  )
}