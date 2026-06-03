export const mockProject = {
  id: 'repair-uuid-001',
  name: 'Приёмка и ремонт квартиры',
  description: 'Полный цикл ремонта квартиры от приёмки до финишной отделки',
  timeline: {
    startDate: '2026-06-01',
    endDate: '2026-09-30',
  },
  tasks: [
    {
      id: 'phase1',
      name: 'Приёмка квартиры от застройщика',
      startDate: '2026-06-14',
      endDate: '2026-06-14',
      status: 'in_progress',
      progress: 50,
      color: '#2196F3',
      assignee: '',
      dependencies: [],
      children: []
    },
    {
      id: 'phase2',
      name: 'Базовый минимум ремонта',
      startDate: '2026-06-25',
      endDate: '2026-09-06',
      status: 'in_progress',
      progress: 30,
      color: '#2196F3',
      assignee: '',
      dependencies: [],
      children: [
        {
          id: 'task2_1',
          name: 'Дизайн-проект',
          startDate: '2026-06-25',
          endDate: '2026-07-21',
          status: 'in_progress',
          progress: 40,
          color: '#2196F3',
          assignee: '',
          dependencies: [],
          children: [
            {
              id: 'task2_1_1',
              name: 'Планировочное решение',
              startDate: '2026-06-25',
              endDate: '2026-06-30',
              status: 'in_progress',
              progress: 60,
              color: '#2196F3',
              assignee: '',
              dependencies: [],
              children: []
            },
            {
              id: 'task2_1_2',
              name: 'Оплата этапа Дизайнерское решение',
              startDate: '2026-07-01',
              endDate: '2026-07-01',
              status: 'pending',
              progress: 0,
              color: '#9C27B0',
              assignee: 'О.',
              dependencies: ['task2_1_1'],
              children: []
            },
            {
              id: 'task2_1_3',
              name: 'Дизайнерское решение',
              startDate: '2026-07-02',
              endDate: '2026-07-14',
              status: 'pending',
              progress: 0,
              color: '#9C27B0',
              assignee: '',
              dependencies: ['task2_1_2'],
              children: []
            },
            {
              id: 'task2_1_4',
              name: 'Оплата этапа Чертежи',
              startDate: '2026-07-15',
              endDate: '2026-07-15',
              status: 'pending',
              progress: 0,
              color: '#9C27B0',
              assignee: 'О.',
              dependencies: ['task2_1_3'],
              children: []
            },
            {
              id: 'task2_1_5',
              name: 'Базовый альбом чертежей',
              startDate: '2026-07-16',
              endDate: '2026-07-21',
              status: 'pending',
              progress: 0,
              color: '#9C27B0',
              assignee: '',
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
          progress: 0,
          color: '#009688',
          assignee: '',
          dependencies: [],
          children: [
            {
              id: 'task2_2_1',
              name: 'Оплата Проектирования',
              startDate: '2026-06-27',
              endDate: '2026-06-27',
              status: 'pending',
              progress: 0,
              color: '#009688',
              assignee: 'О.',
              dependencies: [],
              children: []
            },
            {
              id: 'task2_2_2',
              name: 'Проектирование систем ОВиК',
              startDate: '2026-06-28',
              endDate: '2026-07-21',
              status: 'pending',
              progress: 0,
              color: '#009688',
              assignee: '',
              dependencies: ['task2_2_1'],
              children: []
            },
            {
              id: 'task2_2_3',
              name: 'Проектирование системы ВК',
              startDate: '2026-06-28',
              endDate: '2026-07-21',
              status: 'pending',
              progress: 0,
              color: '#009688',
              assignee: '',
              dependencies: ['task2_2_1'],
              children: []
            }
          ]
        }
      ]
    }
  ]
}