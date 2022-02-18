import type { Context } from "../interface"

/**
 * The data constraint.
 */
export type Constraint<T> = [string, Constraint.Func<T>, boolean?]

export namespace Constraint {
  export type Error = string | [string, Record<string, unknown>]
  export type Result = null | Error
  export type Func<T> = (data: T, context: Context<T>) => Result | Promise<Result>
  export type Library<T> = { [key: string]: Constraint<T> | ((...args: any) => Constraint<T>) | Library<T> }
  export type Dynamic<T> = (context: Context<T>) => Constraint<T>[]
  export type List<T = any> = (Constraint<T> | Dynamic<T>)[]
}
