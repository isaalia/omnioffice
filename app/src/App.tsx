import { Routes, Route, Navigate } from 'react-router-dom'
import { CanvasPage } from '@/canvas/CanvasPage'
import { AuthPage } from '@/components/AuthPage'
import { DashboardPage } from '@/components/DashboardPage'
import { useAuthStore } from '@/store/authStore'

export default function App() {
  const { session } = useAuthStore()

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      {/* Dashboard — home for authenticated users */}
      <Route
        path="/"
        element={session ? <DashboardPage /> : <Navigate to="/auth" replace />}
      />
      {/* /canvas/new requires auth */}
      <Route
        path="/canvas/new"
        element={session ? <CanvasPage /> : <Navigate to="/auth" replace />}
      />
      {/* /canvas/:id is public — guests get read-only */}
      <Route path="/canvas/:id" element={<CanvasPage />} />
    </Routes>
  )
}
