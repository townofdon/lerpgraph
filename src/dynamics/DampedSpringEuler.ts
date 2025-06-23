import { isVector, type SolverType } from '../types'
import { add, mul, sub } from './ops'
import { calculateSolverConstants, type SolverConstantArgs, type SolverConstants, type SolverOptions } from './solverConstants'

interface BaseDampedSpringEulerArgs<T extends SolverType> {
  initialValue: T
}

export type DampedSpringEulerArgs<T extends SolverType> =
  SolverConstantArgs & SolverOptions & BaseDampedSpringEulerArgs<T>

/**
 * Given an input x, calculate an output y using a damped spring system.
 * Solve using the semi-implicit Euler Method: https://en.wikipedia.org/wiki/Semi-implicit_Euler_method
 */
export class DampedSpringEuler<T extends SolverType> {
  private constants!: SolverConstants
  private options!: SolverOptions

  private xp!: T // previous input
  private y!: T // output
  private yd!: T // change in output (e.g. velocity, if input is a position vector)

  public DampedSpringEuler(args: DampedSpringEulerArgs<T>) {
    this.constants = calculateSolverConstants(args)
    this.options = args
    this.y = args.initialValue

    if (isVector(args.initialValue)) {
      this.xp = { x: 0, y: 0 } as T
      this.yd = { x: 0, y: 0 } as T
    }
  }

  public compute(
    delta: number,
    x: T,
  ): T {
    const { y, yd, xp } = this
    if (delta <= 0) {
      return this.y
    }
    const { max, exp, cos, cosh } = Math
    const T:number = delta
    const { k1, k2, k3, _w, _z, _d } = this.constants
    // estimate change of input
    // xd = (x - xp) / T
    const xd = mul(sub(x, xp), (1 / T))
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
    // y = y + T*yd
    this.y = add(y, mul(yd, T))
    // yd = yd + T * (x + k3*xd - y - k1_stable*yd) / k2_stable
    this.yd = add(yd, mul(add(x, sub(mul(xd,k3), sub(y, mul(yd, k1_stable)))), T / k2_stable))
    return y
  }
}
