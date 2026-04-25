import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import { store } from './store/store'
import { initializeAuth } from './store/slices/authSlice'
import { fetchUserData } from './store/slices/userSlice'

// Initialize auth state from cookies before rendering
store.dispatch(initializeAuth())

// Fetch user data if already logged in (and token was validated as not expired)
const state = store.getState()
if (state.auth.isLoggedIn) {
  store.dispatch(fetchUserData())
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <Toaster position="top-center" reverseOrder={false} />
  </StrictMode>,
)
