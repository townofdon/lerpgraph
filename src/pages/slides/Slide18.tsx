import { useEffect, useRef, useState } from 'react'
import { SlideShowContainer } from '../../components/SlideShowContainer'
import type { SlideProps } from '../../types'
import { expDecay } from '../../utils/utils'

const BALL_SIZE = 50

interface Vector {
  x: number
  y: number
  setX: (x: number) => void
  setY: (x: number) => void
  ref?: React.RefObject<Vector>
}

const useVector = (initialX: number, initialY: number) => {
  const [x, setX] = useState(initialX)
  const [y, setY] = useState(initialY)
  const vector = {
    x,
    y,
    setX,
    setY,
  } satisfies Vector
  const ref = useRef(vector)
  return {
    ...vector,
    ref,
  } satisfies Vector
}

export const Slide18 = (props: SlideProps) => {
  const randX = () => Math.random() * (window.screen.width - BALL_SIZE)
  const randY = () => Math.random() * (window.screen.height - BALL_SIZE)
  const a = useVector(randX(), randY())
  const b = useVector(randX(), randY())
  const c = useVector(randX(), randY())
  const d = useVector(randX(), randY())
  const e = useVector(randX(), randY())
  const refMain = useRef<HTMLElement>(null)

  useEffect(() => {
      const rect = refMain.current?.getBoundingClientRect() || {
          height: 0,
          width: 0,
          x: 0,
          y: 0,
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          toJSON: function () {
            throw new Error('Function not implemented.')
          }
      } satisfies DOMRect
      let playing = true
      let prevTime = performance.now()
      let mousex = window.screen.width / 2 - rect.left - BALL_SIZE * 0.5
      let mousey = window.screen.height / 2 - rect.top - BALL_SIZE * 0.5
      let targetx = mousex
      let targety = mousey
      const loop = () => {
        if (!playing) return
        const dt = (performance.now() - prevTime) / 1000
        prevTime = performance.now()
        targetx = expDecay(targetx, mousex, 20, dt)
        targety = expDecay(targety, mousey, 20, dt)
        a.ref.current.setX(v => expDecay(v, targetx, 3.5, dt))
        a.ref.current.setY(v => expDecay(v, targety, 3.5, dt))
        b.ref.current.setX(v => expDecay(v, targetx, 4.25, dt))
        b.ref.current.setY(v => expDecay(v, targety, 4.25, dt))
        c.ref.current.setX(v => expDecay(v, targetx, 5, dt))
        c.ref.current.setY(v => expDecay(v, targety, 5, dt))
        d.ref.current.setX(v => expDecay(v, targetx, 6, dt))
        d.ref.current.setY(v => expDecay(v, targety, 6, dt))
        e.ref.current.setX(v => expDecay(v, targetx, 7, dt))
        e.ref.current.setY(v => expDecay(v, targety, 7, dt))
        requestAnimationFrame(loop)
      }
      loop()
      const handleMouseMove = (ev: MouseEvent) => {
        mousex = ev.clientX - rect.left - BALL_SIZE * 0.5
        mousey = ev.clientY - rect.top - BALL_SIZE * 0.5
      }
      document.addEventListener('mousemove', handleMouseMove)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        playing = false
      }
    }, [a.ref, b.ref, c.ref, d.ref, e.ref])

  return (
    <SlideShowContainer refMain={refMain} {...props} gap={0}>
      <h1>Recap</h1>
      <ul style={{ fontSize: 24, color: '#eee' }}>
        <li>Lerps are really dang useful</li>
        <li>Lerp smoothing has a fatal flaw</li>
        <li>Exponential decay functions can be frame rate independent <em>(with some effort)</em></li>
        <li>Being able to solve differential equations is actually really useful</li>
      </ul>
      <div
        style={{
          top: a.y,
          left: a.x,
          position: 'absolute',
          width: BALL_SIZE,
          height: BALL_SIZE,
          background: 'rgba(69, 39, 158, 0.9)',
          // background: 'rgba(227, 76, 111, 0.9)',
          // background: 'rgb(76, 169, 227, 0.2)',
          borderRadius: '100%',
          zIndex: -1,
        }}
      />
      <div
        style={{
          top: b.y,
          left: b.x,
          position: 'absolute',
          width: BALL_SIZE,
          height: BALL_SIZE,
          background: 'rgba(90, 47, 176, 0.9)',
          // background: 'rgba(76, 169, 227, 0.9)',
          // background: 'rgb(76, 169, 227, 0.2)',
          borderRadius: '100%',
          zIndex: -1,
        }}
      />
      <div
        style={{
          top: c.y,
          left: c.x,
          position: 'absolute',
          width: BALL_SIZE,
          height: BALL_SIZE,
          background: 'rgba(112, 55, 190, 0.9)',
          // background: 'rgba(76, 227, 149, 0.9)',
          // background: 'rgb(76, 169, 227, 0.2)',
          borderRadius: '100%',
          zIndex: -1,
        }}
      />
      <div
        style={{
          top: d.y,
          left: d.x,
          position: 'absolute',
          width: BALL_SIZE,
          height: BALL_SIZE,
          background: 'rgba(137, 64, 205, 0.9)',
          // background: 'rgba(227, 222, 76, 0.9)',
          // background: 'rgb(76, 169, 227, 0.2)',
          borderRadius: '100%',
          zIndex: -1,
        }}
      />
      <div
        style={{
          top: e.y,
          left: e.x,
          position: 'absolute',
          width: BALL_SIZE,
          height: BALL_SIZE,
          background: 'rgba(174, 76, 227, 0.9)',
          // background: 'rgba(174, 76, 227, 0.9)',
          // background: 'rgba(76, 169, 227, 0.2)',
          borderRadius: '100%',
          zIndex: -1,
        }}
      />
    </SlideShowContainer>
  )
}
