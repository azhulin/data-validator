export declare namespace Property {
    type Static<T> = T;
    type Dynamic<T, C> = (context: C) => T | Promise<T>;
}
/**
 * The data property.
 */
export declare type Property<T, C> = Property.Static<T> | Property.Dynamic<T, C>;
