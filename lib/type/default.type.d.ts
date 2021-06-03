import type { Property } from ".";
import type { Operation } from "../enum";
import type { Context } from "../interface";
declare namespace Value {
    type Primitive = undefined | null | boolean | number | string;
    type Array = (Primitive | Array | Object)[];
    type Object = {
        [key: string]: Primitive | Array | Object;
    };
}
declare type Value = Value.Primitive | Value.Array | Value.Object;
/**
 * The data default value behaviors configuration.
 */
export declare type Default = {
    [key in "value" | Operation | "nulled"]: Property<Value, Context>;
};
export {};
