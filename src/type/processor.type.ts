import type { Context } from "../interface"

/**
 * The data processor.
 */
export type Processor<T> = (data: any, context: Context<T>) => T

export namespace Processor {
  export type Library<T> = Record<string, Processor<T>>
}
