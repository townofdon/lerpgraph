import { isVector, type SolverType, type Vector } from '../types'

export function add<T extends SolverType>(a: T, b: T): T {
  if (typeof a === 'number' && typeof b === 'number') {
    return (a + b) as T
  }
  if (isVector(a) && isVector(b)) {
    const x = a.x + b.x
    const y = a.y + b.y
    const vec = { x, y } satisfies Vector satisfies SolverType
    return vec as T
  }
  throw new Error(`unsupported type for add: a<${typeof a}>, b<${typeof b}>`)
}

export function sub<T extends SolverType>(a: T, b: T): T {
  if (typeof a === 'number' && typeof b === 'number') {
    return (a - b) as T
  }
  if (isVector(a) && isVector(b)) {
    const x = a.x - b.x
    const y = a.y - b.y
    const vec = { x, y } satisfies Vector satisfies SolverType
    return vec as T
  }
  throw new Error(`unsupported type for sub: a<${typeof a}>, b<${typeof b}>`)
}

export function mul<T extends SolverType>(a: T, b: number): T {
  if (typeof a === 'number') {
    return (a * b) as T
  }
  if (isVector(a)) {
    const x = a.x * b
    const y = a.y * b
    const vec = { x, y } satisfies Vector satisfies SolverType
    return vec as T
  }
  throw new Error(`unsupported type for mul: a<${typeof a}>, b<${typeof b}>`)
}
