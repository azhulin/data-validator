import type { Path } from "../type";
import ErrorData from "./ErrorData";
/**
 * The data required error.
 */
export default class ErrorDataRequired extends ErrorData {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorDataRequired object.
     */
    constructor(path: Path);
}
