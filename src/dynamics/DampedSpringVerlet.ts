import { calculateSolverConstants, type SolverConstantArgs, type SolverConstants, type SolverOptions } from './solverConstants'


interface BaseDampedSpringVerletArgs {
  initialValue: number
}

export type DampedSpringVerletArgs =
  SolverConstantArgs & SolverOptions & BaseDampedSpringVerletArgs

/**
 * Given an input x, calculate an output y using a damped spring system.
 * Solve using Verlet Integration (specifically, the Velocity Verlet algorithm): https://en.wikipedia.org/wiki/Verlet_integration
 */
export class DampedSpringVerlet {
  private constants!: SolverConstants
  private options!: SolverOptions

  private xp!: number // previous input
  private y!: number // output
  private v!: number // "velocity", or first derivative of output
  private a!: number // "acceleration", or second derivative of output

  public constructor(args: DampedSpringVerletArgs) {
    this.constants = calculateSolverConstants(args)
    this.options = args
    this.y = args.initialValue

    this.xp = 0
    this.v = 0
    this.a = 0
  }

  /**
   * @param delta time since last frame (in seconds)
   * @param x input
   */
  public compute = (
    delta: number,
    x: number,
  ): number => {
    const { y, v, a, xp } = this
    if (delta <= 0) {
      return this.y
    }
    const { max, exp, cos, cosh } = Math
    const T:number = delta
    const { k1, k2, k3, _w, _z, _d } = this.constants
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
    // estimate change of input
    const xd = (x - xp) / T
    this.xp = x
    // // see: https://en.wikipedia.org/wiki/Verlet_integration#Algorithmic_representation
    const y_new = y + v*T + a*(T*T*0.5)
    const a_new = (x + k3*xd - y - k1_stable*v) / k2_stable
    const v_new = v + (a + a_new)*(T*0.5)
    this.y = y_new
    this.a = a_new
    this.v = v_new
    return y
  }
}
