import type { Path } from "../type"
import ErrorData from "./ErrorData"

/**
 * The data adapted error.
 */
export default class ErrorDataAdapted extends ErrorData {

  /**
   * {@inheritdoc}
   */
  public type: string = "data.adapted"

  /**
   * Constructor for the ErrorDataAdapted object.
   */
  public constructor(path: Path, original: unknown, adapted: unknown) {
    super(`Value was adapted from ${JSON.stringify(original)} to ${JSON.stringify(adapted)}.`, path)
    this.details = { ...this.details, original, adapted }
  }

  /**
   * {@inheritdoc}
   */
  public toString(): string {
    let { original, adapted } = this.details
    original = JSON.stringify(original)
    adapted = JSON.stringify(adapted)
    return `Value of field ${this.getField()} was adapted from ${original} to ${adapted}.`
  }

}
