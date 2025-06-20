import { useEffect, useRef, useState } from 'react'

import type { Vector } from '../types'
import { Input } from '../components/Input'
import { Stack } from '../components/Stack'
import { drawLerpCurve } from '../draw'
import { computeExpDecayData, computeLerp } from '../utils/compute'
import { BallAnimation } from '../components/BallAnimation'

import '../App.css'
import { Link } from 'react-router'
import {
  getDecayConstantFromLerpWeight,
  getLerpWeightFromDecayConstant,
} from '../utils/utils'
import { Code } from '../components/Code'
import { DragChaseTest } from '../components/DragChaseTest'

const INITIAL_LERP_WEIGHT = 0.2
const FPS = 60

export function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [initialValue, setInitialValue] = useState(0)
  const [targetValue, setTargetValue] = useState(1)
  const [tValue, _setTValue] = useState(INITIAL_LERP_WEIGHT)
  const [decay, _setDecay] = useState(
    getDecayConstantFromLerpWeight(INITIAL_LERP_WEIGHT, FPS),
  )
  const [logDecay, _setLogDecay] = useState(
    Math.exp(getDecayConstantFromLerpWeight(INITIAL_LERP_WEIGHT, FPS)),
  )
  const [domain, setDomain] = useState(1)
  const [mouse, setMouse] = useState<Vector>({ x: -1, y: -1 })

  const setTValue: React.Dispatch<React.SetStateAction<number>> = (val) => {
    _setTValue((prev) => {
      const newVal = (() => {
        if (typeof val === 'function') {
          return val(prev)
        }
        return val
      })()
      if (!newVal) {
        _setDecay(0)
        _setLogDecay(1)
      } else {
        _setDecay(getDecayConstantFromLerpWeight(newVal, FPS))
        _setLogDecay(Math.exp(getDecayConstantFromLerpWeight(newVal, FPS)))
      }
      return newVal
    })
  }

  const setDecay: React.Dispatch<React.SetStateAction<number>> = (val) => {
    _setDecay((prev) => {
      const newVal = (() => {
        if (typeof val === 'function') {
          return val(prev)
        }
        return val
      })()
      if (!newVal) {
        _setTValue(0)
        _setLogDecay(1)
      } else {
        _setTValue(getLerpWeightFromDecayConstant(newVal, FPS))
        _setLogDecay(Math.exp(decay))
      }
      return newVal
    })
  }

  const setLogDecay: React.Dispatch<React.SetStateAction<number>> = (val) => {
    _setLogDecay((prev) => {
      const newVal = (() => {
        if (typeof val === 'function') {
          return val(prev)
        }
        return val
      })()
      if (!newVal) {
        _setTValue(0)
        _setDecay(0)
      } else {
        _setTValue(getLerpWeightFromDecayConstant(Math.log(newVal), FPS))
        _setDecay(Math.log(newVal))
      }
      return newVal
    })
  }

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
    const lerpData = computeLerp(initialValue, targetValue, tValue, domain)
    const expData = computeExpDecayData(
      initialValue,
      targetValue,
      decay,
      domain,
    )
    drawLerpCurve(canvasRef.current, lerpData, expData, mouse)
  }, [initialValue, targetValue, tValue, decay, domain, mouse])

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
              value={initialValue}
              setValue={setInitialValue}
            />
            <Input
              label="Target value"
              value={targetValue}
              setValue={setTargetValue}
            />
            <Input
              label="Weight (t)"
              value={tValue}
              setValue={setTValue}
              slider
              min={0}
              max={1}
              step={0.0001}
              copiable
            />
            <Input
              label="Decay (𝛌)"
              value={decay}
              setValue={setDecay}
              slider
              min={0}
              max={80}
              step={0.001}
              copiable
            />
            <Input
              label="Log decay"
              value={logDecay}
              setValue={setLogDecay}
              slider
              min={1}
              max={100}
              step={0.01}
              copiable
            />
            <div style={{ paddingTop: 30 }} />
            <Input
              label="Domain"
              value={domain}
              setValue={setDomain}
              slider
              min={0.5}
              max={20}
              step={0.5}
            />
          </div>
        </Stack>
        <div>
          <canvas ref={canvasRef} width="800" height="400" />
          <BallAnimation tValue={tValue} />
        </div>
      </Stack>
      <Stack
        direction="row"
        gap={30}
        justify="space-between"
        style={{ width: '100%' }}
      >
        <Stack direction="column">
          <div className="example-code" style={{ minWidth: 400 }}>
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
                <span className="alt5">{tValue.toFixed(4)}</span>
                <span className="function">)</span>
              </code>
            </pre>
            <pre>
              <code>
                &nbsp;&nbsp;<Code comment>// or, better:</Code>
              </code>
            </pre>
            <pre>
              <code>
                &nbsp;&nbsp;<span className="var">x</span> ={' '}
                <span className="function">lerp(</span>
                <span className="var">x</span>,{' '}
                <span className="number">{targetValue}</span>,{' '}
                <span>
                  <Code value>1</Code> -{' '}
                </span>
                <span className="function">Math.exp(</span>
                <span className="accent4">-{decay.toFixed(4)}</span> *{' '}
                <span className="alt2">𝚫t</span>
                <span className="function">)</span>
                <span className="function">)</span>
              </code>
            </pre>
            <pre>
              <code>&#125;</code>
            </pre>
          </div>
          {/* prettier-ignore */}
          <div style={{ marginTop: 140 }}>
            <p><Link to="slide-1">Slideshow: What is a Lerp?</Link></p>
            <p><Link to="https://www.gamedeveloper.com/programming/improved-lerp-smoothing-" target="_blank">Improved Lerp smoothing</Link></p>
            <p><Link to="https://www.youtube.com/watch?v=LSNQuFEDOyQ" target="_blank">Lerp Smoothing is Broken</Link></p>
          </div>
        </Stack>
        <DragChaseTest decay={decay} tValue={tValue} />
      </Stack>
    </main>
  )
}
