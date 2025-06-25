import { DampedSpringFullyImplicitEuler } from "../dynamics/DampedSpringFullyImplicitEuler"
import { DampedSpringSemiImplicitEuler, type DampedSpringEulerArgs } from "../dynamics/DampedSpringSemiImplicitEuler"
import { DampedSpringVerlet, type DampedSpringVerletArgs } from "../dynamics/DampedSpringVerlet"
import type { SolverType } from "../types"

interface GetSpringSolverArgs {
  solverType: SolverType
  f: number,
  z: number,
  r: number,
  poleMatching: boolean,
  clampK2: boolean,
  initialValue?: number
}

export const getSpringSolver = ({
  solverType,
  f,
  z,
  r,
  poleMatching,
  clampK2,
  initialValue = 0,
}: GetSpringSolverArgs) => {
  if (solverType === 'semi-euler') {
    const solverArgs = {
      f,
      z,
      r,
      initialValue,
      usePoleMatching: poleMatching,
      clampK2,
    } satisfies DampedSpringEulerArgs
    return new DampedSpringSemiImplicitEuler(solverArgs)
  } else if (solverType === 'full-euler') {
    const solverArgs = {
      f,
      z,
      r,
      initialValue,
      usePoleMatching: poleMatching,
      clampK2,
    } satisfies DampedSpringEulerArgs
    return new DampedSpringFullyImplicitEuler(solverArgs)
  } else {
    const solverArgs = {
      f,
      z,
      r,
      initialValue,
      usePoleMatching: poleMatching,
      clampK2,
    } satisfies DampedSpringVerletArgs
    return new DampedSpringVerlet(solverArgs)
  }
}
