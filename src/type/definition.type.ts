import type { HandlerConstructor } from "."
import type { Config } from "../interface"

/**
 * The data definition.
 */
export type Definition<T = any> = HandlerConstructor<T> | [HandlerConstructor<T>, Config<T>?]
