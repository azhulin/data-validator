import type { Property } from ".";
import type { Operation } from "../enum";
import type { Context } from "../interface";
/**
 * The data default value behaviors configuration.
 */
export declare type Default<T> = {
    [key in "value" | "nulled" | "read" | Operation]: Property<null | T, Context<T>>;
};
