import { useState } from 'react'
import icon from '../assets/copy-to-clipboard.png'

const SIZE = 20

interface CopyToClipboardProps {
  inputRef: React.RefObject<HTMLInputElement | null>
}

export const CopyToClipboard = ({ inputRef: input }: CopyToClipboardProps) => {
  const [success, setSuccess] = useState(false)

  const handleClick = () => {
    if (!input.current) return
    input.current.select()
    // input.current.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(input.current.value)
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000)
  }

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={handleClick}
      style={{ position: 'relative', display: 'inline-flex', padding: 5, background: '#222', borderRadius: 5 }}
    >
      <img src={icon} width={SIZE} height={SIZE} />
      {success && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            borderRadius: 5,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(0, 205, 60, 0.85)',
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 900 }}>✓</span>
        </div>
      )}
    </div>
  )
}
