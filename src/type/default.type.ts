import type { Property } from "."
import type { Operation } from "../enum"
import type { Context } from "../interface"

namespace Value {
  export type Primitive = undefined | null | boolean | number | string
  export type Array = (Primitive | Array | Object)[]
  export type Object = { [key: string]: Primitive | Array | Object }
}
type Value = Value.Primitive | Value.Array | Value.Object

/**
 * The data default value behaviors configuration.
 */
export type Default = {
  [key in "value" | Operation | "nulled"]: Property<Value, Context>
}
