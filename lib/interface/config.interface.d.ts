import type { Context } from ".";
import type { Constraint, Default, Processor, Property } from "../type";
/**
 * The data handler configuration.
 */
export interface Config {
    input?: Property<boolean, Context>;
    require?: Property<boolean, Context>;
    default?: Partial<Default>;
    preparers?: Processor[];
    preprocessors?: Processor[];
    constraints?: Constraint[];
    postprocessors?: Processor[];
}
