import { useState, useEffect } from 'react'
import axios from 'axios'
import { mockProjects } from '../mocks/mockData' // Добавьте импорт

export function useProjectData(uuid) {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!uuid) {
      setError('UUID не указан')
      setLoading(false)
      return
    }

    const fetchProject = async () => {
      try {
        setLoading(true)
        setError(null)

        // Используются mock-данные
        if (uuid) {
          const found = mockProjects.find(p => p.id === uuid)
          if (found) {
            setProject(found)
          } else {
            setError('Проект не найден')
          }
          return
        }

        // Реальный запрос
        // const response = await axios.get(`/api/projects/${uuid}`)
        // setProject(response.data)
      } catch (err) {
        console.error('Ошибка при загрузке проекта:', err)
        if (err.response?.status === 404) {
          setError('Проект не найден')
        } else {
          setError('Ошибка при загрузке данных')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [uuid])

  return { project, loading, error }
}