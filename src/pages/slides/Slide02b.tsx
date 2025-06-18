import { Code } from '../../components/Code'
import { SlideShowContainer } from '../../components/SlideShowContainer'
import { Stack } from '../../components/Stack'
import type { SlideProps } from '../../types'

export const Slide02b = (props: SlideProps) => {
  return (
    <SlideShowContainer {...props}>
      <Stack direction="column" align="center" style={{ marginTop: 60 }}>
        <h3>Formula</h3>
        <div className="equation-container">
          <pre>
            <code className="large">
              <Code value>v</Code> = <Code alt4>a</Code> <Code func>*</Code>{' '}
              (<Code alt1>t</Code> - 1) <Code func>+</Code> <Code alt3>b</Code>{' '}
              <Code func>*</Code> <Code alt1>t</Code>
            </code>
          </pre>
        </div>
        {/* <div>
          <ul style={{ fontSize: 24 }}>
            <li><code><Code alt4>a</Code></code> = some value A</li>
            <li><code><Code alt3>b</Code></code> = some value B</li>
            <li><code><Code alt1>t</Code></code> = number between [0,1]</li>
            <li><code><Code value>v</Code></code> = result</li>
          </ul>
        </div> */}
        <div style={{ fontSize: 24, marginTop: 60, marginLeft: 80 }}>
          <p>At <code><Code alt1>t</Code> = 0</code>, the value will be <code><Code alt4>a</Code></code></p>
          <p>At <code><Code alt1>t</Code> = 1</code>, the value will be <code><Code alt3>b</Code></code></p>
          <p>At <code><Code alt1>t</Code> = 0.5</code>, the value will be halfway between <code><Code alt4>a</Code></code> and <code><Code alt3>b</Code></code></p>
        </div>
      </Stack>
    </SlideShowContainer>
  )
}
