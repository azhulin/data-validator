import type { Context } from "../interface";
/**
 * The data processor.
 */
export declare type Processor<T> = (data: any, context: Context<T>) => T;
export declare namespace Processor {
    type Library<T> = Record<string, Processor<T>>;
}
