import type { Path } from "../type"
import type { Keys, Options } from "../handler/Option"
import type Handler from "../Handler"
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
  public constructor(path: Path, { id, name, description }: Handler, options: Options) {
    super("", path)
    const type = description ? `${name} (${description})` : name
    this.message = `${type} options do not contain the specified value.`
    this.details = {
      ...this.details,
      type: id,
      options: this.formatOptions(options),
    }
  }

  /**
   * Returns formatted options.
   */
  protected formatOptions(options: Options): Keys | [number, string][] | Record<string, string> {
    return options instanceof Map
      ? [...options.entries()] as [number, string][]
      : options
  }

}
