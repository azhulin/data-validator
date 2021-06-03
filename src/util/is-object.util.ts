/**
 * Determines whether the value is an object.
 */
export function isObject(value: unknown): boolean {
  return value && "object" === typeof value && Object === value.constructor
}
