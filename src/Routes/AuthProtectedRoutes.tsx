import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

export default function AuthProtectedRoutes({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAppSelector((state) => state.auth)

  return !isLoggedIn ? children : <Navigate to="/" replace />
}
