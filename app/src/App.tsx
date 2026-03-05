import { Routes, Route, Navigate } from 'react-router-dom'
import { CanvasPage } from '@/canvas/CanvasPage'
import { AuthPage } from '@/components/AuthPage'
import { useAuthStore } from '@/store/authStore'

export default function App() {
  const { session } = useAuthStore()

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/canvas/:id"
        element={session ? <CanvasPage /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="/"
        element={session ? <Navigate to="/canvas/new" replace /> : <Navigate to="/auth" replace />}
      />
    </Routes>
  )
}
