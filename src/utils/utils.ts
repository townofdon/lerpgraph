export function lerp(a: number, b: number, t: number) {
  return a * (1 - t) + b * t
}

export function inverseLerp(a: number, b: number, v: number) {
  if (a == b) return 1
  return (v - a) / (b - a)
}

export function clamp(v: number, min: number, max: number) {
  return Math.max(Math.min(v, max), min)
}

export function expDecay(a: number, b: number, decay: number, deltaTime: number) {
  return b + (a - b) * Math.exp(-decay * deltaTime)
}

export function getDecayConstantFromLerpWeight(t: number, fps: number) {
  return -fps * Math.log(1 - t)
}

export function getLerpWeightFromDecayConstant(decay: number, fps: number) {
  if (decay === Infinity) return 1
  return 1 - Math.exp(-decay / fps)
}
