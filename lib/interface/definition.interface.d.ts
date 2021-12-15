import type { Config, Settings } from ".";
import type { Handler } from "../component";
/**
 * The data definition.
 */
export interface Definition extends Config {
    Handler: new (settings: Settings) => Handler;
}
