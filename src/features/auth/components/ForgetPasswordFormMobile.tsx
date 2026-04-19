import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
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

export function ForgetPasswordFormMobile() {
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
    setAttempts(0)
    setTimer(0)
    setApiMessage(null)
  }, [email])

  // ⏱ Timer
  useEffect(() => {
    if (timer <= 0) return

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])

  // 📡 API
  const sendRequest = async (data: ForgotFormData) => {
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
  }

  const onSubmit = (data: ForgotFormData) => {
    if (attempts >= 3) {
      toast.error('You have reached maximum attempts')
      return
    }

    sendRequest(data)
  }

  const resendDisabled = loading || timer > 0 || attempts >= 3

  return (
    <>
      <div className="max-w-85.5 mx-auto bg-background p-8 rounded-lg shadow">
        {/* Header */}
        <div className="w-full mb-6 flex justify-center">
          <div className="bg-surface-highest size-12 flex items-center justify-center rounded-xl">
            <Icon name="restore" />
          </div>
        </div>
        <div className="text-center space-y-[6.87px] min-[390px]:space-y-2 mb-10">
          <h1 className="text-[24px] font-semibold mb-2">Forgot password?</h1>
          <p className="text-sm text-[#434654] mb-6">
            No worries, we’ll send you reset instructions.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Input
              label="Email address"
              placeholder="Enter your email"
              {...register('email')}
              error={
                errors.email?.message && touchedFields.email ? errors.email.message : undefined
              }
            />
          </div>

          <Button loading={loading} className="w-full text-[14px]">
            Send Reset Link
          </Button>

          {/* BACK */}
          <div className="pt-6 text-center text-[14px] text-primary font-medium">
            <p
              onClick={() => navigate('/login')}
              className="flex items-center justify-center gap-1 cursor-pointer hover:text-primary-container"
            >
              <Icon name="arrowLeft" size="mini" />
              Back to log in
            </p>
          </div>
        </form>
      </div>

      {/* ✅ MESSAGE UI */}
      {apiMessage && (
        <div className=" max-w-85.5 mx-auto ">
          <div className="bg-[#82F9BE33] p-4 rounded-sm mt-6 ">
            <div className="flex items-start gap-3.75">
              <Icon name="done" />
              <p className="text-[12px] text-[#005235]">{apiMessage}</p>
            </div>
            <div className="border-t border-t-[#0052351A] pt-3  flex items-center justify-between">
              <button
                disabled={resendDisabled}
                onClick={handleSubmit(onSubmit)}
                className={`text-label-sm text-[#00523599] font-bold uppercase transition `}
              >
                Didn't receive email?
              </button>
              {timer > 0 && (
                <p className="text-label-sm text-primary font-bold tracking-[1.1px] uppercase">
                  Resend in {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
