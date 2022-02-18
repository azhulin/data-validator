import type { HandlerConstructor } from ".";
import type { Config } from "../interface";
/**
 * The data definition.
 */
export declare type Definition<T = any> = HandlerConstructor<T> | [HandlerConstructor<T>, Config<T>?];
