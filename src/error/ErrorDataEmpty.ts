import type { Path } from "../type"
import ErrorData from "./ErrorData"

/**
 * The data empty error.
 */
export default class ErrorDataEmpty extends ErrorData {

  /**
   * {@inheritdoc}
   */
  public type: string = "data.empty"

  /**
   * Constructor for the ErrorDataEmpty object.
   */
  public constructor(path: Path) {
    super("Value should not be empty.", path)
  }

}
