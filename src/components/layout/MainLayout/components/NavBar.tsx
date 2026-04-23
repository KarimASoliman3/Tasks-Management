import { Logo } from "../../../ui/Logo/Logo"

interface Props {
  onMenuClick: () => void
  isCollapsed: boolean
  isMobile: boolean
}

export function NavBar({ onMenuClick, isCollapsed,isMobile }: Props) {
  return (
    <header className={`h-16 flex items-center justify-between px-4 border-b border-[#0000001A] bg-background transition-all duration-300 ${isCollapsed ? 'w-full fixed left-0 right-0' : ''}`}>
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        {isMobile && (
          <button
            onClick={onMenuClick}
            className="md:hidden cursor-pointer"
          >
            ☰
          </button>
        )}
        {/* Desktop collapsed logo */}
        {isCollapsed && !isMobile && (
          <Logo text="TASKLY" />
        )}
        {/* Mobile title ONLY */}
        {isMobile && (
          <span className="font-bold tracking-[-0.5px] text-slate-900 text-xl">
            TASKLY
          </span>
        )}
      </div>

      {/* Right side */}
      <div
        className={`
          flex items-center gap-4
          ${isCollapsed ? "border-l border-[#C3C6D64D] pl-4" : ""}
        `}
      >

        {/* User info ONLY on desktop expanded */}
        {!isMobile && (
          <div className="flex flex-col text-right">
            <h3 className="font-semibold capitalize text-slate-900">
              Mahmoud Taha
            </h3>
            <h5 className="text-[10px] font-bold text-primary uppercase">
              Project Manager
            </h5>
          </div>
        )}

        {/* Avatar always visible */}
        <div className="bg-primary h-10 w-10 rounded-lg flex items-center justify-center text-white shadow-[0px_1px_2px_0px_#0000000D]">
          <span className="font-bold text-[16px]">MT</span>
        </div>

      </div>

    </header>
  )
}