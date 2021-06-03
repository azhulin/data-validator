import type { Config, Settings } from "."

/**
 * The data definition.
 */
export interface Definition extends Config {
  Handler: new (settings: Settings) => any
}
