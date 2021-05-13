export declare type Operation = import("./Operation").default;
export declare type Path = (number | string)[];
export declare namespace Property {
    export type Static<T> = T;
    export type Dynamic<T, C> = (context: C) => Static<T>;
    export type Sync<T, C> = Static<T> | Dynamic<T, C>;
    namespace Async {
        type Static<T> = Promise<T>;
        type Dynamic<T, C> = (context: C) => Promise<Static<T>>;
    }
    export type Async<T, C> = Async.Static<T> | Async.Dynamic<T, C>;
    export {};
}
export declare type Property<T, C> = Property.Sync<T, C> | Property.Async<T, C>;
declare namespace Value {
    type Primitive = undefined | null | boolean | number | string;
    type List = (Primitive | List | Map)[];
    type Map = {
        [key: string]: Primitive | List | Map;
    };
}
declare type Value = Value.Primitive | Value.List | Value.Map;
export declare type Default = {
    [key in "value" | Operation | "nulled"]: Property<Value, Context>;
};
export declare namespace Processor {
    type Func = (data: unknown, context: Context) => unknown;
    type Library = Record<string, Func>;
}
export declare type Processor = string | Processor.Func;
export declare namespace Constraint {
    type Error = string | [string, Record<string, unknown>?];
    type Result = Error | null;
    type Func = (data: unknown, context: Context) => Result | Promise<Result>;
    type Library = Record<string, Func>;
    type Static = string | [string, Func];
    type Dynamic = (context: Context) => Static[];
}
export declare type Constraint = Constraint.Static | Constraint.Dynamic;
export declare type Config = {
    accept?: Property<boolean, Context>;
    require?: Property<boolean, Context>;
    default?: Partial<Default>;
    preprocessors?: Processor[];
    constraints?: Constraint[];
    postprocessors?: Processor[];
};
export declare type Definition = {
    Handler: new (settings: Settings) => any;
} & Config;
export declare type Schema = Record<string, Definition>;
export declare type Settings = {
    config?: Config;
    path?: Path;
    storage?: Record<string, unknown>;
    source?: unknown;
    result?: unknown;
    warning?: Error[];
};
export interface BaseContext {
    operation?: Operation;
    data?: unknown;
    [key: string]: unknown;
}
export interface Context extends BaseContext {
    operation: Operation;
    create: boolean;
    update: boolean;
    integrate: boolean;
    default: Default;
    path: Path;
    current: (field?: string) => unknown;
    original: (field?: string) => unknown;
    storage: (key: string, value?: unknown) => unknown;
}
export {};
