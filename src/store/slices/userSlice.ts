import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { getUserData } from '../../services/getUserData'
import { getValidAccessToken } from '../../utils/tokenUtils'
import { logout } from './authSlice'

interface User {
  id: string
  email: string
  user_metadata?: {
    name?: string
    job_title?: string
    jobTitle?: string
    department?:string
  }
}

interface UserState {
  user: User | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  user: null,
  loading: true,
  error: null,
}

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, { dispatch, rejectWithValue }) => {
    const token = await getValidAccessToken()
    if (!token) {
      dispatch(logout())
      return rejectWithValue('Session expired. Please log in again.')
    }

    const result = await getUserData(token)

    if (result.error) {
      // If the API reports an auth error, log the user out automatically
      if (
        result.code === 'token_expired' ||
        result.code === 'bad_jwt' ||
        result.code === 'unauthorized' ||
        result.code === 'invalid_token'
      ) {
        dispatch(logout())
      }
      return rejectWithValue(result.msg || 'Failed to fetch user')
    }

    return result.user as User
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null
      state.loading = false
      state.error = null
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
      state.loading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.user = null
      })
  },
})

export const { clearUser, setUser } = userSlice.actions
export default userSlice.reducer
