import type { Path } from "./type"
import ErrorDataUnexpected from "./error/ErrorDataUnexpected"

/**
 * Determines whether the value is a string.
 */
export const isString = (value: unknown): boolean =>
  "string" === typeof value

/**
 * Determines whether the value is an object.
 */
export const isObject = (value: unknown): boolean =>
  value && "object" === typeof value && Object === value.constructor

/**
 * Determines whether the value is an index.
 */
export const isIndex = (value: unknown): boolean =>
  Number.isInteger(value) && 0 <= value

/**
 * Extracts a value from data by field or path.
 */
export const extract = (data: unknown, field: string | Path, fallback: unknown = undefined): unknown => {
  const path = "string" === typeof field ? fieldToPath(field) : [...field]
  let value: any = data
  for (const key of path) {
    if ("string" === typeof key && !isObject(value)
        || isIndex(key) && !Array.isArray(value)
        || !(key in value)) {
      return fallback
    }
    value = value[key]
  }
  return value
}

/**
 * Sets data value by field or path.
 */
export const set = (data: unknown, ...fields: any[]): unknown => {
  while (fields.length) {
    const [field, item] = fields.splice(0, 2)
    const path = "string" === typeof field ? fieldToPath(field) : [...field]
    if (!path.length) {
      data = item
      continue
    }
    const last = path.pop()
    let value: any = data
    for (const key of path) {
      if ("string" === typeof key && !isObject(value)
          || isIndex(key) && !Array.isArray(value)
          || !(key in (value as object))) {
        throw new ErrorDataUnexpected("Can not set data, because specified path does not exist.")
      }
      value = value[key]
    }
    if ("string" === typeof last && !isObject(value)
        || isIndex(last) && !Array.isArray(value)) {
      throw new ErrorDataUnexpected("Can not set data, because value at specified path is invalid.")
    }
    undefined === item ? delete value[last] : value[last] = item
  }
  return data
}

/**
 * Returns the modified path.
 */
export const pathResolve = (path: Path, field: string = ""): Path => {
  if ("*" === field) {
    return []
  }
  const regexp = /^\^([0-9]+)?/
  const match = field.match(regexp)
  const up = match ? +(match[1] ?? 1) : 0
  field = field.replace(regexp, "")
  if (up > path.length) {
    throw new ErrorDataUnexpected("Unable to resolve the path, because specified offset is out of bounds.")
  }
  return [
    ...path.slice(0, up ? -up : undefined),
    ...fieldToPath(field),
  ]
}

/**
 * Converts a string to a data path.
 */
export const fieldToPath = (field?: string): Path => {
  if (!field) {
    return []
  }
  if (!field.match(/^((\.([0-9a-z]+_?)*[0-9a-z])|(\[[0-9]+\]))+$/)) {
    throw new ErrorDataUnexpected(`Unable to convert field to path, because specified field '${field}' is invalid.`)
  }
  return field.split(/(\.[^.\[]+|\[[^\]]+\])/).filter(item => item)
    .map(item => "." === item[0] ? item.substr(1) : +item.substr(1, 1))
}

/**
 * Converts a data path to a string.
 */
export const pathToField = (path: Path): string =>
  path.map(item => "string" === typeof item ? `.${item}` : `[${item}]`).join("")
