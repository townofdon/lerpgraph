import { isVector, type SolverType } from '../types'
import { add, mul, sub } from './ops'
import { calculateSolverConstants, type SolverConstantArgs, type SolverConstants, type SolverOptions } from './solverConstants'


interface BaseDampedSpringVerletArgs<T extends SolverType> {
  initialValue: T
}

export type DampedSpringVerletArgs<T extends SolverType> =
  SolverConstantArgs & SolverOptions & BaseDampedSpringVerletArgs<T>

/**
 * Given an input x, calculate an output y using a damped spring system.
 * Solve using Verlet Integration (specifically, the Velocity Verlet algorithm): https://en.wikipedia.org/wiki/Verlet_integration
 */
export class DampedSpringVerlet<T extends SolverType> {
  private constants!: SolverConstants
  private options!: SolverOptions

  private xp!: T // previous input
  private y!: T // output
  private v!: T // "velocity", or first derivative of output
  private a!: T // "acceleration", or second derivative of output

  public DampedSpringVerlet(args: DampedSpringVerletArgs<T>) {
    this.constants = calculateSolverConstants(args)
    this.options = args
    this.y = args.initialValue

    if (isVector(args.initialValue)) {
      this.xp = { x: 0, y: 0 } as T
      this.v = { x: 0, y: 0 } as T
    }
  }

  /**
   * @param delta time since last frame (in seconds)
   * @param x input
   */
  public compute(
    delta: number,
    x: T,
  ): T {
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
    // xd = (x - xp) / T
    const xd = mul(sub(x, xp), (1 / T))
    this.xp = x
    // // see: https://en.wikipedia.org/wiki/Verlet_integration#Algorithmic_representation
    // y_new = y + yd*T + a*(dt*dt*0.5)
    // a_new = (x + k3*xd - y - k1*yd) / k2
    // yd_new = yd + (acc + a_new)*(dt*0.5)
    // y = y_new
    // a = a_new
    // yd = yd_new
    const y_new = add(y, add(mul(v, T), mul(a, T*T*0.5)))
    const a_new = mul(add(x, sub(mul(xd,k3), sub(y, mul(v, k1_stable)))), (1 / k2_stable))
    const v_new = add(v, mul(add(a, a_new), T*0.5))
    this.y = y_new
    this.a = a_new
    this.v = v_new
    return y
  }
}
