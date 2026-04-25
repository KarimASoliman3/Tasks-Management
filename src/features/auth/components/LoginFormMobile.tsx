import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input/Input'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { loginSchema, type LoginFormData } from '../validation/loginSchema'
import { sendLoginData } from '../api/login'
import { useAppDispatch } from '../../../store/hooks'
import { login } from '../../../store/slices/authSlice'
import { fetchUserData } from '../../../store/slices/userSlice'
import { getTokenExpirationDate } from '../../../utils/tokenUtils'
import { Icon } from '../../../components/ui/Icon'

export function LoginFormMobile() {
  const [apiError, setApiError] = useState<string | null>(null)
  const [showPassword] = useState(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
    mode: 'onBlur',
  })

  const Login = async (data: LoginFormData) => {
    setApiError(null)

    const response = await sendLoginData(data)

    if (response?.error) {
      const message = response.msg || 'Login failed'
      setApiError(message)
      toast.error(message)
      return
    }

    // ✅ Validate tokens exist before storing
    if (!response.access_token) {
      const message = 'Login failed: No access token received'
      setApiError(message)
      toast.error(message)
      return
    }

    const { access_token, refresh_token, user } = response

    const expiryDate = getTokenExpirationDate(access_token)
    const expiresAttr = expiryDate ? `; expires=${expiryDate.toUTCString()}` : ''
    document.cookie = `access_token=${access_token}; path=/${expiresAttr}`
    document.cookie = `refresh_token=${refresh_token || ''}; path=/${expiresAttr}`

    localStorage.setItem('user', JSON.stringify(user))

    dispatch(login())
    dispatch(fetchUserData())

    toast.success('Logged in successfully')
    navigate('/')
  }

  return (
    <>
      {/* CARD */}
      <div className="w-full max-w-sm bg-background rounded-2xl shadow-lg p-5">
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="font-semibold text-xl text-slate-900">Welcome Back</h1>
          <p className="text-slate-600 text-sm mt-1">
            Please enter your details to access your workspace
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(Login)} className="w-full">
          {/* EMAIL */}
          <div className="mb-6 relative">
            <Input
              label="Email Address"
              placeholder="curator@workspace.com"
              className="rounded-lg pr-10"
              {...register('email')}
              error={
                errors.email?.message && touchedFields.email ? errors.email.message : undefined
              }
            />

            <Icon
              size="sm-x"
              name="mailGray"
              className="absolute right-3 top-12 -translate-y-1/2"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-6 relative">
            {/* Forgot */}
            <span
              onClick={() => navigate('/forgot-password')}
              className="text-primary font-medium cursor-pointer text-xs absolute right-0 top-0"
            >
              Forgot?
            </span>

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimum 8 characters"
              className="rounded-lg pr-10"
              {...register('password')}
              error={
                errors.password?.message && touchedFields.password
                  ? errors.password.message
                  : undefined
              }
            />

            <Icon size="sm-x" name="lock" className="absolute right-3 top-12 -translate-y-1/2" />
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="mb-6 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" {...register('rememberMe')} className="w-4 h-4" />
              <span className="text-slate-600">Remember me</span>
            </label>
          </div>

          {/* BUTTON */}
          <Button loading={isSubmitting} className="w-full">
            {isSubmitting ? 'Logging in...' : 'Log In'}
            <Icon name="arrowRight" size="sm" className="ml-2" />
          </Button>

          {/* ERROR */}
          {apiError && <div className="mt-3 text-sm text-red-500 text-center">{apiError}</div>}

          {/* FOOTER */}
          <div className="mt-6 text-center text-sm text-slate-600">
            <div className="mt-41.75">
              {/* <div className=""></div> */}
              <div className="pt-12">
                Don’t have an account?{' '}
                <span
                  onClick={() => navigate('/signup')}
                  className="text-primary font-medium cursor-pointer"
                >
                  Sign Up
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
