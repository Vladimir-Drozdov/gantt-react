import { format, parseISO, differenceInDays } from 'date-fns'
import { ru } from 'date-fns/locale'

/**
 * Форматирует дату в русском формате
 */
export function formatDate(date) {
  try {
    const parsed = typeof date === 'string' ? parseISO(date) : date
    return format(parsed, 'dd MMM yyyy', { locale: ru })
  } catch {
    return 'Неизвестная дата'
  }
}

/**
 * Вычисляет длительность проекта в днях
 */
export function calculateDuration(startDate, endDate) {
  try {
    const start = typeof startDate === 'string' ? parseISO(startDate) : startDate
    const end = typeof endDate === 'string' ? parseISO(endDate) : endDate
    return differenceInDays(end, start) + 1 // +1 чтобы включить оба дня
  } catch {
    return 0
  }
}

/**
 * Преобразует объект задачи для gantt-task-react: преобразовываем start и end в даты, добавляем type: 'task',
 */
export function transformTaskForGantt(task) {
  return {
    id: task.id,
    name: task.name,
    start: task.startDate ? new Date(task.startDate) : new Date(),  // Date объект
    end: task.endDate ? new Date(task.endDate) : new Date(),        // Date объект
    progress: task.progress || 0,
    dependencies: task.dependencies || [],
    type: 'task',        // обязательное поле для gantt-task-react
    isDisabled: true,    // read-only режим
  }
}

/**
 * Рекурсивно преобразует иерархию задач в плоский список для Ганта
 */
export function flattenTasksForGantt(tasks, depth = 0) {
  return tasks.flatMap(task => {
    const transformed = transformTaskForGantt(task)
    // Добавляем отступ для вложенных задач через название
    if (depth > 0) {
      transformed.name = '  '.repeat(depth) + transformed.name
    }
    
    const children = task.children && task.children.length > 0 
      ? flattenTasksForGantt(task.children, depth + 1)
      : []
    
    return [transformed, ...children]
  })
}