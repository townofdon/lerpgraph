import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'

export const Slide16 = (props: SlideProps) => {
  return (
    <SlideShowContainer {...props} gap={0}>
      <h1>Exponential Decay Function</h1>
      <div className="example-code">
        <pre>
          <code style={{ fontSize: 24}}>
            v = <span className="accent4">b</span> + (<span className="accent5">a</span> - <span className="accent4">b</span>) * e^(-<span className="accent3">𝛌</span> * <span className="accent2">deltaTime</span>)
          </code>
        </pre>
      </div>
      <div>
        <ul style={{ fontSize: 22, marginTop: 60 }}>
          <li><code className="accent5">a</code> = some value A</li>
          <li><code className="accent4">b</code> = some value B</li>
          <li><code className="accent3">𝛌</code> = the decay constant (typically within the range [1,25])</li>
          <li><code className="accent2">deltaTime</code> = the time elapsed since the last frame (in seconds)</li>
        </ul>
      </div>
    </SlideShowContainer>
  )
}
