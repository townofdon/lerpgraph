import '../App.css'

interface CodeProps {
  children?: React.ReactNode
  keyword?: boolean
  variable?: boolean
  value?: boolean
  func?: boolean
  alt1?: boolean
  alt2?: boolean
  alt3?: boolean
  alt4?: boolean
}

export const Code = ({
  children,
  keyword,
  variable,
  value,
  func,
  alt1,
  alt2,
  alt3,
  alt4,
}: CodeProps) => {
  const className = (() => {
    if (keyword) return 'keyword'
    if (variable) return 'var'
    if (value) return 'value'
    if (keyword) return 'keyword'
    if (func) return 'function'
    if (alt1) return 'alt1'
    if (alt2) return 'alt2'
    if (alt3) return 'alt3'
    if (alt4) return 'alt4'
    return ''
  })()
  return (
    <span className={className}>{children}</span>
  )
}
