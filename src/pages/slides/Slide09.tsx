import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'

import flexTapeEasing from '../../assets/flex-tape-easing.jpg'

export const Slide09 = (props: SlideProps) => {

  return (
    <SlideShowContainer {...props} gap={0}>
      <div>
        <h1 style={{ marginTop: 60}}>Easing Functions!</h1>
        <img src={flexTapeEasing} width={500} />
      </div>
    </SlideShowContainer>
  )
}
