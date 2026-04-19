import { LoginForm } from "../../features/auth/components/LoginForm"
import { LoginFormMobile } from "../../features/auth/components/LoginFormMobile"

const Login = () => {
  return (
    <div>
      {/* Mobile */}
      <div className="block min-[390px]:hidden">
        <LoginFormMobile />
      </div>

      {/* Desktop */}
      <div className="hidden min-[390px]:block">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login