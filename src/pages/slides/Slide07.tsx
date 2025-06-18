import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'

export const Slide07 = (props: SlideProps) => {

  return (
    <SlideShowContainer {...props}>
      <div>
        <h1>Lerp is...</h1>
        <ul style={{ fontSize: 24 }}>
          <li>A <span className="accent3">powerful</span> tool</li>
          <li>Computationally <span className="accent2">cheap</span></li>
          <li><span className="accent">Simple</span> to reason about</li>
          <li><strong>Easy</strong> to implement</li>
        </ul>
      </div>
    </SlideShowContainer>
  )
}
