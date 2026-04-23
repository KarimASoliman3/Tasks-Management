import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { Input } from '../../../components/ui/Input/Input'
import { Button } from '../../../components/ui/Button'
import { forgetPasswordRecover } from '../api/forgetPaswword'
import { Icon } from './../../../components/ui/Icon/Icon'

// ✅ Schema
const forgotSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Invalid email address'),
})

type ForgotFormData = z.infer<typeof forgotSchema>

export function ForgetPasswordForm() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [apiMessage, setApiMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  })

  const email = watch('email')

  // 🔄 Reset attempts when email changes
  useEffect(() => {
    if (!email) {
    setAttempts(0)
    setTimer(0)
    setApiMessage(null)
    }
  }, [email])

  // ⏱ Timer
  useEffect(() => {
  if (timer <= 0) return

  const timeout = setTimeout(() => {
    setTimer((prev) => prev - 1)
  }, 1000)

  return () => clearTimeout(timeout)
}, [timer])

  // 📡 API
  const sendRequest =useCallback(async (data: ForgotFormData) => {
    try {
      setLoading(true)
      setApiMessage(null)

      const response = await forgetPasswordRecover(data.email)

      if (response?.error) {
        setApiMessage(response.msg)
        toast.error(response.msg)
        return
      }

      // ✅ FIXED MESSAGE (NOT API RESPONSE)
      const message = 'If an account exists with this email, we’ve sent a password reset link.'

      setApiMessage(message)
      toast.success(message)

      setTimer(300)
      setAttempts((prev) => prev + 1)
    } catch {
      const message = 'Something went wrong. Please try again.'

      setApiMessage(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const onSubmit =useCallback((data: ForgotFormData) => {
    if (attempts >= 3) {
      toast.error('You have reached maximum attempts')
      return
    }

    sendRequest(data)
  }, [attempts])

  const resendDisabled = loading || timer > 0 || attempts >= 3
  const goToLogin = useCallback(() => navigate('/login'), [navigate])

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
      {/* Header */}
      

      {/* Header */}
      <div className=" space-y-[6.87px] xs:space-y-2 mb-10">
        <h1 className="text-headline-lg font-semibold mb-2">Forgot password?</h1>

      <p className="text-sm text-[#434654] mb-6">No worries, we’ll send you reset instructions.</p>
      </div>


      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <Input
            label="Email address"
            placeholder="Enter your email"
            {...register('email')}
            error={errors.email?.message && touchedFields.email ? errors.email.message : undefined}
          />
        </div>

        <Button loading={loading} className="w-full  ">
          Send Reset Link
        </Button>

        {/* BACK */}
        <div className="pt-6 text-center text-[14px] text-primary font-semibold">
          <p
            onClick={goToLogin}
            className="flex items-center justify-center gap-1 cursor-pointer hover:text-primary-container"
          >
            <Icon name="arrowLeft" size="sm" />
            Back to log in
          </p>
        </div>
      </form>

      {/* ✅ MESSAGE UI */}
      {apiMessage && (
        <div className="bg-[#82F9BE33] w-full p-4 rounded-lg mt-6 flex items-start gap-3.75">
          <Icon name="done" />
          <p className="text-body-md text-[#005235]">{apiMessage}</p>
        </div>
      )}

      {/* RESEND */}
      <div className="mt-6 text-center">
        <button
          disabled={resendDisabled}
          onClick={handleSubmit(onSubmit)}
          className={`text-label-sm text-[#434654] font-bold uppercase transition `}
        >
          {/* ${
            resendDisabled
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-primary hover:underline cursor-pointer'
            } 
          */}
          Didn't receive the email?
        </button>

        {timer > 0 && (
          <p className="text-[16px] text-slate-500 mt-3 py-[13.5px] flex items-center justify-center gap-[7.99px] bg-surface-low w-full ">
            <span>
                <Icon name='clock'/>
            </span>
            Resend in {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
          </p>
        )}
      </div>
    </div>
  )
}
