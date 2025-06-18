import { useState } from 'react'
import { FancySlider } from '../../components/FancySlider'
import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'
import { lerp } from '../../utils/utils'

export const Slide06 = (props: SlideProps) => {
  const [a, setA] = useState(0.8)
  const [b, setB] = useState(0.8)
  const [t, setT] = useState(.5)

  const mix = lerp(a, b, t)
  const car = a * 227
  const cag = a * 76
  const cab = a * 111
  const cbr = b * 21
  const cbg = b * 151
  const cbb = b * 255
  const cr = lerp(car, cbr, t)
  const cg = lerp(cag, cbg, t)
  const cb = lerp(cab, cbb, t)

  return (
    <SlideShowContainer {...props}>
      <div>
        <h1>Lerping Color</h1>
        <FancySlider color="red" value={a} setValue={setA} left='A' right={
          <div style={{
            width: 50,
            height: 50,
            backgroundColor: `rgb(${car},${cag},${cab})`,
            border: '4px solid #000',
          }} />
        } />
        <FancySlider color="blue" value={b} setValue={setB} left='B' right={
          <div style={{
            width: 50,
            height: 50,
            backgroundColor: `rgb(${cbr},${cbg},${cbb})`,
            border: '4px solid #000',
          }} />
        } />
        <FancySlider color="dark" value={mix} hideTrack />
        <div>
          <div style={{
            width: '100%',
            height: 100,
            backgroundColor: `rgb(${cr},${cg},${cb})`,
          }} />
        </div>
        <FancySlider value={t} setValue={setT} left='0' right='1' />
        <div className="example-code" style={{ position: 'absolute' }}>
          <pre>
            <code className='large'>
              &nbsp;&nbsp;<span className="alt2">c</span> ={' '}
              <span className="function">lerp(</span>
              <span className="accent5">a</span>,{' '}
              <span className="accent4">b</span>,{' '}
              <span className="value">{t}</span>
              <span className="function">)</span>
            </code>
          </pre>
        </div>
      </div>
    </SlideShowContainer>
  )
}
