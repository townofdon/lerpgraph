import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'

export const Slide03b = (props: SlideProps) => {
  return (
    <SlideShowContainer {...props}>
      {/* <h1><span className="accent2">Why</span> is Lerp?</h1> */}
      <p style={{ fontSize: 24 }}>
        <strong>Linear Interpolation</strong> is useful for all manner of
        things, including:
      </p>

      {/* prettier-ignore */}
      <ul>
        <li><strong className='accent'>Data Analysis</strong>: Estimating missing values in datasets.</li>
        <li><strong className='accent2'>Computer Graphics</strong>: Creating smooth animations and transitions between keyframes.</li>
        <li><strong className='accent3'>Engineering</strong>: Calculating intermediate values in simulations.</li>
      </ul>

      <p>
        <strong>And many more</strong>, like Finance, Statistics, Numerical
        Analysis, etc.
      </p>
    </SlideShowContainer>
  )
}
