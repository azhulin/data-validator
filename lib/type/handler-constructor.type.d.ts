import type { Handler } from "../component";
import type { Settings } from "../interface";
/**
 * The handler constructor.
 */
export declare type HandlerConstructor<T> = new (settings: Settings<T>) => Handler<T>;
