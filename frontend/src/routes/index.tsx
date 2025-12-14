import { createFileRoute } from '@tanstack/react-router'
import { treaty } from '@elysiajs/eden'
import type { App as AppTreaty } from '@ttv-song-request/eden-rpc'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import useWebSocket from 'react-use-websocket'

export const Route = createFileRoute('/')({
  component: App,
})

const app = treaty<AppTreaty>('localhost:3001')

function App() {
  const [socketUrl] = useState('ws://localhost:3001/ws')

  const { lastMessage } = useWebSocket(socketUrl)

  const { isLoading, data } = useQuery({
    queryKey: ['queue'],
    queryFn: () => app.queue.get(),
  })

  const audioRef = useRef<HTMLAudioElement>(null)

  console.log(lastMessage)

  useEffect(() => {
    if (lastMessage !== null) {
      const messageData = JSON.parse(lastMessage.data)
      const status = messageData.status

      if (status === 'playing') {
        if (!audioRef.current) return
        console.log('playing audio')
        audioRef.current.src = 'http://localhost:3001/play-current'
        audioRef.current.play()
      }
    }
  }, [lastMessage])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="text-center">
      <Button type="button" onClick={() => app.next.post()}>
        load next
      </Button>
      <div>
        {data?.data?.map((item) => (
          <div key={item.id} className="border p-4 my-2">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p>Requested by: {item.userId}</p>
            <p>Position in queue: {item.position}</p>
            <p>Time until play: {item.formattedTimeUntilPlay}</p>
            <p>
              Duration: {Math.floor(item.duration / 60)}:
              {(item.duration % 60).toString().padStart(2, '0')}
            </p>
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          if (!audioRef.current) return

          audioRef.current.src = 'http://localhost:3001/play-current'
          audioRef.current.play()
        }}
      >
        play
      </Button>
      <audio controls ref={audioRef} autoPlay></audio>

      <div>
        <Button type="button" onClick={() => app.get()}>
          fetch rpc
        </Button>
      </div>
    </div>
  )
}
