import type { BaseContext, Default } from "."
import type { Path } from "../type"
import type { Operation } from "../enum"

/**
 * The data context.
 */
export interface Context extends BaseContext {
  operation: Operation
  create: boolean
  update: boolean
  integrate: boolean
  default: Default
  path: Path
  source: (field?: string) => unknown
  result: (field?: string) => unknown
  original: (field?: string) => unknown
  storage: (key: string, value?: unknown) => unknown
}
