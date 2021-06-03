export namespace Value {
  export type Primitive = undefined | null | boolean | number | string
  export type Array = (Primitive | Array | Object)[]
  export type Object = { [key: string]: Primitive | Array | Object }
}

/**
 * The data value.
 */
export type Value = Value.Primitive | Value.Array | Value.Object
