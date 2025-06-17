interface StackProps {
  direction?: React.CSSProperties['flexDirection']
  align?: React.CSSProperties['alignItems']
  justify?: React.CSSProperties['justifyItems']
  gap?: React.CSSProperties['gap']
  children?: React.ReactNode | React.ReactNode[]
}

export const Stack = ({
  direction = 'row',
  align = 'flex-start',
  justify = 'flex-start',
  gap = 0,
  children,
}: StackProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        gap,
      }}
    >
      {children}
    </div>
  )
}
