import { Outlet } from 'react-router-dom'
import { Logo } from '../../ui/Logo/Logo'

const AuthLayoutDesktop = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="py-6 px-16.5">
        <Logo text="TASKLY" />
      </header>

      {/* Main */}
      <main className="flex-1 mt-4 mb-12 flex items-center justify-center">
         <Outlet />
        {' '}
      </main>

      {/* Footer */}
      <footer className="h-20" />
    </div>
  )
}

export default AuthLayoutDesktop
