import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'

export const Slide01 = (props: SlideProps) => {
  return (
    <SlideShowContainer {...props}>
      <div style={{ marginTop: 80 }} />
      <h1><span className="accent3">What</span> is Lerp?</h1>
      <p><small><em>or, more importantly,</em></small></p>
      <h1><span className="accent2">Why</span> is Lerp?</h1>
    </SlideShowContainer>
  )
}
