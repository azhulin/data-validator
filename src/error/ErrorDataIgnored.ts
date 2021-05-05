import type { Path } from "../type"
import ErrorData from "./ErrorData"

/**
 * The data ignored error.
 */
export default class ErrorDataIgnored extends ErrorData {

  /**
   * {@inheritdoc}
   */
  public type: string = "data.ignored"

  /**
   * Constructor for the ErrorDataIgnored object.
   */
  public constructor(path: Path) {
    super("Value is ignored.", path)
  }

  /**
   * {@inheritdoc}
   */
  public toString(): string {
    return `Value of the field ${this.getField()} is ignored.`
  }

}
