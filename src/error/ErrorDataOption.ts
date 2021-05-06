import type { Path } from "../type"
import { Keys, KeyType, Options } from "../handler/Option"
import ErrorDataExpected from "./ErrorDataExpected"

/**
 * The data option error.
 */
export default class ErrorDataOption extends ErrorDataExpected {

  /**
   * {@inheritdoc}
   */
  public type: string = "data.option"

  /**
   * Constructor for the ErrorDataOption object.
   */
  public constructor(path: Path, options: Options, keyType: KeyType) {
    super("Value does not match allowed options.", path)
    this.details = {
      ...this.details,
      options: this.formatOptions(options, keyType),
    }
  }

  /**
   * Returns formatted options.
   */
  protected formatOptions(options: Options, keyType: KeyType): Keys | [number, string][] | Record<string, string> {
    return Array.isArray(options)
      ? options
      : "number" === keyType
        ? [...options.entries()] as [number, string][]
        : [...options].reduce(
          (items, [key, label]) => (items[key] = label, items),
          {} as Record<string, string>
        )
  }

}
