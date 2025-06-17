interface CodeProps {
  children?: React.ReactNode
  keyword?: boolean
  variable?: boolean
  value?: boolean
  func?: boolean
  alt1?: boolean
  alt2?: boolean
}

export const Code = ({
  children,
  keyword,
  variable,
  value,
  func,
  alt1,
  alt2,
}: CodeProps) => {
  const className = (() => {
    if (keyword) return 'keyword'
    if (variable) return 'var'
    if (value) return 'value'
    if (keyword) return 'keyword'
    if (func) return 'function'
    if (alt1) return 'alt1'
    if (alt2) return 'alt2'
    return ''
  })()
  return (
    <span className={className}>{children}</span>
  )
}
