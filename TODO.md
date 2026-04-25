# JWT Token Expiration Fix — TODO

- [x] 1. Install `jwt-decode`
- [x] 2. Create `src/utils/tokenUtils.ts`
- [x] 3. Update `src/store/slices/authSlice.ts` (validate `exp` on init, auto-logout)
- [x] 4. Update `src/store/slices/userSlice.ts` (use valid token, auto-logout on expiry)
- [x] 5. Update `src/services/getUserData.ts` (map `bad_jwt` error)
- [x] 6. Update `src/main.tsx` (guard `fetchUserData` with expiry check)
- [x] 7. Update `src/features/auth/components/LoginForm.tsx` (set cookie expiry from `exp`)
- [x] 8. Update `src/features/auth/components/LoginFormMobile.tsx` (set cookie expiry from `exp`)
- [x] 9. Run dev and verify
