import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'

import wat from '../../assets/wat.jpeg'

export const Slide01b = (props: SlideProps) => {
  return (
    <SlideShowContainer {...props}>
      <img src={wat} alt="WAT" style={{marginTop: 80}} />
    </SlideShowContainer>
  )
}
