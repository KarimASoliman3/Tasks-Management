import { useMemo } from 'react'
import { Logo } from '../../../ui/Logo/Logo'
import NavUserDataSkeleton from '../../../ui/SkeltonLoading/NavUserDataSkeleton'
import { useAppSelector } from '../../../../store/hooks'

interface Props {
  onMenuClick: () => void
  isCollapsed: boolean
  isMobile: boolean
}

export function NavBar({ onMenuClick, isCollapsed, isMobile }: Props) {
  const { user, loading } = useAppSelector((state) => state.user)

  const fullName = useMemo(() => {
    if (!user) return ''
    return user.user_metadata?.name || user.email.split('@')[0]
  }, [user])

  const role = useMemo(() => {
    if (!user) return ''
    // Some APIs store job title as job_title, others as jobTitle
    return (
      user.user_metadata?.department ||
      user.user_metadata?.job_title ||
      user.user_metadata?.jobTitle ||
      'Member'
    )
  }, [user])

  const initials = useMemo(() => {
    if (!fullName) return ''
    const parts = fullName.trim().split(/\s+/)
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase()
    }
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }, [fullName])

  return (
    <header
      className={`h-16 flex items-center justify-between px-4 border-b border-[#0000001A] bg-background transition-all duration-300 ${isCollapsed ? 'w-full fixed left-0 right-0' : ''}`}
    >
      {/* Left side */}
      <div className="flex items-center gap-3">
        {isMobile && (
          <button onClick={onMenuClick} className="md:hidden cursor-pointer">
            ☰
          </button>
        )}
        {isCollapsed && !isMobile && <Logo text="TASKLY" />}
        {isMobile && (
          <span className="font-bold tracking-[-0.5px] text-slate-900 text-xl">TASKLY</span>
        )}
      </div>

      {/* Right side */}
      <div
        className={`flex items-center gap-4 ${isCollapsed ? 'border-l border-[#C3C6D64D] pl-4' : ''} `}
      >
        {loading ? (
          <NavUserDataSkeleton isMobile={isMobile} />
        ) : user ? (
          <>
            {/* User info */}
            {!isMobile && (
              <div className="flex flex-col text-right">
                <h3 className="font-semibold capitalize text-slate-900 ">{fullName}</h3>
                <h5 className="text-[10px] font-bold text-primary uppercase">{role}</h5>
              </div>
            )}
            {/* Avatar*/}
            <div className="bg-primary h-10 w-10 rounded-lg flex items-center justify-center text-white shadow-[0px_1px_2px_0px_#0000000D]">
              <span className="font-bold text-[16px]">{initials}</span>
            </div>
          </>
        ) : null}
      </div>
    </header>
  )
}




