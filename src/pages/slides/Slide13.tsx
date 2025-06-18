import { useEffect, useRef, useState } from 'react'
import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'
import { FancySlider } from '../../components/FancySlider'
import { clamp, lerp } from '../../utils/utils'

const INITIAL_X = 400
const INITIAL_Y = 225
const BALL_SIZE = 50

export const Slide13 = (props: SlideProps) => {
  const [dragging, setDragging] = useState(false)
  const [ax, setAx] = useState(INITIAL_X)
  const [ay, setAy] = useState(INITIAL_Y)
  const [bx, setBx] = useState(INITIAL_X)
  const [by, setBy] = useState(INITIAL_Y)
  const [t, setT] = useState(0.1)
  const containerRef = useRef<HTMLDivElement>(null)
  const draggableBallRef = useRef<HTMLDivElement>(null)

  const refs = {
    ax: useRef(ax),
    ay: useRef(ay),
    bx: useRef(bx),
    by: useRef(by),
    t: useRef(t),
  }
  refs.ax.current = ax
  refs.ay.current = ay
  refs.bx.current = bx
  refs.by.current = by
  refs.t.current = t

  useEffect(() => {
    let playing = true
    const loop = () => {
      if (!playing) return
      setBx(lerp(refs.bx.current, refs.ax.current, refs.t.current))
      setBy(lerp(refs.by.current, refs.ay.current, refs.t.current))
      requestAnimationFrame(loop)
    }
    loop()
    return () => {
      playing = false
    }
  }, [refs.ax, refs.ay, refs.bx, refs.by, refs.t])

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
      <h1>Smooth Operator</h1>
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
      <FancySlider value={t} setValue={setT} left="0" right="1" />
      <div>
        <p>
          Drag the <span className="accent5">red</span> ball around. The <span className="accent4">blue</span> ball will chase.
        </p>
      </div>
      <div>
        <pre>
          <code className='large'>
            &nbsp;&nbsp;<span className="accent4">a</span> ={' '}
            <span className="function">lerp(</span>
            <span className="accent4">a</span>,{' '}
            <span className="accent5">b</span>,{' '}
            <span className="value">{t}</span>
            <span className="function">)</span>
          </code>
        </pre>
      </div>
    </SlideShowContainer>
  )
}
