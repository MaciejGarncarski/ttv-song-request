import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { treaty } from '@elysiajs/eden'
import type { App as AppTreaty } from '@ttv-song-request/eden-rpc'

export const Route = createFileRoute('/')({
  component: App,
})

const app = treaty<AppTreaty>('localhost:3001')

function App() {
  return (
    <div className="text-center">
      <Button
        onClick={() => {
          app.get().then((c) => console.log(c))
        }}
      >
        Click me
      </Button>
    </div>
  )
}
