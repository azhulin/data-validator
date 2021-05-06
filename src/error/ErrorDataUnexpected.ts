import ErrorData from "./ErrorData"

/**
 * The unexpected data error.
 *
 * Errors not related to the data validation itself, e.g. requesting a non-existing data handler.
 */
export default class ErrorDataUnexpected extends ErrorData {

  /**
   * {@inheritdoc}
   */
  public type: string = "data.unexpected"

}
