import type { GraphData, Vector } from '../types'
import { clamp, lerp } from './utils'

export function compute(
  initialValue: number,
  targetValue: number,
  tValue: number,
  domain: number,
): GraphData {
  const points: Vector[] = []
  const vMin = Math.min(0, initialValue, targetValue)
  const vMax = Math.max(1, initialValue, targetValue)
  const step = 1 / 60
  let t = 0
  let result = initialValue

  while (t <= domain) {
    points.push({ x: t, y: result })
    result = lerp(result, targetValue, clamp(tValue, 0, 1))
    t += step
  }

  // find the knee of the curve
  let vKnee = 0
  let tKnee = Infinity
  for (let sample = 2; sample < 150 && sample < points.length - 3; sample += 3) {
    for (let i = sample; i < points.length - sample; i++) {
      const tPrev = points[i-sample].x
      const t = points[i].x
      const tNext = points[i+sample].x
      const prev = points[i-sample].y
      const cur = points[i].y
      const next = points[i+sample].y
      const slopePrev = Math.abs(cur - prev) / (t - tPrev)
      const slopeNext = Math.abs(next - cur) / (tNext - t)
      const slopeDiff = Math.abs(slopeNext - slopePrev)
      if (slopeDiff > vKnee) {
        vKnee = slopeDiff
        tKnee = t
      }
      if (t > 2) break
    }
  }

  return {
    points,
    max: vMax,
    min: vMin,
    tKnee,
    domain,
  } satisfies GraphData
}
