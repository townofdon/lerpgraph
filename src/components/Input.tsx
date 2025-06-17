import { useState, type SyntheticEvent } from 'react'

interface InputProps {
  label: string
  initialValue: number
  setValue: (val: number) => void
  slider?: boolean
  exp?: boolean
  min?: number
  max?: number
  step?: number
}
export const Input = ({
  label,
  initialValue,
  slider,
  setValue,
  min = 0,
  max = 1,
  step = 0.1,
}: InputProps) => {
  const [internal, setInternal] = useState(String(initialValue))
  const handleChange = (ev: SyntheticEvent<HTMLInputElement, Event>) => {
    const rawValue = (ev.target as HTMLInputElement).value
    const value = parseFloat(rawValue) || 0
    setValue(value)
    setInternal(rawValue)
    if (slider) {
      if (value < min) {
        setValue(min)
        setInternal(String(min))
      } else if (value > max) {
        setValue(max)
        setInternal(String(max))
      }
    }
  }
  return (
    <div className="input-container">
      <label>
        <span>{label}</span>
        <input
          type="number"
          value={internal}
          placeholder="0"
          step={step}
          onChange={handleChange}
        />
      </label>
      {slider && (
        <div>
          <input
            type="range"
            min={min}
            max={max}
            value={internal}
            step={step}
            onInput={handleChange}
          />
        </div>
      )}
    </div>
  )
}
