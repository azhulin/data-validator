import type { Path } from "../type";
import ErrorData from "./ErrorData";
/**
 * The data ignored error.
 */
export default class ErrorDataIgnored extends ErrorData {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorDataIgnored object.
     */
    constructor(path: Path);
    /**
     * {@inheritdoc}
     */
    toString(): string;
}
