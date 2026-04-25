import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { isTokenExpired } from '../../utils/tokenUtils'

interface AuthState {
  isLoggedIn: boolean
  isLoading: boolean
}

const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: true,
}

function clearAuthCookies() {
  document.cookie = 'access_token=; Max-Age=0; path=/'
  document.cookie = 'refresh_token=; Max-Age=0; path=/'
  localStorage.removeItem('user')
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: (state) => {
      const tokenMatch = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'))
      const token = tokenMatch ? tokenMatch[2] : null

      if (token && !isTokenExpired(token)) {
        state.isLoggedIn = true
      } else {
        // Token missing or expired — clean up stale auth data
        if (token) clearAuthCookies()
        state.isLoggedIn = false
      }
      state.isLoading = false
    },
    login: (state) => {
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.isLoggedIn = false
      clearAuthCookies()
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { initializeAuth, login, logout, setAuthLoading } = authSlice.actions
export default authSlice.reducer
