import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

export default function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useAppSelector((state) => state.auth)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />
}
