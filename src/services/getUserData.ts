const API_BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const getUserData = async (access_token: string) => {
  if (!access_token) {
    return {
      error: true,
      code: 'no_token',
      msg: 'No access token provided',
    }
  }

  if (!API_BASE_URL || !API_KEY) {
    return {
      error: true,
      code: 'config_error',
      msg: 'API configuration is missing',
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/v1/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apikey: API_KEY,
        Authorization: `Bearer ${access_token}`,
      },
    })

    let result: any
    try {
      result = await response.json()
    } catch {
      return {
        error: true,
        code: 'invalid_json',
        msg: 'Invalid server response',
      }
    }

    console.log('result >>', result)

    if (!response.ok) {
      const errorCode = result?.code || result?.error_code

      let errorMsg =
        result?.msg || result?.error || 'Failed to fetch user'

      if (errorCode === 'token_expired') {
        errorMsg = 'Session expired. Please log in again.'
      } else if (errorCode === 'bad_jwt') {
        errorMsg = 'Session expired. Please log in again.'
      } else if (errorCode === 'unauthorized') {
        errorMsg = 'Unauthorized. Please log in again.'
      } else if (errorCode === 'invalid_token') {
        errorMsg = 'Invalid session. Please log in again.'
      }

      return {
        error: true,
        code: errorCode,
        msg: errorMsg,
      }
    }

    return {
      error: false,
      user: result,
    }
  } catch (error: any) {
    return {
      error: true,
      code: 'network_error',
      msg:
        error?.message ||
        'Network error. Please check your connection.',
    }
  }
}