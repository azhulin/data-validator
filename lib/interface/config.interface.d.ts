import type { Context, Default } from ".";
import type { Constraint, Processor, Property } from "../type";
/**
 * The data handler configuration.
 */
export interface Config {
    input?: Property<boolean, Context>;
    require?: Property<boolean, Context>;
    default?: Partial<Default>;
    preprocessors?: Processor[];
    constraints?: Constraint[];
    postprocessors?: Processor[];
}
