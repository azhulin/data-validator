import type { Context } from "../interface";
export declare namespace Processor {
    type Func = (data: unknown, context: Context) => unknown;
    type Library = Record<string, Func>;
}
/**
 * The data processor.
 */
export declare type Processor = string | Processor.Func;
