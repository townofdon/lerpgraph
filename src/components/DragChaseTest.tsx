import { useEffect, useRef, useState } from 'react'
import { clamp, expDecay, lerp } from '../utils/utils'
import { Stack } from './Stack'

const INITIAL_X = 400
const INITIAL_Y = 125
const BALL_SIZE = 50

interface DragChaseTestProps {
  decay: number
  tValue: number
}

export const DragChaseTest = ({ decay, tValue }: DragChaseTestProps) => {
  const [dragging, setDragging] = useState(false)
  const [showYellowBall, setShowYellowBall] = useState(false)
  const [ax, setAx] = useState(INITIAL_X)
  const [ay, setAy] = useState(INITIAL_Y)
  const [bx, setBx] = useState(INITIAL_X)
  const [by, setBy] = useState(INITIAL_Y)
  const [cx, setCx] = useState(INITIAL_X)
  const [cy, setCy] = useState(INITIAL_Y)
  const [fps, setFps] = useState(60)
  const containerRef = useRef<HTMLDivElement>(null)
  const draggableBallRef = useRef<HTMLDivElement>(null)

  const refs = {
    ax: useRef(ax),
    ay: useRef(ay),
    bx: useRef(bx),
    by: useRef(by),
    cx: useRef(cx),
    cy: useRef(cy),
    decay: useRef(decay),
    tValue: useRef(tValue),
  }
  refs.ax.current = ax
  refs.ay.current = ay
  refs.bx.current = bx
  refs.by.current = by
  refs.cx.current = cx
  refs.cy.current = cy
  refs.decay.current = decay
  refs.tValue.current = tValue

  useEffect(() => {
    let playing = true
    let prevTime = performance.now()
    const loop = () => {
      if (!playing) return
      const deltaTime = (performance.now() - prevTime) / 1000
      setFps(1 / deltaTime)
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
      setCx(lerp(refs.cx.current, refs.ax.current, refs.tValue.current))
      setCy(lerp(refs.cy.current, refs.ay.current, refs.tValue.current))
      requestAnimationFrame(loop)
    }
    loop()
    return () => {
      playing = false
    }
  }, [
    refs.ax,
    refs.ay,
    refs.bx,
    refs.by,
    refs.cx,
    refs.cy,
    refs.decay,
    refs.tValue,
  ])

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
    <Stack direction="column" align="flex-start">
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: 700,
          height: 400,
          borderRadius: 10,
          background: '#111',
          border: '4px solid #191919',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: 6,
            fontFamily: 'monospace',
            color: '#aaa',
          }}
        >
          FPS: {fps.toFixed(0)}
        </span>
        {showYellowBall && (
          <div
            style={{
              top: cy,
              left: cx,
              position: 'absolute',
              width: BALL_SIZE,
              height: BALL_SIZE,
              background: 'rgb(245, 243, 112)',
              borderRadius: '100%',
            }}
          />
        )}
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
      <div style={{ paddingLeft: 5 }}>
        <p style={{ alignSelf: 'flex-start', marginLeft: -3 }}>
          <label htmlFor="">
            <input type="checkbox" checked={showYellowBall} onChange={() => setShowYellowBall(prev => !prev)} />{' '}
            <strong>Show lerp smoothing discrepancy (yellow ball)</strong>
          </label>
        </p>
        <p>
          Drag the <span className="accent5">red</span> ball around. The{' '}
          <span className="accent4">blue</span> ball will chase.
        </p>
        <p>
          The <strong className="accent3">yellow</strong> ball uses lerp
          smoothing and is <strong>NOT</strong> framerate independent. If you see it,<br/>your framerate is not 60 fps.
        </p>
        <p>
          <em>
            <small>
              At 60 fps, the yellow ball tracks at the same speed as the blue
              ball. Its speed varies at other framerates.
            </small>
          </em>
        </p>
      </div>
    </Stack>
  )
}
