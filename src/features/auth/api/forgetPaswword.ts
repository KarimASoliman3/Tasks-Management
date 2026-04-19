const API_BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const forgetPasswordRecover = async (email: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/v1/recover`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: API_KEY,
        },
        body: JSON.stringify({ email }),
      }
    )

    const result = await response.json()

    console.log('RECOVER RESPONSE:', result)

    // ❌ ERROR CASE
    if (!response.ok) {
      return {
        error: true,
        code: result?.code,
        error_code: result?.error_code,
        msg:
          result?.msg ||
          result?.error_description ||
          result?.error ||
          'Something went wrong',
      }
    }

    // ✅ SUCCESS (we DON'T expose anything sensitive)
    return {
      error: false,
      msg:
        "If an account exists with this email, we’ve sent a password reset link.",
    }
  } catch (error: any) {
    return {
      error: true,
      msg: error?.message || 'Network error',
    }
  }
}