import { useState } from 'react'
import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { Easing, SlideProps } from '../../types'
import { Select } from '../../components/Select'
import {
  easeInCubic,
  easeInOutCubic,
  easeInOutQuad,
  easeInQuad,
  easeOutCubic,
  easeOutQuad,
} from '../../utils/easings'
import { FancySlider } from '../../components/FancySlider'
import { lerp } from '../../utils/utils'

export const Slide11 = (props: SlideProps) => {
  const [easing, setEasing] = useState<Easing>('in-cubic')
  const [a, setA] = useState(0)
  const [b, setB] = useState(1)
  const [t, setT] = useState(0)

  const easingFn = (() => {
    switch (easing) {
      case 'in-cubic':
        return easeInCubic
      case 'out-cubic':
        return easeOutCubic
      case 'in-out-cubic':
        return easeInOutCubic
      case 'in-quad':
        return easeInQuad
      case 'out-quad':
        return easeOutQuad
      case 'in-out-quad':
        return easeInOutQuad
      default:
        return (v: number) => v
    }
  })()

  const mix = lerp(a, b, easingFn(t))

  return (
    <SlideShowContainer {...props} gap={0}>
      <div>
        <h2>Lerp with Easing Functions</h2>
        <Select
          name="easing"
          label="Easing"
          value={easing}
          setValue={setEasing}
          options={[
            { value: 'in-quad', label: 'ease-in-quad' },
            { value: 'out-quad', label: 'ease-out-quad' },
            { value: 'in-out-quad', label: 'ease-in-out-quad' },
            { value: 'in-cubic', label: 'ease-in-cubic' },
            { value: 'out-cubic', label: 'ease-out-cubic' },
            { value: 'in-out-cubic', label: 'ease-in-out-cubic' },
          ]}
        />
        <FancySlider color="blue" value={a} setValue={setA} left='A' />
        <FancySlider color="red" value={b} setValue={setB} left='B' />
        <FancySlider color="dark" value={mix} hideTrack />
        <FancySlider value={t} setValue={setT} left='0' right='1' />
        <div className="example-code" style={{ position: 'absolute', marginLeft: -60 }}>
          <pre>
            <code className='large'>
              &nbsp;&nbsp;<span className="alt2">v</span> ={' '}
              <span className="function">lerp(</span>
              <span className="alt4">a</span>,{' '}
              <span className="alt3">b</span>,{' '}
              <span className="value">
                <span className="function">easeFn(</span>
                  {t}
                <span className="function">)</span>
              </span>
              <span className="function">)</span>
            </code>
          </pre>
        </div>
      </div>
    </SlideShowContainer>
  )
}
