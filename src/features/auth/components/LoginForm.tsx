import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input/Input'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { loginSchema, type LoginFormData } from '../validation/loginSchema'
import { sendLoginData } from '../api/login'
import { AuthContext } from '../../../context/AuthContext'

export function LoginForm() {
  const [apiError, setApiError] = useState<string | null>(null)
  const navigate = useNavigate()
  const auth = useContext(AuthContext)

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
  setApiError(null);
  const response = await sendLoginData(data);
  if (response?.error) {
    const message = response.msg || 'Login failed';
    setApiError(message);
    toast.error(message);
    return;
  }
  // ✅ SUCCESS CASE
  const { access_token, refresh_token, user } = response;

  document.cookie = `access_token=${access_token}; path=/`;
  document.cookie = `refresh_token=${refresh_token}; path=/`;

  localStorage.setItem('user', JSON.stringify(user));

  auth?.login(); // 🔥 IMPORTANT

  toast.success('Logged in successfully');
  navigate('/');
};

  return (
    <div className=" max-w-120 flex flex-col items-center bg-white p-6 xs:p-12 rounded-lg shadow-[0px_24px_48px_0px_#041B3C0F]">
      {/* Header */}
      <div className=" text-center space-y-[6.87px] xs:space-y-2 mb-10">
        <h1 className="font-semibold text-[28px] xs:text-3xl text-slate-900">
          Welcome Back{' '}
        </h1>
        <p className="text-slate-600 text-[14px]">
          Please enter your details to access your workspace
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(Login)} className="w-full">
        {/* Email */}
        <div className="mb-6">
          <Input
            label="Email"
            placeholder="yourname@company.com"
            {...register('email')}
            error={errors.email?.message && touchedFields.email ? errors.email.message : undefined}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register('password')}
            error={
              errors.password?.message && touchedFields.password
                ? errors.password.message
                : undefined
            }
          />
        </div>

        {/* Remember me + Forgot password */}
        <div className="flex items-center justify-between mb-6 text-sm capitalize">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register('rememberMe')}
              className="w-4 h-4 rounded-xs bg-surface-low border border-slate-300"
            />
            <span className="text-[#434654] font-medium">Remember me</span>
          </label>

          <span
            onClick={() => navigate('/forgot-password')}
            className="text-primary hover:text-primary-container cursor-pointer font-medium "
          >
            Forgot password?
          </span>
        </div>

        {/* Submit */}
        <Button loading={isSubmitting} variant="primary" className="w-full">
          {isSubmitting ? 'Log In...' : 'Log In'}
        </Button>
        {/* API Error */}
        {apiError && (
          <div className="w-full px-2 py-3 text-sm text-error text-center">{apiError}</div>
        )}
        {/* Footer */}
        <div className="pt-8 text-center text-slate-600 text-[14px]">
          <p>
            Don't have an account?
            <span
              onClick={() => navigate('/signup')}
              className="text-primary hover:text-primary-container cursor-pointer font-semibold"
            >
              {' '}
              Sign Up
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}
