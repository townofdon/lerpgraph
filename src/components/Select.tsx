export interface OptionValue<T extends string> {
  value: T
  label: string
}

interface SelectProps<T extends string> {
  label?: string
  name: string
  value: T
  setValue: (val: T) => void
  options: OptionValue<T>[]
}

export const Select = <T extends string>({
  label,
  name,
  value,
  setValue,
  options,
}: SelectProps<T>) => {
  const handleChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(ev.target.value as T)
  }
  const select = (
    <select
      name={name}
      value={value}
      onChange={handleChange}
      style={{ fontSize: 20, padding: '8px 16px', borderRadius: 10, background: '#222', border: '4px solid #313131' }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
  return <div>{label ? <label>{select}</label> : select}</div>
}
