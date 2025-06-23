import { Link } from 'react-router'
import { Stack } from './Stack'

interface HeaderProps {
  children?: React.ReactNode | React.ReactNode[]
}

export const Header = ({ children }: HeaderProps) => {
  return (
    <main className="header">
      <Stack
        className='navigation'
        direction="row"
        align="center"
        justify="flex-start"
        gap={60}
      >
        <h1>
          <Link to="/">lerpgraph</Link>
        </h1>
        <p>
          <Link to="/damped-spring-solvers">
            Damped Spring Response Solvers
          </Link>
        </p>
        <p>
          <Link to="/slide-1">Slideshow: What Is A Lerp?</Link>
        </p>
        {children}
      </Stack>
    </main>
  )
}
