import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'

export const Slide03 = (props: SlideProps) => {
  return (
    <SlideShowContainer {...props}>
      <h1><span className="accent2">Why</span> is Lerp?</h1>
      <div>
        <p style={{ fontSize: 18 }}>
          <strong>Why is this useful?</strong>
        </p>
        <p>
          <em>
            <small>Why should we care?</small>
          </em>
        </p>
      </div>
    </SlideShowContainer>
  )
}
