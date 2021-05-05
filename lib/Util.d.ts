import type { Path } from "./type";
/**
 * Determines whether the value is a string.
 */
export declare const isString: (value: unknown) => boolean;
/**
 * Determines whether the value is an object.
 */
export declare const isObject: (value: unknown) => boolean;
/**
 * Determines whether the value is an index.
 */
export declare const isIndex: (value: unknown) => boolean;
/**
 * Extracts a value from data by field or path.
 */
export declare const extract: (data: unknown, field: string | Path, fallback?: unknown) => unknown;
/**
 * Sets data value by field or path.
 */
export declare const set: (data: unknown, ...fields: any[]) => unknown;
/**
 * Returns the modified path.
 */
export declare const pathResolve: (path: Path, field?: string) => Path;
