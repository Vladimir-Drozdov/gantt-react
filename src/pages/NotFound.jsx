import { useNavigate } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <h1 className="not-found-code">404</h1>
        <h2>Страница не найдена</h2>
        <p>Запрашиваемый проект не найден или был удален.</p>
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Вернуться назад
        </button>
      </div>
    </div>
  )
}

export default NotFound
