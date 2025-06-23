import './Toggle.css'

interface ToggleProps {
  label?: string
  name: string
  checked: boolean
  toggle: React.Dispatch<React.SetStateAction<boolean>>
}

export const Toggle = ({ name, label, checked, toggle }: ToggleProps) => {
  return (
    <div className="switch-container">
      <label>
        <span className="switch">
          <input
            name={name}
            type="checkbox"
            checked={checked}
            onChange={() => {
              toggle((prev) => !prev)
            }}
          />
          <span className="slider round"></span>
        </span>
        {label && <span>{label}</span>}
      </label>
    </div>
  )
}
