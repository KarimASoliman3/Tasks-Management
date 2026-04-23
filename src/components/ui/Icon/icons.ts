// import architecture from '../../../assets/icons/architecture.svg'
// import dashboard from '../../../assets/icons/dashboard.svg'
// import description from '../../../assets/icons/description.svg'
// import event from '../../../assets/icons/event.svg'
// import groups from '../../../assets/icons/groups.svg'
// import hub from '../../../assets/icons/hub.svg'
// import inventory from '../../../assets/icons/inventory.svg'
// import mail from '../../../assets/icons/mail.svg'
// import mailGray from '../../../assets/icons/mail-gray.svg'
// import monitoring from '../../../assets/icons/monitoring.svg'
// import rocket from '../../../assets/icons/rocket.svg'
// import settings from '../../../assets/icons/settings.svg'
// import shield from '../../../assets/icons/shield.svg'
// import lock from '../../../assets/icons/lock.svg'
// import arrowRight from '../../../assets/icons/arrow-right.svg'
// import arrowLeft from '../../../assets/icons/arrowLeft.svg'
// import done from '../../../assets/icons/done.svg'
// import clock from '../../../assets/icons/clock.svg'
// import restore from '../../../assets/icons/restore.svg'

// import projects from '../../../assets/icons/projects.svg'
// import projectEpics from '../../../assets/icons/project-epics.svg'
// import projectTasks from '../../../assets/icons/project-tasks.svg'
// import projectMembers from '../../../assets/icons/project-members.svg'
// import projectDetails from '../../../assets/icons/project-details.svg'




// export const icons = {
//   architecture,
//   dashboard,
//   description,
//   event,
//   groups,
//   hub,
//   inventory,
//   mail,
//   mailGray,
//   monitoring,
//   rocket,
//   settings,
//   shield,
//   lock,
//   arrowRight,
//   arrowLeft,
//   done,
//   clock,
//   restore,
//   projects,
//   projectEpics,
//   projectTasks,
//   projectMembers,
//   projectDetails,
// }

// export type IconName = keyof typeof icons



import Architecture from '../../../assets/icons/architecture.svg?react'
import Dashboard from '../../../assets/icons/dashboard.svg?react'
import Description from '../../../assets/icons/description.svg?react'
import Event from '../../../assets/icons/event.svg?react'
import Groups from '../../../assets/icons/groups.svg?react'
import Hub from '../../../assets/icons/hub.svg?react'
import Inventory from '../../../assets/icons/inventory.svg?react'
import Mail from '../../../assets/icons/mail.svg?react'
import MailGray from '../../../assets/icons/mail-gray.svg?react'
import Monitoring from '../../../assets/icons/monitoring.svg?react'
import Rocket from '../../../assets/icons/rocket.svg?react'
import Settings from '../../../assets/icons/settings.svg?react'
import Shield from '../../../assets/icons/shield.svg?react'
import Lock from '../../../assets/icons/lock.svg?react'
import ArrowRight from '../../../assets/icons/arrow-right.svg?react'
import ArrowLeft from '../../../assets/icons/arrowLeft.svg?react'
import Done from '../../../assets/icons/done.svg?react'
import Clock from '../../../assets/icons/clock.svg?react'
import Restore from '../../../assets/icons/restore.svg?react'

import Projects from '../../../assets/icons/projects.svg?react'
import ProjectEpics from '../../../assets/icons/project-epics.svg?react'
import ProjectTasks from '../../../assets/icons/project-tasks.svg?react'
import ProjectMembers from '../../../assets/icons/project-members.svg?react'
import ProjectDetails from '../../../assets/icons/project-details.svg?react'
import Collapse from '../../../assets/icons/collapse.svg?react'
import Logout from '../../../assets/icons/Logout.svg?react'
import Start from '../../../assets/icons/start.svg?react'

export const icons = {
  architecture: Architecture,
  dashboard: Dashboard,
  description: Description,
  event: Event,
  groups: Groups,
  hub: Hub,
  inventory: Inventory,
  mail: Mail,
  mailGray: MailGray,
  monitoring: Monitoring,
  rocket: Rocket,
  settings: Settings,
  shield: Shield,
  lock: Lock,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  done: Done,
  clock: Clock,
  restore: Restore,
  projects: Projects,
  projectEpics: ProjectEpics,
  projectTasks: ProjectTasks,
  projectMembers: ProjectMembers,
  projectDetails: ProjectDetails,
  collapse:Collapse,
  logout:Logout,
  start:Start,
} as const

export type IconName = keyof typeof icons