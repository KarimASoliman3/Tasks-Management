// import { icons } from './assets/icons/icons'

import { Button } from './components/Button'
// import { Icon } from './components/Icon'

const App = () => {
  return (
    <>
      {/* <div className="flex gap-4">
        <Icon name="architecture" size="lg" className="rounded-full" />
        <Icon name="architecture" size="md" className="rounded-full" />
        <Icon name="architecture" size="sm" className="rounded-full" />
      </div> */}

      <div className="flex gap-4 p-4">
        <Button>Primary Action</Button>

        <Button variant="secondary">Secondary</Button>

        <Button variant="ghost">Ghost</Button>
      </div>
    </>
  )
}

export default App
