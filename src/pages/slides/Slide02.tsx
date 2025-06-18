import { Code } from '../../components/Code'
import { SlideShowContainer } from '../../components/SlideShowContainer'
import { Stack } from '../../components/Stack'
import type { SlideProps } from '../../types'

export const Slide02 = (props: SlideProps) => {
  return (
    <SlideShowContainer {...props}>
      <h1 style={{ marginTop: 80 }}>
        <span className="accent">L</span>inear Int
        <span className="accent">erp</span>olation {/* prettier-ignore */}
        <small>
          <small>
            (<a href="https://en.wikipedia.org/wiki/Linear_interpolation" target="_blank" >wikipedia</a>)
          </small>
        </small>
      </h1>

      <p style={{ fontSize: 20 }}>
        <em>
          Method for blending from <strong className="accent2">A</strong> to{' '}
          <strong className="accent">B</strong>.
        </em>
      </p>

      <Stack direction="column" align="center">
        <h3>Formula</h3>
        <div className="equation-container">
          <pre>
            <code className="large">
              <Code value>v</Code> = <Code variable>a</Code> <Code func>*</Code>{' '}
              (<Code alt1>t</Code> - 1) <Code func>+</Code> <Code alt3>b</Code>{' '}
              <Code func>*</Code> <Code alt1>t</Code>
            </code>
          </pre>
        </div>
        <div>
          <ul style={{ fontSize: 24 }}>
            <li><code><Code variable>a</Code></code> = some value A</li>
            <li><code><Code alt3>b</Code></code> = some value B</li>
            <li><code><Code alt1>t</Code></code> = number between [0,1]</li>
            <li><code><Code value>v</Code></code> = result</li>
          </ul>
        </div>
      </Stack>
    </SlideShowContainer>
  )
}
