import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './components/layout/AuthLayout/AuthLayout'
import MainLayout from './components/layout/MainLayout/MainLayout'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import Home from './pages/Home'
import ProtectedRoutes from './Routes/ProtectedRoutes'
import AuthProtectedRoutes from './Routes/AuthProtectedRoutes'
import Dashboard from './pages/Dashboard'
import ForgetPassword from './pages/ForgetPassword/ForgetPassword'
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        ),
      },
      {
        path : '*',
        element : (
          <ProtectedRoutes>
            <NotFoundPage />
          </ProtectedRoutes>
        )
      }
    ],
  },
  {
    path: '',
    element: <AuthLayout />,
    children: [
      {
        path: 'signup',
        element: (
          <AuthProtectedRoutes>
            <SignUp />
          </AuthProtectedRoutes>
        ),
      },
      {
        path: 'login',
        element: (
          <AuthProtectedRoutes>
            <Login />
          </AuthProtectedRoutes>
        ),
      },
      {
        path : 'forgot-password',
        element :(
          <AuthProtectedRoutes>
            <ForgetPassword/>
          </AuthProtectedRoutes>
        )
      }
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
