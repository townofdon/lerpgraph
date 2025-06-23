import type { DampedSpringEulerArgs } from './DampedSpringSemiImplicitEuler'
import { calculateSolverConstants, type SolverConstants, type SolverOptions } from './solverConstants'

/**
 * Given an input x, calculate an output y using a damped spring system.
 * Solve using the fully-implicit Euler Method: https://en.wikipedia.org/wiki/Semi-implicit_Euler_method
 */
export class DampedSpringFullyImplicitEuler {
  private constants!: SolverConstants
  private options!: SolverOptions

  private xp!: number // previous input
  private y!: number // output
  private yd!: number // change in output (e.g. velocity, if input is a position vector)

  public constructor(args: DampedSpringEulerArgs) {
    this.constants = calculateSolverConstants(args)
    this.options = args
    this.y = args.initialValue

    this.xp = 0
    this.yd = 0
  }

  public compute = (
    delta: number,
    x: number,
  ): number => {
    const { y, yd, xp } = this
    if (delta <= 0) {
      return this.y
    }
    const { max, exp, cos, cosh } = Math
    const T:number = delta
    const { k1, k2, k3, _w, _z, _d } = this.constants
    // estimate change of input
    const xd = (x - xp) / T
    this.xp = x
    // clamp k2 to guarantee stability without jitter
    let k1_stable:number = k1
    let k2_stable:number = k2
    if (this.options.clampK2 ?? true) {
      k1_stable = k1
      k2_stable = max(k2, T*T/2 + T*k1/2, T*k1)
    }
    // use pole matching when the system is very fast
    if (this.options.usePoleMatching && _w * T >= _z && _z < 0.75) {
      const t1:number = exp(-_z * _w * T)
      const alpha:number = 2 * t1 * (_z <= 1 ? cos(T*_d) : cosh(T*_d))
      const beta:number = t1 * t1
      const t2:number = T / (1 + beta - alpha)
      k1_stable = (1 - beta) * t2
      k2_stable = T * t2
    }
    // y[n+1] = y[n] + Tẏ[n]
    // ẏ[n+1] = (k₂ẏ[n] + T(x[n+1] + k₃ẋ[n+1] - y[n+1])) / (k₂ + Tk₁)
    this.y = y + T*yd
    this.yd = (k2_stable*yd + T*(x + k3*xd - this.y)) / (k2_stable + T*k1_stable)
    return y
  }
}
