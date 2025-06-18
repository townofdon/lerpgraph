import { Link } from 'react-router'
import { Stack, type StackProps } from './Stack'

import type { SlideProps } from '../types'
import { useSlideKeyboardNavigation } from '../hooks/useSlideKeyboardNavigation'

import '../App.css'

interface SlideShowContainerProps extends SlideProps {
  slideIndex: number
  children?: React.ReactNode | React.ReactNode[]
  align?: StackProps['align']
}

export const SlideShowContainer = ({
  children,
  slideIndex,
  lastSlide,
}: SlideShowContainerProps) => {
  useSlideKeyboardNavigation(slideIndex)

  return (
    <main>
      <Stack
        direction="row"
        align="center"
        justify="space-between"
        gap={60}
      >
        <Link to="/">Home</Link>
        {slideIndex > 1 && (
          <Link to={`/slide-${slideIndex - 1}`}>&lt;-- Prev Slide</Link>
        )}
        {!lastSlide && (
          <Link to={`/slide-${slideIndex + 1}`}>Next Slide --&gt;</Link>
        )}
      </Stack>
      <Stack
        direction="column"
        align="center"
        justify="center"
        gap={30}
        className="container slideshow"
      >
        {children}
      </Stack>
    </main>
  )
}
