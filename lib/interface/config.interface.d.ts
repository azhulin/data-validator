import { Context } from ".";
import { Constraint, Default, Processor, Property } from "../type";
/**
 * The data handler configuration.
 */
export interface Config<T> {
    input?: Property<boolean, Context<T>>;
    require?: Property<boolean, Context<T>>;
    default?: Partial<Default<T>>;
    preparers?: Processor<T>[];
    preprocessors?: Processor<T>[];
    constraints?: Constraint.List<T>;
    postprocessors?: Processor<T>[];
}
