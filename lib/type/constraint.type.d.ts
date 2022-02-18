import type { Context } from "../interface";
/**
 * The data constraint.
 */
export declare type Constraint<T> = [string, Constraint.Func<T>, boolean?];
export declare namespace Constraint {
    type Error = string | [string, Record<string, unknown>];
    type Result = null | Error;
    type Func<T> = (data: T, context: Context<T>) => Result | Promise<Result>;
    type Library<T> = {
        [key: string]: Constraint<T> | ((...args: any) => Constraint<T>) | Library<T>;
    };
    type Dynamic<T> = (context: Context<T>) => Constraint<T>[];
    type List<T = any> = (Constraint<T> | Dynamic<T>)[];
}
