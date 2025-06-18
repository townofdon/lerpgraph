import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'

export const Slide19 = (props: SlideProps) => {
  return (
    <SlideShowContainer {...props} gap={0}>
      <h1>Thanks! 😄</h1>
      <h3>Resources:</h3>

      <div style={{ marginTop: 30 }}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/YJB1QnEmlTs?si=kqbSK4waUaKbA0So"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <div style={{ marginTop: 30 }}>
        <p>Cool usage of differential spring physics in game dev</p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/KPoeNZZ6H4s?si=py9c61HcdC6ehWgJ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <div style={{ marginTop: 30 }}>
        <p>Fantastic talk by Freya Holmér</p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/LSNQuFEDOyQ?si=4mIyp3XQxphm_XsY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </SlideShowContainer>
  )
}
