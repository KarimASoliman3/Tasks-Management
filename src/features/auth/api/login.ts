const API_BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const sendLoginData = async (data: {
  email: string
  password: string
}) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/v1/token?grant_type=password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      }
    )

    const result = await response.json()

    console.log(result)

    // ❌ ERROR CASE
    if (!response.ok) {
      return {
        error: true,
        code: result?.code,
        error_code: result?.error_code,
        msg:
          result?.error_description ||
          result?.error ||
          result?.message ||
          'Invalid email or password',
      }
    }

    // ✅ SUCCESS CASE (Supabase-style response)
    return {
      error: false,
      access_token: result?.access_token,
      refresh_token: result?.refresh_token,
      user: result?.user,
    }
  } catch (error: any) {
    return {
      error: true,
      msg: error?.message || 'Network error',
    }
  }
}