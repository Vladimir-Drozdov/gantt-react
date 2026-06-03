import './LoadingSpinner.css'

function LoadingSpinner() {
  return (
    <div className="loading-page">
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Загрузка проекта...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
