import { Outlet } from 'react-router-dom'
import { Logo } from '../../ui/Logo/Logo'

const AuthLayoutMobile = () => {
  
  return (
    <div className="bg-background">
      <header className="py-6.5 px-6 ">
        <Logo text="TASKLY" />
      </header>
      <main>
        <Outlet />
      </main>

    </div>
  )
}

export default AuthLayoutMobile
