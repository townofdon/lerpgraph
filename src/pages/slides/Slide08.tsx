import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'

// import butWhatIf from '../../assets/but-what-if.jpg'

export const Slide08 = (props: SlideProps) => {
  return (
    <SlideShowContainer {...props}>
      <div>
        <h1>But what if...</h1>
        <p style={{ fontSize: 20 }}>
          we <strong>DON'T</strong> want the motion to be{' '}
          <strong>linear</strong>?
        </p>
        {/* <img src={butWhatIf} width={300} height={340} style={{ marginTop: 60}} /> */}
      </div>
    </SlideShowContainer>
  )
}
