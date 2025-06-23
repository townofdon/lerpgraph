import type { Vector } from "../types"

// find the knee of the curve
export function findCurveKnee(points: Vector[]) {
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
  return tKnee
}