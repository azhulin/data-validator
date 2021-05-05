export type Operation = import("./Operation").default

export type Path = (number | string)[]

export namespace Property {
  export type Static<T> = T
  export type Dynamic<T, C> = (context: C) => Static<T>
  export type Sync<T, C> = Static<T> | Dynamic<T, C>
  namespace Async {
    export type Static<T> = Promise<T>
    export type Dynamic<T, C> = (context: C) => Promise<Static<T>>
  }
  export type Async<T, C> = Async.Static<T> | Async.Dynamic<T, C>
}
export type Property<T, C> = Property.Sync<T, C> | Property.Async<T, C>

namespace Value {
  export type Primitive = undefined | null | boolean | number | string
  export type List = (Primitive | List | Map)[]
  export type Map = { [key: string]: Primitive | List | Map }
}
type Value = Value.Primitive | Value.List | Value.Map

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
  accept?: Property<boolean, Context>
  require?: Property<boolean, Context>
  default?: Partial<Default>
  preprocessors?: Processor[]
  constraints?: Constraint[]
  postprocessors?: Processor[]
  [key: string]: unknown
}

export type Definition = {
  type: string
} & Config

export type Schema = Record<string, string | Definition>

export type Settings = {
  config: Config
  path?: Path
  storage?: Record<string, unknown>
  source?: unknown
  result?: unknown
  warning?: Error[]
  pluginManager: import("@azhulin/plugin-manager").default
}

export interface BaseContext {
  operation?: Operation
  //document?: FF.DocumentSnapshot
  data?: unknown
}

export interface Context extends BaseContext {
  operation: Operation
  create: boolean
  update: boolean
  integrate: boolean
  default: Default
  path: Path
  current: (field?: string) => unknown
  original: (field?: string) => unknown
  storage: (key: string, value?: unknown) => unknown
}
