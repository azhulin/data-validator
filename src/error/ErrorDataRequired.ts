import type { Path } from "../type"
import ErrorData from "./ErrorData"

/**
 * The data required error.
 */
export default class ErrorDataRequired extends ErrorData {

  /**
   * {@inheritdoc}
   */
  public type: string = "data.required"

  /**
   * Constructor for the ErrorDataRequired object.
   */
  public constructor(path: Path) {
    super("Value is required.", path)
  }

}
