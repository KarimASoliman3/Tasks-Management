

import { Button } from './components/ui/Button'
import { Icon } from './components/ui/Icon'
import { Logo } from './components/ui/Logo/Logo'

const App = () => {
  return (
    <>
      <div className="flex flex-col gap-6 p-10">
        <Logo text="TASKLY" src="/logo.svg" />
      </div>

      <div className="flex gap-4">
        <Icon name="architecture" size="lg" className="rounded-full" />
        <Icon name="architecture" size="md" className="rounded-full" />
        <Icon name="architecture" size="sm" className="rounded-full" />
      </div>

      <div className="flex gap-4 p-4">
        <Button>Primary Action</Button>

        <Button variant="secondary">Secondary</Button>

        <Button variant="ghost">Ghost</Button>
      </div>
    </>
  )
}

export default App
