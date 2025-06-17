interface StackProps {
  direction?: React.CSSProperties['flexDirection']
  align?: React.CSSProperties['alignItems']
  justify?: React.CSSProperties['justifyContent']
  gap?: React.CSSProperties['gap']
  children?: React.ReactNode | React.ReactNode[]
  className?: string
}

export const Stack = ({
  direction = 'row',
  align = 'flex-start',
  justify = 'flex-start',
  gap = 0,
  children,
  className,
}: StackProps) => {
  return (
    <div
      className={className}
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
