import { useEffect, useRef, useState } from 'react'
import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'
import { FancySlider } from '../../components/FancySlider'
import { clamp, expDecay } from '../../utils/utils'

const INITIAL_X = 400
const INITIAL_Y = 225
const BALL_SIZE = 50

export const Slide17 = (props: SlideProps) => {
  const [dragging, setDragging] = useState(false)
  const [ax, setAx] = useState(INITIAL_X)
  const [ay, setAy] = useState(INITIAL_Y)
  const [bx, setBx] = useState(INITIAL_X)
  const [by, setBy] = useState(INITIAL_Y)
  const [decay, setDecay] = useState(4)
  const containerRef = useRef<HTMLDivElement>(null)
  const draggableBallRef = useRef<HTMLDivElement>(null)

  const refs = {
    ax: useRef(ax),
    ay: useRef(ay),
    bx: useRef(bx),
    by: useRef(by),
    decay: useRef(decay),
  }
  refs.ax.current = ax
  refs.ay.current = ay
  refs.bx.current = bx
  refs.by.current = by
  refs.decay.current = decay

  useEffect(() => {
    let playing = true
    let prevTime = performance.now()
    const loop = () => {
      if (!playing) return
      const deltaTime = (performance.now() - prevTime) / 1000
      prevTime = performance.now()
      setBx(
        expDecay(
          refs.bx.current,
          refs.ax.current,
          refs.decay.current,
          deltaTime,
        ),
      )
      setBy(
        expDecay(
          refs.by.current,
          refs.ay.current,
          refs.decay.current,
          deltaTime,
        ),
      )
      requestAnimationFrame(loop)
    }
    loop()
    return () => {
      playing = false
    }
  }, [refs.ax, refs.ay, refs.bx, refs.by, refs.decay])

  const handleMouseDown = () => {
    setDragging(true)
  }

  const handleMouseUp = () => {
    setDragging(false)
  }

  useEffect(() => {
    if (!dragging) return
    const handleMouseMove = (ev: MouseEvent) => {
      if (!dragging) return
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const containerWidth = rect.right - rect.left
      const containerHeight = rect.bottom - rect.top
      const x = ev.clientX - rect.left - BALL_SIZE * 0.5
      const y = ev.clientY - rect.top - BALL_SIZE * 0.5
      setAx(clamp(x, 0, containerWidth - BALL_SIZE))
      setAy(clamp(y, 0, containerHeight - BALL_SIZE))
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [dragging])

  return (
    <SlideShowContainer {...props} gap={0}>
      <h1 style={{ marginBottom: 0 }}>Smooth Operator2</h1>
      <p><em>Now with frame rate independence!</em></p>
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: 800,
          height: 400,
          borderRadius: 10,
          background: '#111',
          border: '4px solid #222',
        }}
      >
        <div
          style={{
            top: by,
            left: bx,
            position: 'absolute',
            width: BALL_SIZE,
            height: BALL_SIZE,
            background: 'rgb(21, 151, 255)',
            borderRadius: '100%',
          }}
        />
        <div
          ref={draggableBallRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          style={{
            top: ay,
            left: ax,
            position: 'absolute',
            width: BALL_SIZE,
            height: BALL_SIZE,
            background: 'rgb(227, 76, 111)',
            borderRadius: '100%',
            cursor: 'grab',
          }}
        />
      </div>
      <FancySlider
        value={decay}
        setValue={setDecay}
        min={0}
        max={24}
        step={0.001}
        left="0"
        right="24"
      />
      <div>
        <p>
          Drag the <span className="accent5">red</span> ball around. The{' '}
          <span className="accent4">blue</span> ball will chase.
        </p>
      </div>
      <div>
        <pre>
          <code style={{ fontSize: 24 }}>
            <span className="accent5">a</span> ={' '}
            <span className="accent4">b</span> + (
            <span className="accent5">a</span> -{' '}
            <span className="accent4">b</span>) * e^(-
            <span className="accent3">{decay}</span> *{' '}
            <span className="accent2">deltaTime</span>)
          </code>
        </pre>
      </div>
    </SlideShowContainer>
  )
}
