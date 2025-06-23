import { useEffect, useRef, useState, type SyntheticEvent } from 'react'
import { CopyToClipboard } from './CopyToClipboard'

interface InputProps {
  label: string
  value: number
  setValue: (val: number) => void
  slider?: boolean
  min?: number
  max?: number
  step?: number
  copiable?: boolean
  reset?: number
}
export const Input = ({
  label,
  value,
  slider,
  setValue,
  min = 0,
  max = 1,
  step = 0.1,
  copiable = false,
  reset,
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [internal, setInternal] = useState(String(value))

  const debounceFn = useRef<() => void>(() => {})
  const debounceTimer = useRef<number>(0)

  const internalRef = useRef(internal)
  internalRef.current = internal

  useEffect(() => {
    if (String(value) !== internalRef.current) {
      setInternal(String(value))
    }
  }, [value, setValue])

  const handleChange = (ev: SyntheticEvent<HTMLInputElement, Event>) => {
    const rawValue = (ev.target as HTMLInputElement).value
    const value = parseFloat(rawValue) || 0
    setInternal(rawValue)
    if (slider) {
      if (value < min) {
        setInternal(String(min))
      } else if (value > max) {
        setInternal(String(max))
      }
    }

    debounceFn.current = () => {
      setValue(value)
      if (slider) {
        if (value < min) {
          setValue(min)
        } else if (value > max) {
          setValue(max)
        }
      }
    }

    if (debounceTimer.current) {
      return
    }

    debounceTimer.current = setTimeout(() => {
      debounceTimer.current = 0
      debounceFn.current()
    }, 20)
  }

  return (
    <div className="input-container">
      <label style={{ position: 'relative' }}>
        <span>{label}</span>
        <input
          ref={inputRef}
          type="number"
          value={internal}
          placeholder="0"
          step={step}
          onChange={handleChange}
        />
        {copiable && (
          <div style={{ position: 'absolute', left: '100%', top: 0, marginLeft: 5, marginTop: -5 }}>
            <CopyToClipboard inputRef={inputRef} />
          </div>
        )}
        {reset !== undefined && value !== reset && (
          <div style={{ position: 'absolute', right: '100%', top: -3, marginRight: 8 }}>
            <button className='undo' onClick={() => setValue(reset)}>↪️</button>
          </div>
        )}
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
