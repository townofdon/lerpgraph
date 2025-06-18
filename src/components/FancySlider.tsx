import type { SyntheticEvent } from 'react'

import './FancySlider.css'

interface FancySliderProps {
  value: number
  setValue?: (val: number) => void
  min?: number
  max?: number
  step?: number
  color?: 'default' | 'red' | 'blue' | 'yellow' | 'green' | 'dark'
  overrideColor?: React.CSSProperties['color']
  left?: React.ReactNode
  right?: React.ReactNode
  hideTrack?: boolean
}

export const FancySlider = ({
  value,
  setValue,
  min = 0,
  max = 1,
  step = 0.001,
  color = 'default',
  overrideColor,
  left,
  right,
  hideTrack,
}: FancySliderProps) => {
  const handleChange = (ev: SyntheticEvent<HTMLInputElement, Event>) => {
    if (!setValue) return
    const rawValue = (ev.target as HTMLInputElement).value
    const value = parseFloat(rawValue) || 0
    setValue(value)
  }
  return (
    <div className='fancy-slider-container'>
      {left && <span className="label-left">{left}</span>}
      <input
        className={`fancy-slider ${color} ${hideTrack ? 'hide-track' : ''}`}
        style={{ color: overrideColor }}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onInput={handleChange}
      />
      {right && <span className="label-right">{right}</span>}
    </div>
  )
}
