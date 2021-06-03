import { ErrorExpected } from "./expected.error"

import type { Handler } from "../component"
import type { Path } from "../type"
import type { Keys, Options } from "../data/option.data"

/**
 * The data option error.
 */
export class ErrorOption extends ErrorExpected {

  /**
   * {@inheritdoc}
   */
  public type: string = "data.option"

  /**
   * Constructor for the ErrorOption object.
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
