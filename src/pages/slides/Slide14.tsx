import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'

export const Slide14 = (props: SlideProps) => {
  return (
    <SlideShowContainer {...props} gap={0}>
      <h1>One small problem.</h1>
      <h2>Lerp Smoothing is <strong className='accent'>Broken</strong>.</h2>
      <p><strong>tl;dr:</strong> it's not frame rate independent.</p>
      <iframe
        style={{ marginTop: 30 }}
        width="560"
        height="315"
        src="https://www.youtube.com/embed/LSNQuFEDOyQ?si=4mIyp3XQxphm_XsY"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <p><em>^ Highly recommend this talk by Freya Holmér!</em></p>
    </SlideShowContainer>
  )
}
