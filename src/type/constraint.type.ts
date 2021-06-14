import type { Context } from "../interface"

export namespace Constraint {
  export type Error = string | [string, Record<string, unknown>?]
  export type Result = Error | null
  export type Func = (data: any, context: Context) => Result | Promise<Result>
  export type Library = Record<string, Func>
  export type Static = string | [string, Func]
  export type Dynamic = (context: Context) => Static[]
}

/**
 * The data constraint.
 */
export type Constraint = Constraint.Static | Constraint.Dynamic
