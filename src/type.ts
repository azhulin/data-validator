export type Operation = import("./Operation").default

export type Path = (number | string)[]

export namespace Property {
  export type Static<T> = T
  export type Dynamic<T, C> = (context: C) => T | Promise<T>
}
export type Property<T, C> = Property.Static<T> | Property.Dynamic<T, C>

namespace Value {
  export type Primitive = undefined | null | boolean | number | string
  export type Array = (Primitive | Array | Object)[]
  export type Object = { [key: string]: Primitive | Array | Object }
}
export type Value = Value.Primitive | Value.Array | Value.Object

export type Default = {
  [key in "value" | Operation | "nulled"]: Property<Value, Context>
}

export namespace Processor {
  export type Func = (data: unknown, context: Context) => unknown
  export type Library = Record<string, Func>
}
export type Processor = string | Processor.Func

export namespace Constraint {
  export type Error = string | [string, Record<string, unknown>?]
  export type Result = Error | null
  export type Func = (data: unknown, context: Context) => Result | Promise<Result>
  export type Library = Record<string, Func>
  export type Static = string | [string, Func]
  export type Dynamic = (context: Context) => Static[]
}
export type Constraint = Constraint.Static | Constraint.Dynamic

export type Config = {
  input?: Property<boolean, Context>
  require?: Property<boolean, Context>
  default?: Partial<Default>
  preprocessors?: Processor[]
  constraints?: Constraint[]
  postprocessors?: Processor[]
}

export type Definition = {
  Handler: new (settings: Settings) => any
} & Config

export type Schema = Record<string, Definition>

export type Settings = {
  config?: Config
  path?: Path
  storage?: Record<string, unknown>
  source?: unknown
  result?: unknown
  warnings?: Error[]
}

export interface BaseContext {
  operation?: Operation
  data?: unknown
  [key: string]: unknown
}

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
