import { useEffect, useRef, useState } from 'react'
import { clamp, lerp } from './utils'

interface BallAnimationProps {
  tValue: number
}

const TRAVEL = 750
const EPSILON = 0.0001
const WAIT_TIME = 1000

export const BallAnimation = ({ tValue }: BallAnimationProps) => {
  const [tAnim, setTAnim] = useState(0)

  const ref = useRef(tValue)
  ref.current = tValue

  useEffect(() => {
    let playing = true
    let t = 0
    let direction = 1
    let timeSinceChangedDirection = Infinity
    let timePrev = performance.now()
    const loop = () => {
      if (!playing) return
      const delta = performance.now() - timePrev
      timePrev = performance.now()
      if (timeSinceChangedDirection < WAIT_TIME) {
        timeSinceChangedDirection += delta
      } else {
        const target = direction > 0 ? 1 : 0
        t = lerp(t, target, clamp(ref.current, 0, 1))
        if (t < target && target - t < 0.01) {
          t += 0.0001
        }
        if (t > target && t - target < 0.01) {
          t -= 0.0001
        }
        setTAnim(t)
        if (
          (direction > 0 && t >= 1 - EPSILON) ||
          (direction < 0 && t <= EPSILON)
        ) {
          direction = -direction
          timeSinceChangedDirection = 0;
        }
      }
      requestAnimationFrame(loop)
    }
    loop()
    return () => {
      playing = false
    }
  }, [ref])

  // prettier-ignore
  return (
    <div className="dot-container">
      <div style={{ left: tAnim * TRAVEL }} className="dot"></div>
      {/* <p className='dot-debug'>{tAnim}</p> */}
    </div>
  )
}
