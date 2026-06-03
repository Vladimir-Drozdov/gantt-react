npm install
npm run dev

(приложение откроется на http://localhost:3000)

ТРЕБОВАНИЯ:

  - Node.js >= 18.0.0
  - npm >= 9.0.0


В браузер открыть: `http://localhost:3000/projects/test-uuid-12345`

# 1. Установка
npm install

# 2. Запуск разработки (http://localhost:3000)
npm run dev

# 3. Сборка для production
npm run build

## Главные файлы, которые нужно знать

| Файл | Что он делает |
|------|---------------|
| `src/App.jsx` | Маршрутизация + основная структура |
| `src/pages/ProjectPage.jsx` | Главная страница с проектом |
| `src/components/GanttChart.jsx` | Диаграмма Ганта |
| `src/components/TaskHierarchy.jsx` | Список задач слева |
| `src/hooks/useProjectData.js` | Загрузка данных с API |
| `src/utils/dateUtils.js` | Преобразование данных для Ганта |
| `vite.config.js` | Конфиг подключения к бэкенду |
| `.env.local` | Адрес API (создать из .env.example) |


