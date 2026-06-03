import { useParams } from 'react-router-dom'
import { useProjectData } from '../hooks/useProjectData'
import GanttChart from '../components/GanttChart'
import TaskHierarchy from '../components/TaskHierarchy'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import ProjectHeader from '../components/ProjectHeader'
import './ProjectPage.css'

function ProjectPage() {
  const { uuid } = useParams()
  const { project, loading, error } = useProjectData(uuid)

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage error={error} />
  }

  if (!project) {
    return <ErrorMessage error="Проект не найден" />
  }

  return (
    <div className="project-page">
      <ProjectHeader project={project} uuid={uuid} />
      
      <div className="project-content">
        <div className="sidebar">
          <h2>Структура задач</h2>
          {project.tasks && project.tasks.length > 0 ? (
            <TaskHierarchy tasks={project.tasks} />
          ) : (
            <p className="empty-message">Нет задач</p>
          )}
        </div> 

        <div className="main-content">
          <h2>Диаграмма Ганта</h2>
          {project.tasks && project.tasks.length > 0 ? (
            <GanttChart project={project} />
          ) : (
            <p className="empty-message">Нет данных для отображения диаграммы</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectPage
