import { useEffect } from 'react'

import { gotoSlide } from '../events/slideEvents'

export const useSlideKeyboardNavigation = (slideIndex: number) => {
  useEffect(() => {
    const handleKeypress = (ev: KeyboardEvent) => {
      if (ev.code === 'ArrowLeft' && ev.shiftKey) {
        gotoSlide(slideIndex - 1)
      }
      if (ev.code === 'ArrowRight' && ev.shiftKey) {
        gotoSlide(slideIndex + 1)
      }
    }
    document.addEventListener('keydown', handleKeypress)
    return () => {
      document.removeEventListener('keydown', handleKeypress)
    }
  }, [slideIndex])
}
