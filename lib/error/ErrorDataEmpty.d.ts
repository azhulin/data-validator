import type { Path } from "../type";
import ErrorData from "./ErrorData";
/**
 * The data empty error.
 */
export default class ErrorDataEmpty extends ErrorData {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorDataEmpty object.
     */
    constructor(path: Path);
}
