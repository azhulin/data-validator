import type { Path } from "../type";
import ErrorDataExpected from "./ErrorDataExpected";
/**
 * The data ignored error.
 */
export default class ErrorDataIgnored extends ErrorDataExpected {
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
