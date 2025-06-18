import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'

import expDecayImg from '../../assets/expdecay2.jpg'

export const Slide15 = (props: SlideProps) => {
  return (
    <SlideShowContainer {...props} gap={0}>
      <h1>What is Lerp smoothing, exactly?</h1>
      <h2>It's suspiciously similar to an <span className="accent3">exponential decay curve</span>.</h2>
      <img src={expDecayImg} style={{ marginTop: 30 }} />
    </SlideShowContainer>
  )
}
