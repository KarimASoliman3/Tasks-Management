import { useState } from 'react'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { NavBar } from './components/NavBar'
import Footer from './components/Footer'

export default function Layout() {
  const isMobile = useMediaQuery('(max-width: 390px)')
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`relative  h-screen flex overflow-hidden `}>
      <Sidebar
        isMobile={isMobile}
        isOpen={isSidebarOpen}
        isCollapsed={isCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <NavBar
          onMenuClick={() => setSidebarOpen(true)}
          isCollapsed={isCollapsed}
          isMobile={isMobile}
        />

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </main>

        {isMobile && <Footer />}
      </div>
    </div>
  )
}
