import type { Path } from "../type"
import ErrorDataExpected from "./ErrorDataExpected"

/**
 * The data required error.
 */
export default class ErrorDataRequired extends ErrorDataExpected {

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
