// import { Outlet } from 'react-router-dom'
// import { Logo } from '../../ui/Logo/Logo'

// const AuthLayout = () => {
//   return (
//     <>
//       <div className="min-h-screen flex flex-col bg-background">
//         <header className="py-6.5 px-16.5">
//           <Logo text="TASKLY" />
//         </header>
//         <main className="flex-1 mt-4 mb-12 flex items-center justify-center">
//           <Outlet />
//         </main>
//         <footer className="h-[77.5px]"></footer>
//       </div>
//     </>
//   )
// }

// export default AuthLayout




import AuthLayoutDesktop from './AuthLayoutDesktop'
import AuthLayoutMobile from './AuthLayoutMobile'

const AuthLayout = () => {
  return (
    <>
      {/* Mobile */}
      <div className="max-[390px]:block hidden">
        <AuthLayoutMobile />
      </div>

      {/* Desktop */}
      <div className="max-[390px]:hidden">
        <AuthLayoutDesktop />
      </div>
    </>
  )
}

export default AuthLayout