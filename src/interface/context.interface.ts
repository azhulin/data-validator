import type { BaseContext } from "."
import type { Handler } from "../component"
import type { Operation } from "../enum"
import type { Default, Path } from "../type"

/**
 * The data context.
 */
export interface Context<T> extends BaseContext<T> {
  operation: Operation
  create: boolean
  update: boolean
  integrate: boolean
  handler: Handler
  default: Default<T>
  path: Path
  source: (field?: string) => unknown
  result: (field?: string) => unknown
  original: (field?: string) => unknown
  storage: (key: string, value?: unknown) => unknown
}
