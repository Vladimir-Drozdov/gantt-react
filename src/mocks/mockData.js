export const mockProjects = [{ //массив проектов
  id: 'repair-uuid-001', //id проекта
  name: 'Приёмка и ремонт квартиры',//название проекта
  tasks: [//массив задач, относящихся к проекту
    {
      id: 'phase1',// id задачи
      name: 'Приёмка квартиры от застройщика', //название задачи
      startDate: '2026-06-14',//дата начала задачи
      endDate: '2026-06-14',//дедлайн задачи
      status: 'in_progress',//статус задачи
      assignee: '',//Исполнитель задачи
      type: 'milestone',//тип задачи
      color: '#2196F3',//цвет колбаски задачи
      dependencies: [],//массив задач, от которых зависит данная задача, нужен для формирования стрелочек на диаграмме Ганта. 
      children: []//массив дочерних задач у данной задачи
    },
    {
      id: 'phase2',// id задачи
      name: 'Базовый минимум ремонта',//название задачи
      startDate: '2026-06-25',//дата начала задачи
      endDate: '2026-09-06',//дедлайн задачи
      status: 'in_progress',//статус задачи
      assignee: '',//Исполнитель задачи
      type: 'task',//тип задачи
      color: '#2196F3',//цвет колбаски задачи
      dependencies: ['phase1'],//массив задач, от которых зависит данная задача, нужен для формирования стрелочек на диаграмме Ганта. Т.е. стрелочка будет начинаться в phase1 и заканчиваться в phase2 
      children: [//массив дочерних задач у данной задачи
        {
          id: 'task2_1',
          name: 'Дизайн-проект',
          startDate: '2026-06-25',
          endDate: '2026-07-21',
          status: 'in_progress',
          assignee: '',
          type: 'task',
          color: '#2196F3',
          dependencies: [],
          children: [
            {
              id: 'task2_1_1',
              name: 'Планировочное решение',
              startDate: '2026-06-25',
              endDate: '2026-06-30',
              status: 'in_progress',
              assignee: '',
              type: 'task',
              color: '#2196F3',
              dependencies: [],
              children: []
            },
            {
              id: 'task2_1_2',
              name: 'Оплата этапа Дизайнерское решение',
              startDate: '2026-07-01',
              endDate: '2026-07-01',
              status: 'pending',
              assignee: 'О.',
              type: 'milestone',
              color: '#9C27B0',
              dependencies: ['task2_1_1'],
              children: []
            },
            {
              id: 'task2_1_3',
              name: 'Дизайнерское решение',
              startDate: '2026-07-02',
              endDate: '2026-07-14',
              status: 'pending',
              assignee: '',
              type: 'task',
              color: '#9C27B0',
              dependencies: ['task2_1_2'],
              children: []
            },
            {
              id: 'task2_1_4',
              name: 'Оплата этапа Чертежи',
              startDate: '2026-07-15',
              endDate: '2026-07-15',
              status: 'pending',
              assignee: 'О.',
              type: 'milestone',
              color: '#9C27B0',
              dependencies: ['task2_1_3'],
              children: []
            },
            {
              id: 'task2_1_5',
              name: 'Базовый альбом чертежей',
              startDate: '2026-07-16',
              endDate: '2026-07-21',
              status: 'pending',
              assignee: '',
              type: 'task',
              color: '#9C27B0',
              dependencies: ['task2_1_4'],
              children: []
            }
          ]
        },
        {
          id: 'task2_2',
          name: 'Проектирование инженерных систем',
          startDate: '2026-06-25',
          endDate: '2026-07-21',
          status: 'pending',
          assignee: '',
          type: 'task',
          color: '#009688',
          dependencies: [],
          children: [
            {
              id: 'task2_2_1',
              name: 'Оплата Проектирования',
              startDate: '2026-06-27',
              endDate: '2026-06-27',
              status: 'pending',
              assignee: 'О.',
              type: 'milestone',
              color: '#009688',
              dependencies: [],
              children: []
            },
            {
              id: 'task2_2_2',
              name: 'Проектирование систем ОВиК',
              startDate: '2026-06-28',
              endDate: '2026-07-21',
              status: 'pending',
              assignee: '',
              type: 'task',
              color: '#009688',
              dependencies: ['task2_2_1'],
              children: []
            },
            {
              id: 'task2_2_3',
              name: 'Проектирование системы ВК',
              startDate: '2026-06-28',
              endDate: '2026-07-21',
              status: 'pending',
              assignee: '',
              type: 'task',
              color: '#009688',
              dependencies: ['task2_2_1'],
              children: []
            }
          ]
        }
      ]
    }
  ]
}]