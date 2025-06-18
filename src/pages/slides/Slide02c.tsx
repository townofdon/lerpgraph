import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'

export const Slide02c = (props: SlideProps) => {
  return (
    <SlideShowContainer {...props} gap={0}>
      <h1>Lerped values (<span className="accent4">A</span> or <span className="accent5">B</span>) can be:</h1>
      <ul style={{ fontSize: 22 }}>
        <li><strong>Floats</strong></li>
        <li><strong>Vectors</strong></li>
        <li><strong>Colors</strong></li>
        <li><strong>Quarternions</strong></li>
        <li><strong>Tensors</strong></li>
        <li><em>etc.</em></li>
      </ul>
    </SlideShowContainer>
  )
}
