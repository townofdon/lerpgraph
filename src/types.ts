export interface Vector {
  x: number
  y: number
}

export function isVector(arg: unknown): arg is Vector {
  if (arg && typeof arg === 'object') {
    const vec = arg as Vector
    if (
      typeof vec.x === 'number' &&
      typeof vec.y === 'number'
    ) {
      return true
    }
  }
  return false
}

export interface GraphData {
  points: Vector[]
  inputs?: Vector[]
  min: number
  max: number
  tMin?: number
  tMax?: number
  domain: number
  /**
   * The estimated time where the curve has |slope| of 0.5
   */
  tKnee?: number
}

export interface SlideProps {
  slideIndex: number
  lastSlide?: boolean
}

export type Easing =
  | 'in-cubic'
  | 'out-cubic'
  | 'in-out-cubic'
  | 'in-quad'
  | 'out-quad'
  | 'in-out-quad'

export type SolverType = 'semi-euler' | 'full-euler' | 'verlet'
