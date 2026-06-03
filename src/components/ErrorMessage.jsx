import './ErrorMessage.css'

function ErrorMessage({ error }) {
  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h1>Ошибка</h1>
        <p className="error-text">{error}</p>
        <a href="/" className="error-home-link">
          Вернуться на главную
        </a>
      </div>
    </div>
  )
}

export default ErrorMessage
