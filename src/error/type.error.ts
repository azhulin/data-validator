import { ErrorExpected } from "."

import type { Handler } from "../component"
import type { Path } from "../type"

/**
 * The data type error.
 */
export class ErrorType extends ErrorExpected {

  /**
   * {@inheritdoc}
   */
  public type: string = "data.type"

  /**
   * Constructor for the ErrorType object.
   */
  public constructor(path: Path, { id, name, description }: Handler) {
    super("", path)
    const type = description ? `${name} (${description})` : name
    this.message = `Value has invalid type. ${type} expected.`
    this.details = { ...this.details, type: id }
  }

}
