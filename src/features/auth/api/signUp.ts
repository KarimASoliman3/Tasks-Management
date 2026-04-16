const API_BASE_URL = import.meta.env.VITE_BASE_URL
const API_BASE_PATH = import.meta.env.VITE_API_BASE_PATH
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// export const sendRegisterData = {
//   post: async (endpoint: string, data: any) => {

//     const response = await fetch(`${API_BASE_URL}${API_BASE_PATH}${endpoint}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         apikey: API_KEY,
//         Authorization: `Bearer ${API_KEY}`,
//       },
//       body: JSON.stringify(data),
//     })

//     const result = await response.json()

//     if (!response.ok) {
//       throw new Error(
//         result?.error_description || result?.message || result?.error || 'API request failed',
      

//       )
//     }
    
//     return result
//   },
// }


export const sendRegisterData = async (data: any, endpoint: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_BASE_PATH}${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(data),
      }
    )

    const result = await response.json()

    console.log(result)

    if (!response.ok) {
      return {
        error: true,
        code: result?.code,
        error_code: result?.error_code,
        msg: result?.msg || result?.message || 'API request failed',
      }
    }

    return {
      error: false,
      data: result,
    }
  } catch (error: any) {
    return {
      error: true,
      msg: error?.message || 'Network error',
    }
  }
}
