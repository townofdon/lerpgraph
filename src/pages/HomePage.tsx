import { useEffect, useRef, useState } from 'react'

import type { Vector } from '../types'
import { Input } from '../components/Input'
import { Stack } from '../components/Stack'
import { drawLerpCurve } from '../draw'
import { compute } from '../utils/compute'
import { BallAnimation } from '../components/BallAnimation'

import '../App.css'
import { Link } from 'react-router'

export function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [initialValue, setInitialValue] = useState(0)
  const [targetValue, setTargetValue] = useState(1)
  const [tValue, setTValue] = useState(0.2)
  const [domain, setDomain] = useState(1)
  const [mouse, setMouse] = useState<Vector>({ x: -1, y: -1 })

  useEffect(() => {
    if (!canvasRef.current) return
    const handleMouseMove = (ev: MouseEvent) => {
      const rect = (ev.target as HTMLCanvasElement).getBoundingClientRect()
      const x = ev.clientX - rect.left + 1
      const y = ev.clientY - rect.top + 1
      setMouse({ x, y })
    }
    const canvas = canvasRef.current
    canvas.addEventListener('mousemove', handleMouseMove)
    return () => {
      canvas?.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const data = compute(initialValue, targetValue, tValue, domain)
    drawLerpCurve(canvasRef.current, data, mouse)
  }, [initialValue, targetValue, tValue, domain, mouse])

  return (
    <main>
      <Stack direction="row" align="flex-start" gap={30} className="container">
        <Stack direction="column">
          <div>
            <h1>lerpgraph</h1>
            <p>
              <small>
                Leveraging{' '}
                <a
                  href="https://en.wikipedia.org/wiki/Linear_interpolation"
                  target="_blank"
                >
                  linear interpolation
                </a>{' '}
                to achieve a simple smooth follow procedural animation.
              </small>
            </p>
          </div>
          <div style={{ marginTop: 30 }}>
            <Input
              label="Initial value"
              initialValue={initialValue}
              setValue={setInitialValue}
            />
            <Input
              label="Target value"
              initialValue={targetValue}
              setValue={setTargetValue}
            />
            <Input
              label="T value"
              initialValue={tValue}
              setValue={setTValue}
              slider
              min={0}
              max={1}
              step={0.0001}
            />
            <div style={{ paddingTop: 30 }} />
            <Input
              label="Domain"
              initialValue={domain}
              setValue={setDomain}
              slider
              min={0.5}
              max={20}
              step={0.5}
            />
          </div>
          <div className="example-code">
            <pre>
              <code>
                <span className="keyword">let</span>{' '}
                <span className="var">x</span> ={' '}
                <span className="number">{initialValue}</span>
              </code>
            </pre>
            <pre>
              <code>
                <span className="keyword">function</span>{' '}
                <span className="function">update()</span> &#123;
              </code>
            </pre>
            <pre>
              <code>
                &nbsp;&nbsp;<span className="var">x</span> ={' '}
                <span className="function">lerp(</span>
                <span className="var">x</span>,{' '}
                <span className="number">{targetValue}</span>,{' '}
                <span className="number">{tValue}</span>
                <span className="function">)</span>
              </code>
            </pre>
            <pre>
              <code>&#125;</code>
            </pre>
          </div>
          <div style={{ marginTop: 30 }}>
            <h4><Link to="slide-1">Slideshow: What is a Lerp?</Link></h4>
          </div>
        </Stack>
        <div>
          <canvas ref={canvasRef} width="800" height="400" />
          <BallAnimation tValue={tValue} />
        </div>
      </Stack>
    </main>
  )
}
