import { useState } from "react"
import { Icon, type IconName } from "../../../ui/Icon"


const Footer = () => {

    const menuItems: {
        label: string
        icon: IconName
        route: string
      }[] = [
        { label: 'Projects', icon: 'start', route: '/start' },
        { label: 'Epics', icon: 'projectEpics', route: '/projectEpics' },
        { label: 'Tasks', icon: 'projectTasks', route: '/projectTasks' },
        { label: 'Members', icon: 'projectMembers', route: '/projectMembers' },
        { label: 'Details', icon: 'projectDetails', route: '/projectDetails' },
      ]
    const [activeRoute, setActiveRoute] = useState<string>(menuItems[0].route)

  return <>
   <footer className="bg-surface-low py-[14.5px] px-3 w-full max-w-97.5 mx-auto">
  <ul className="flex">
    {menuItems.map((item) => (
      <li
        key={item.route}
        onClick={() => setActiveRoute(item.route)}
        className={`flex-1 flex flex-col items-center justify-center cursor-pointer text-[#041B3CB2]
        ${activeRoute === item.route ? 'text-primary' : ''}`}
      >
        <Icon name={item.icon} className="size-4.5" />
        <span className="text-[11px] font-semibold truncate">
          {item.label}
        </span>
      </li>
    ))}
  </ul>
</footer>
  </>
}

export default Footer