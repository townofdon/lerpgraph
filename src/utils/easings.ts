
export function easeInQuad(x: number): number {
  return x * x
}

export function easeInCubic(x: number): number {
  return x * x * x
}

export function easeOutQuad(x: number): number {
  return 1 - (1 - x) * (1 - x)
}

export function easeInOutQuad(x: number): number {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
}

export function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3)
}

export function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}
