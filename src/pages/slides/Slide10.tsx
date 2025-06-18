import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'

import easingFunctions from '../../assets/easingFunctions.png'
import { Code } from '../../components/Code'

export const Slide10 = (props: SlideProps) => {
  return (
    <SlideShowContainer {...props} gap={0}>
      <h1 style={{ marginTop: 60 }}>
        Easings make life better
      </h1>
      <p>
        We know that{' '}
        <code style={{ fontSize: 20 }}>
          <Code alt1>t</Code>
        </code>{' '}
        goes from 0 to 1. We can just slap any easing function on this, and
        violá! Instant curves.
      </p>
      <p>
        <a className="accent2" href="https://easings.net/" target="_blank">
          easings.net
        </a>
      </p>
      <img src={easingFunctions} width={800} style={{ marginTop: 30 }} />
    </SlideShowContainer>
  )
}
