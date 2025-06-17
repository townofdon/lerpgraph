import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { addSlideEventHandler, type SlideEvent } from '../events/slideEvents'

export const useSlideEvents = (lastSlideIndex: number) => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleSlideEvent = (ev: SlideEvent) => {
      const next = ev.slideIndex
      if (next < 1 || next > lastSlideIndex) return
      navigate(`slide-${next}`)
    }
    const cleanup = addSlideEventHandler(handleSlideEvent)
    return () => {
      cleanup()
    }
  }, [navigate, lastSlideIndex])
}
