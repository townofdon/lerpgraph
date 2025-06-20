import '../App.css'

interface CodeProps {
  children?: React.ReactNode
  keyword?: boolean
  variable?: boolean
  value?: boolean
  func?: boolean
  comment?: boolean
  alt1?: boolean
  alt2?: boolean
  alt3?: boolean
  alt4?: boolean
  alt5?: boolean
}

export const Code = ({
  children,
  keyword,
  variable,
  value,
  func,
  comment,
  alt1,
  alt2,
  alt3,
  alt4,
  alt5,
}: CodeProps) => {
  const className = (() => {
    if (keyword) return 'keyword'
    if (variable) return 'var'
    if (value) return 'value'
    if (keyword) return 'keyword'
    if (func) return 'function'
    if (comment) return 'comment'
    if (alt1) return 'alt1'
    if (alt2) return 'alt2'
    if (alt3) return 'alt3'
    if (alt4) return 'alt4'
    if (alt5) return 'alt5'
    return ''
  })()
  return (
    <span className={className}>{children}</span>
  )
}
