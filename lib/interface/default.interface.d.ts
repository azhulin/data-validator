import type { Context } from ".";
import type { Property, Value } from "../type";
import type { Operation } from "../enum";
/**
 * The data default value behaviors configuration.
 */
export interface Default {
    value: Property<Value, Context>;
    nulled: Property<Value, Context>;
    [Operation.create]: Property<Value, Context>;
    [Operation.update]: Property<Value, Context>;
    [Operation.integrate]: Property<Value, Context>;
}
