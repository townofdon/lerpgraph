import { useState } from 'react'
import { FancySlider } from '../../components/FancySlider'
import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'
import { lerp } from '../../utils/utils'

export const Slide05 = (props: SlideProps) => {
  const [blue, setBlue] = useState(0.25)
  const [red, setRed] = useState(0.75)
  const [t, setT] = useState(0)

  const mix = lerp(blue, red, t)

  return (
    <SlideShowContainer {...props}>
      <div>
        <h1>Lerping Position</h1>
        <FancySlider color="blue" value={blue} setValue={setBlue} left='A' />
        <FancySlider color="red" value={red} setValue={setRed} left='B' />
        <FancySlider color="dark" value={mix} hideTrack />
        <FancySlider value={t} setValue={setT} left='0' right='1' />
        <div className="example-code" style={{ position: 'absolute' }}>
          <pre>
            <code className='large'>
              &nbsp;&nbsp;<span className="alt2">v</span> ={' '}
              <span className="function">lerp(</span>
              <span className="accent4">a</span>,{' '}
              <span className="accent5">b</span>,{' '}
              <span className="value">{t}</span>
              <span className="function">)</span>
            </code>
          </pre>
        </div>
      </div>
    </SlideShowContainer>
  )
}
