import type { GraphData, Vector } from '../types'
import { findCurveKnee } from './findCurveKnee'
import { clamp, expDecay, lerp } from './utils'

export function computeLerp(
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

  const tKnee = findCurveKnee(points)

  return {
    points,
    max: vMax,
    min: vMin,
    tKnee,
    domain,
  } satisfies GraphData
}

export function computeExpDecayData(
  initialValue: number,
  targetValue: number,
  decay: number, // decay constant
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
    result = expDecay(result, targetValue, decay, step)
    t += step
  }

  const tKnee = findCurveKnee(points)

  return {
    points,
    max: vMax,
    min: vMin,
    tKnee,
    domain,
  } satisfies GraphData
}

interface IntegrationSolver {
  compute: (delta: number, input: number) => number
}

interface ComputeDampedSpringEulerArgs {
  domain: number
  variadicInput?: boolean
  solver: IntegrationSolver
}
export function computeSolverCurve({
  domain,
  variadicInput,
  solver, 
}: ComputeDampedSpringEulerArgs) {
  const points: Vector[] = []
  const inputs: Vector[] = []
  let vMin = 0
  let vMax = 1
  let tMin = 0
  let tMax = 0
  const step = 1 / 60
  let t = 0
  let result = 0

  t = 0
  while (t <= domain) {
    const target = variadicInput ? getVariadicInputByTime(t) : 1
    points.push({ x: t, y: result })
    inputs.push({ x: t, y: target })
    result = solver.compute(step, target)
    if (result < vMin) {
      vMin = result
      tMin = t
    }
    if (result > vMax) {
      vMax = result
      tMax = t
    }
    t += step
  }

  return {
    points,
    inputs,
    max: vMax,
    min: vMin,
    tMin,
    tMax,
    domain,
  } satisfies GraphData
}

function getVariadicInputByTime(t: number) {
  if (t < 1) return 0
  if (t < 2.5) return 1
  if (t < 3.5) return -1
  if (t < 4.5) return lerp(-1, 0.5, t - 3.5)
  if (t < 5) return lerp(0.5, 0, (t - 4.5) * 2)
  return 0
}
