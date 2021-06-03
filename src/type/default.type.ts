import type { Property, Value } from "."
import type { Operation } from "../enum"
import type { Context } from "../interface"

/**
 * The data default value behaviors configuration.
 */
export type Default = {
  [key in "value" | Operation | "nulled"]: Property<Value, Context>
}
