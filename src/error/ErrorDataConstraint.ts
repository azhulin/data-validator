import type { Path } from "../type"
import ErrorDataExpected from "./ErrorDataExpected"

/**
 * The data constraint error.
 */
export default class ErrorDataConstraint extends ErrorDataExpected {

  /**
   * {@inheritdoc}
   */
  public type: string = "data.constraint"

  /**
   * Constructor for the ErrorDataConstraint object.
   */
  public constructor(message: string, path: Path, type: string, constraint: string, details?: Record<string, unknown>) {
    super(message, path)
    this.details = { ...this.details, type, constraint, ...details }
  }

}
