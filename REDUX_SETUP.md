# Redux Toolkit Setup — Developer Guide

This project uses **Redux Toolkit** with **Thunk** for global state management, replacing the previous React Context-based auth state.

---

## Project Structure

```
src/
├── store/
│   ├── store.ts              # Global store configuration
│   ├── hooks.ts              # Typed useAppDispatch & useAppSelector
│   └── slices/
│       ├── authSlice.ts      # Auth state (isLoggedIn, isLoading, login/logout)
│       └── userSlice.ts      # User state + async thunk (fetchUserData)
```

---

## Quick Start

### Read state from a component

```tsx
import { useAppSelector } from '../store/hooks'

const { isLoggedIn, isLoading } = useAppSelector((state) => state.auth)
const { user, loading } = useAppSelector((state) => state.user)
```

### Dispatch an action

```tsx
import { useAppDispatch } from '../store/hooks'
import { login, logout } from '../store/slices/authSlice'
import { setUser, clearUser, fetchUserData } from '../store/slices/userSlice'

const dispatch = useAppDispatch()

// Sync actions
dispatch(login())
dispatch(logout())
dispatch(clearUser())
dispatch(setUser(userObject))

// Async thunk
dispatch(fetchUserData())
```

---

## Slices Overview

### `authSlice`

| State      | Type    | Description                    |
| ---------- | ------- | ------------------------------ |
| isLoggedIn | boolean | True when auth tokens exist    |
| isLoading  | boolean | True during initial auth check |

| Action             | Description                         |
| ------------------ | ----------------------------------- |
| `initializeAuth()` | Checks cookies, sets auth state     |
| `login()`          | Sets `isLoggedIn = true`            |
| `logout()`         | Clears cookies, localStorage, state |
| `setAuthLoading()` | Set loading state explicitly        |

### `userSlice`

| State   | Type           | Description                  |
| ------- | -------------- | ---------------------------- |
| user    | User \| null   | Current user data            |
| loading | boolean        | True while fetching user     |
| error   | string \| null | Error message if fetch fails |

| Action / Thunk    | Description                              |
| ----------------- | ---------------------------------------- |
| `setUser()`       | Manually set user data                   |
| `clearUser()`     | Clear user from state                    |
| `fetchUserData()` | Async thunk — fetches user from Supabase |

---

## Adding a New Feature Slice

1. Create a new file: `src/store/slices/{feature}Slice.ts`
2. Define the state interface, initial state, and slice with reducers
3. Export actions and reducer
4. Register the reducer in `src/store/store.ts`:

```ts
import { configureStore } from '@reduxjs/toolkit'
import featureReducer from './slices/featureSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    feature: featureReducer, // ← add here
  },
})
```

5. Use `useAppSelector` and `useAppDispatch` from `src/store/hooks` in components

---

## Async Thunks Best Practices

- Create async thunks with `createAsyncThunk` for API calls
- Use `extraReducers` in the slice to handle `pending`, `fulfilled`, `rejected`
- Prefer dispatching thunks over manual state management for server data

---

## Why Redux instead of Context?

- **Predictable state updates** — single source of truth via the store
- **DevTools support** — time-travel debugging, state inspection
- **Better async handling** — thunks for side effects like API calls
- **Scalable** — easier to add new slices as features grow
- **Performance** — fine-grained selectors prevent unnecessary re-renders
