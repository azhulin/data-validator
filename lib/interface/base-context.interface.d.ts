import type { Operation } from "../enum";
/**
 * The base data context.
 */
export interface BaseContext<T> {
    operation?: Operation;
    data?: T;
    [key: string]: unknown;
}
