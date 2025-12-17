import { useEffect } from 'react'

export const useVolume = (videoRef: React.RefObject<HTMLVideoElement | null>, volume: number) => {
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) {
      return
    }
    videoElement.volume = volume
  }, [videoRef, volume])
}
