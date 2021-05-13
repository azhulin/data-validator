import ErrorData from "./ErrorData";
/**
 * The unexpected data error.
 *
 * Errors not related to the data validation itself, e.g. checking a non-existing data constraint.
 */
export default class ErrorDataUnexpected extends ErrorData {
    /**
     * {@inheritdoc}
     */
    type: string;
}
