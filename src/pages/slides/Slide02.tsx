import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'

export const Slide02 = (props: SlideProps) => {
  return (
    <SlideShowContainer {...props}>
      <h1>Why is Lerp?</h1>
      <p>
        <strong>Linear Interpolation</strong> is useful for all manner of
        things, including:
      </p>

      {/* prettier-ignore */}
      <ul>
        <li><strong>Data Analysis</strong>: Estimating values in datasets where data is missing or not available at specific points.</li>
        <li><strong>Computer Graphics</strong>: Creating smooth animations and transitions by interpolating between keyframes.</li>
        <li><strong>Engineering</strong>: Calculating intermediate values in experiments or simulations.</li>
        <li><strong>Finance</strong>: Estimating security prices or yields based on historical data.</li>
        <li><strong>Statistics</strong>: Finding medians, quartiles, and percentiles in grouped data.</li>
        <li><strong>Numerical Analysis</strong>: Approximating functions or solving equations.</li>
      </ul>
    </SlideShowContainer>
  )
}
