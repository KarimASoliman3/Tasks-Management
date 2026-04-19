import { ForgetPasswordForm } from '../../features/auth/components/ForgetPasswordForm'
import { ForgetPasswordFormMobile } from '../../features/auth/components/ForgetPasswordFormMobile'

const ForgetPassword = () => {
  const radialGradient = 'bg-[radial-gradient(70.71%_70.71%_at_50%_50%,#D7E2FF_1.77%,#F9F9FF_1.77%),radial-gradient(70.71%_70.71%_at_50%_50%,#D7E2FF_1.77%,rgba(215,226,255,0)_1.77%)]'
  return (
    <>
      <div>
        {/* Mobile */}
        <div className="min-[390px]:hidden block  mt-[52.5px]  min-h-205">
          <div className={`${radialGradient} px-6 `} >
          <ForgetPasswordFormMobile />
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden min-[390px]:block">
          <ForgetPasswordForm />
        </div>
      </div>
    </>
  )
}

export default ForgetPassword
