import { format, parseISO, addDays } from 'date-fns'
import { ru } from 'date-fns/locale'

export function formatDate(date) {
  try {
    const parsed = typeof date === 'string' ? parseISO(date) : date
    return format(parsed, 'dd.MM.yyyy', { locale: ru })
  } catch {
    return '—'
  }
}

function adjustColor(hex, amount) {
  try {
    const r = Math.min(255, Math.max(0, parseInt(hex.slice(1,3), 16) + amount))
    const g = Math.min(255, Math.max(0, parseInt(hex.slice(3,5), 16) + amount))
    const b = Math.min(255, Math.max(0, parseInt(hex.slice(5,7), 16) + amount))
    return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
  } catch {
    return hex
  }
}

/**
 * Рекурсивно преобразует иерархию задач в плоский список для gantt-task-react
 * Сохраняет depth для отступов и status для бейджа
 */
export function flattenTasksForGantt(tasks, depth = 0, parentId = undefined) {
  return tasks.flatMap(task => {
    const hasChildren = task.children && task.children.length > 0
    const color = task.color || '#4b5563'

    let start = typeof task.startDate === 'string' ? parseISO(task.startDate) : task.startDate
    let end   = typeof task.endDate   === 'string' ? parseISO(task.endDate)   : task.endDate

    // gantt-task-react требует end > start; однодневные задачи — +1 день
    if (end <= start) end = addDays(start, 1)

    const ganttTask = {
      id:           task.id,
      name:         task.name,
      start,
      end,
      progress:     task.progress || 0,
      type:         hasChildren ? 'project' : 'task',
      dependencies: task.dependencies || [],
      hideChildren: false,
      project:      parentId,          // нужно для фильтрации дочерних элементов
      styles: {
        backgroundColor:         color,
        backgroundSelectedColor: adjustColor(color, 20),
        progressColor:           adjustColor(color, 30),
        progressSelectedColor:   adjustColor(color, 40),
      },
      // Кастомные поля для нашей таблицы
      status:   task.status || 'default',
      assignee: task.assignee || '',
      color,
      depth,
    }

    const children = hasChildren
      ? flattenTasksForGantt(task.children, depth + 1, task.id)
      : []

    return [ganttTask, ...children]
  })
}
