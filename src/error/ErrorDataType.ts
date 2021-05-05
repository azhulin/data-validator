import type { Path } from "../type"
import ErrorData from "./ErrorData"
import Handler from "../Handler"

/**
 * The data type error.
 */
export default class ErrorDataType extends ErrorData {

  /**
   * {@inheritdoc}
   */
  public type: string = "data.type"

  /**
   * Constructor for the ErrorDataType object.
   */
  public constructor(path: Path, { id, name, description }: Handler) {
    super("", path)
    const type = description ? `${name} (${description})` : name
    this.message = `Value has invalid type. ${type} expected.`
    this.details = { ...this.details, type: id }
  }

}
