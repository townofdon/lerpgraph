export interface SolverConstants {
  k1: number
  k2: number
  k3: number
  _w: number
  _z: number
  _d: number
}

export interface SolverOptions {
  clampK2?: boolean
  usePoleMatching?: boolean
}

export interface SolverConstantArgs {
  /**
   * Frequency of system oscillation in hertz
   */
  f: number
  /**
   * Zeta - the damping factor of the system
   * z == 0 => no damping; system oscillates forever
   * 0 < z < 1 => underdamped; system will overshoot target but eventually settle
   * z == 1 => critical damping (same as Unity smoothStep function)
   * z > 1 => overdamped; system will slowly settle upon target
   */
  z: number
  /**
   * Scaling factor for system response offset
   */
  r: number
}

/**
 *
 * @param f frequency of system oscillation in hertz
 * @param z zeta - damping factor
 * @param r scaling of system response
 */
export function calculateSolverConstants({ f, z, r }: SolverConstantArgs) {
  const { PI, sqrt, abs } = Math
  const _w = 2 * PI * f
  const _z = z
  const _d = _w * sqrt(abs(z * z - 1))
  const k1 = z / (PI * f)
  const k2 = 1 / (_w * _w)
  const k3 = (r * z) / _w
  const constants = {
    _w,
    _z,
    _d,
    k1,
    k2,
    k3,
  } satisfies SolverConstants
  return constants
}
