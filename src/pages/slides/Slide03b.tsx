import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'

import bilin from '../../assets/bilinear-filtering-1.png'

export const Slide03b = (props: SlideProps) => {
  return (
    <SlideShowContainer {...props} gap={15}>
      {/* <h1><span className="accent2">Why</span> is Lerp?</h1> */}
      <p style={{ fontSize: 24, marginTop: 80 }}>
        <strong>Linear Interpolation</strong> is useful for all manner of
        things, including:
      </p>

      {/* prettier-ignore */}
      <ul>
        <li><strong className='accent'>Data Analysis</strong>: Estimating missing values in datasets.</li>
        <li><strong className='accent2'>Computer Graphics</strong>: Creating smooth animations and transitions between keyframes.</li>
        <li><strong className='accent3'>Engineering</strong>: Calculating intermediate values in simulations.</li>
      </ul>

      <div>
        <img src={bilin} width={200} />
        <p><em>Bilinear Filtering</em></p>
      </div>

      <p>
        <strong>And many more</strong>, like Finance, Statistics, Numerical
        Analysis, etc.
      </p>
    </SlideShowContainer>
  )
}
