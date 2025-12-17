import { api } from '@/api/api-treaty'
import type { QueueTrackedItem } from '@/routes'
import { formatDuration } from '@/utils/format-duration'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'motion/react'

export const Queue = () => {
  const { data: queueData, isLoading } = useQuery({
    queryKey: ['queue'],
    queryFn: async () => {
      const data = (await api.queue.get()) as { data: QueueTrackedItem[] }
      return data.data
    },
    refetchInterval: 1500,
  })

  if (isLoading || queueData?.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col">
      <h2 className="mr-auto ml-1 pb-2 text-lg font-semibold">Kolejka</h2>
      <div className="border rounded-lg border-neutral-700 overflow-hidden min-h-56">
        <AnimatePresence>
          {queueData?.map((item) => (
            <motion.div
              layout
              key={item.id}
              exit={{
                opacity: 0,
                translateY: 0,
                translateX: -100,
                transition: { duration: 0.3 },
              }}
              initial={{
                opacity: 0,
                translateY: 20,
                translateX: 0,
                transition: { duration: 0.3 },
              }}
              animate={{
                opacity: 1,
                translateY: 0,
                translateX: 0,
                transition: { duration: 0.3 },
              }}
              className="p-4 border-b border-neutral-700 bg-neutral-800 flex gap-4 items-center"
            >
              {item.thumbnail && (
                <a
                  href={item.videoUrl}
                  target="_blank"
                  className="shrink-0"
                  rel="noopener noreferrer"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-16 w-auto object-cover rounded border border-neutral-500"
                  />
                </a>
              )}
              <div className="text-left">
                <div className="font-semibold">{item.title}</div>
                <div className="text-gray-400 text-sm">
                  Czas trwania: {formatDuration(item.duration)} | Dodano przez @{item.username}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
