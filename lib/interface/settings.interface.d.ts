import type { Config } from ".";
import type { Path } from "../type";
/**
 * The data handler settings.
 */
export interface Settings<T> {
    config?: Config<T>;
    path?: Path;
    storage?: Record<string, unknown>;
    source?: unknown;
    result?: unknown;
    warnings?: Error[];
}
