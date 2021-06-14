import type { Context } from "../interface";
export declare namespace Constraint {
    type Error = string | [string, Record<string, unknown>?];
    type Result = Error | null;
    type Func = (data: any, context: Context) => Result | Promise<Result>;
    type Library = Record<string, Func>;
    type Static = string | [string, Func];
    type Dynamic = (context: Context) => Static[];
}
/**
 * The data constraint.
 */
export declare type Constraint = Constraint.Static | Constraint.Dynamic;
