import { useState } from 'react'
import './ProjectHeader.css'

function ProjectHeader({ project, uuid }) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    const link = `${window.location.origin}/projects/${uuid}`
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="project-header">
      <div className="header-content">
        <div className="header-info">
          <h1>{project.name}</h1>
          {project.description && (
            <p className="header-description">{project.description}</p>
          )}
          
          {project.timeline && (
            <div className="header-timeline">
              <span>
                📅 {new Date(project.timeline.startDate).toLocaleDateString('ru-RU')}
                {' — '}
                {new Date(project.timeline.endDate).toLocaleDateString('ru-RU')}
              </span>
            </div>
          )}
        </div>

        <div className="header-actions">
          <button
            className={`copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopyLink}
            title="Скопировать ссылку на проект"
          >
            {copied ? '✓ Скопировано' : '🔗 Копировать ссылку'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectHeader
