import { Code } from '../../components/Code'
import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'

export const Slide12 = (props: SlideProps) => {
  return (
    <SlideShowContainer {...props} gap={0}>
      <h1>Hang on...</h1>
      <h2>
        What if we don't know{' '}
        <code style={{ fontSize: 26 }}>
          <Code alt1>t</Code>
        </code>
        ?
      </h2>
      <p style={{ marginTop: 20 }}>
        There are often cases where we don't know the start time of an
        animation.
      </p>
      <h2>Enter: <span className="accent">LERP SMOOTHING</span></h2>
    </SlideShowContainer>
  )
}
