import { useState } from 'react'
import { formatDate } from '../utils/dateUtils'
import './TaskHierarchy.css'

function TaskHierarchy({ tasks }) {
  return (
    <div className="task-tree">
      {tasks.map(task => (
        <TaskNode key={task.id} task={task} depth={0} />
      ))}
    </div>
  )
}

function TaskNode({ task, depth }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const hasChildren = task.children && task.children.length > 0

  const statusLabels = {
    completed: 'Завершено',
    in_progress: 'В процессе',
    pending: 'Ожидание',
    on_hold: 'Приостановлено',
    default: 'Новое'
  }

  return (
    <>
      <div
        className="task-row"
        style={{ paddingLeft: `${depth * 16}px` }}
        data-status={task.status || 'default'}
      >
        {hasChildren && (
          <button
            className={`expand-btn ${isExpanded ? 'expanded' : ''}`}
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Свернуть' : 'Развернуть'}
          >
            ▶
          </button>
        )}
        
        {!hasChildren && <span className="expand-placeholder" />}

        <div className="task-info">
          <span className="task-name">{task.name}</span>
          
          {task.assignee && (
            <span className="task-assignee" title="Исполнитель">
              👤 {task.assignee}
            </span>
          )}
        </div>

        <div className="task-meta">
          <span className={`task-status status-${task.status || 'default'}`}>
            {statusLabels[task.status || 'default']}
          </span>
          
          {task.startDate && (
            <span className="task-date" title="Начало">
              📅 {formatDate(task.startDate)}
            </span>
          )}

          {task.progress !== undefined && (
            <div className="task-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
              <span className="progress-text">{task.progress}%</span>
            </div>
          )}
        </div>
      </div>

      {isExpanded && hasChildren && (
        <div className="task-children">
          {task.children.map(child => (
            <TaskNode key={child.id} task={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </>
  )
}

export default TaskHierarchy
