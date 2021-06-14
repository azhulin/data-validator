import type { Context } from "../interface"

export namespace Processor {
  export type Func = (data: any, context: Context) => unknown
  export type Library = Record<string, Func>
}

/**
 * The data processor.
 */
export type Processor = string | Processor.Func
