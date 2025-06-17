import { Code } from '../../components/Code'
import { SlideShowContainer } from '../../components/SlideShowContainer'
import { Stack } from '../../components/Stack'
import type { SlideProps } from '../../types'

export const Slide01 = (props: SlideProps) => {
  return (
    <SlideShowContainer {...props}>
      <h1>What is Lerp?</h1>
      <h3>
        <span className="accent">L</span>inear Int
        <span className="accent">erp</span>olation {/* prettier-ignore */}
        <small>
          (<a href="https://en.wikipedia.org/wiki/Linear_interpolation" target="_blank" >wikipedia</a>)
        </small>
        <p><em>Method for blending from <span className='accent2'>A</span> to <span className='accent'>B</span>.</em></p>
      </h3>

      <Stack direction="column" align="center">
        <h3>Formula</h3>
        <div>
          <pre>
            <code className="large">
              <Code value>v</Code> = <Code variable>a</Code> <Code func>*</Code>{' '}
              (<Code alt1>t</Code> - 1) <Code func>+</Code> <Code alt2>b</Code>{' '}
              <Code func>*</Code> <Code alt1>t</Code>
            </code>
          </pre>
        </div>
      </Stack>
    </SlideShowContainer>
  )
}
