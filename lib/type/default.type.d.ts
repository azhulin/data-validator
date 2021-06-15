import type { Property, Value } from ".";
import type { Context } from "../interface";
import type { Operation } from "../enum";
/**
 * The data default value behaviors configuration.
 */
export declare type Default = {
    [key in "value" | "nulled" | "read" | Operation]: Property<Value, Context>;
};
