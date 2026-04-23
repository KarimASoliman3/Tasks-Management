import { useState } from 'react'
import { Logo } from '../../../ui/Logo/Logo'
import { Icon, type IconName } from '../../../ui/Icon'
import { NavLink } from 'react-router-dom'

interface Props {
  isMobile: boolean
  isOpen: boolean
  isCollapsed: boolean
  onClose: () => void
  onToggleCollapse: () => void
}

export function Sidebar({ isMobile, isOpen, isCollapsed, onClose, onToggleCollapse }: Props) {
  const menuItems: {
    label: string
    icon: IconName
    route: string
  }[] = [
    { label: 'Projects', icon: 'projects', route: '/projects' },
    { label: 'Project Epics', icon: 'projectEpics', route: '/projectEpics' },
    { label: 'Project Tasks', icon: 'projectTasks', route: '/projectTasks' },
    { label: 'Project Members', icon: 'projectMembers', route: '/projectMembers' },
    { label: 'Project Details', icon: 'projectDetails', route: '/projectDetails' },
  ]

  const menuItemsCollapsed: {
    label: string
    icon: IconName
    route: string
  }[] = [
    { label: 'Projects', icon: 'start', route: '/start' },
    { label: 'Project Epics', icon: 'projectEpics', route: '/projectEpics' },
    { label: 'Project Tasks', icon: 'projectTasks', route: '/projectTasks' },
    { label: 'Project Members', icon: 'projectMembers', route: '/projectMembers' },
    { label: 'Project Details', icon: 'projectDetails', route: '/projectDetails' },
  ]
  const items = isCollapsed ? menuItemsCollapsed : menuItems
  const [activeRoute, setActiveRoute] = useState<string>(items[0].route)

  // =========================
  // 📱 MOBILE VIEW
  // =========================
  if (isMobile) {
    return (
      <>
        {/* Overlay */}
        {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}

        {/* Drawer */}
        <div
          className={`
            fixed top-0 left-0 h-full max:w-97.5
            bg-surface-low z-50
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        >
          <div className="p-4 flex flex-col h-full">
            <Logo text="TASKLY" className="mb-6" />

            <ul className="space-y-1">
              {menuItemsCollapsed.map((item) => (
                <li key={item.route} className="w-full">
                  <NavLink
                    to={item.route}
                    onClick={onClose}
                    className={({ isActive }) => `
            w-full flex items-center gap-3 px-4 py-3 rounded transition-all
            ${
              isActive
                ? 'bg-white text-primary shadow-[0px_1px_2px_0px_#0000000D]'
                : 'text-[#041B3C99] hover:bg-slate-100'
            }
          `}
                  >
                    <Icon size="sm" name={item.icon} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* footer */}
            <div className="mt-auto border-t border-[#C3C6D633] pt-6 space-y-1">
              <div className="flex gap-2 items-center py-2.5 px-3 text-error-default">
                <Icon name="logout" size="sm" />
                <span className="font-medium text-body-md">Logout</span>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  // =========================
  // 💻 DESKTOP VIEW
  // =========================
  return (
    <aside
      className={`
    relative bg-surface-low flex flex-col p-4 transition-all duration-300

    ${
      isCollapsed
        ? 'w-20 mt-16' // 👈 PUSH DOWN 64px (navbar height)
        : 'w-64'
    }
  `}
    >
      {/* Logo */}
      {!isCollapsed && <Logo text="TASKLY" className="mb-8" />}

      {/* Menu */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {items.map((item) => (
            <li
              key={item.route}
              onClick={() => setActiveRoute(item.route)}
              className={`group relative p-3.5 rounded flex items-center cursor-pointer
              ${isCollapsed ? 'justify-center' : 'gap-3'}
              ${
                activeRoute === item.route
                  ? 'bg-white shadow-[0px_1px_2px_0px_#0000000D] text-primary'
                  : 'text-[#041B3C99] hover:bg-slate-100'
              }`}
            >
              <Icon name={item.icon} />

              {/* Label */}
              {!isCollapsed && <span>{item.label}</span>}

              {/* Tooltip */}
              {isCollapsed && (
                <span
                  className={`absolute left-full ml-2  text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 ${activeRoute === item.route ? 'bg-primary' : 'bg-[#041B3C99]'}`}
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer actions */}
      <div className=" border-t border-[#C3C6D633] pt-6 space-y-1">
        {/* Collapse Toggle */}
        <div
          onClick={onToggleCollapse}
          className={`group relative py-2.5 flex items-center cursor-pointer
          ${isCollapsed ? 'justify-center' : 'gap-3 px-3'}`}
        >
          <Icon size="sm" name={isCollapsed ? 'arrowRight' : 'collapse'} />

          {!isCollapsed && <span>Collapse</span>}

          {isCollapsed && (
            <span className="absolute left-full ml-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
              Collapse
            </span>
          )}
        </div>

        {/* Logout */}
        <div
          className={`group relative py-2.5 flex items-center text-error-default cursor-pointer
          ${isCollapsed ? 'justify-center' : 'gap-3 px-3'}`}
        >
          <Icon size="sm" name="logout" />

          {!isCollapsed && <span>Logout</span>}

          {isCollapsed && (
            <span className="absolute left-full ml-2 bg-error-default text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
              Logout
            </span>
          )}
        </div>
      </div>
    </aside>
  )
}
