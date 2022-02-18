/**
 * The data property.
 */
export type Property<T, C> = Property.Static<T> | Property.Dynamic<T, C>

export namespace Property {
  export type Static<T> = T
  export type Dynamic<T, C> = (context: C) => T | Promise<T>
}
