import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProjectPage from './pages/ProjectPage'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <Routes>
        {/* Страница с диаграммой Ганта для конкретного проекта */}
        <Route path="/projects/:uuid" element={<ProjectPage />} />
        
        {/* Страница 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
