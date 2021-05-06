import type { Path } from "../type";
import ErrorDataExpected from "./ErrorDataExpected";
/**
 * The data required error.
 */
export default class ErrorDataRequired extends ErrorDataExpected {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorDataRequired object.
     */
    constructor(path: Path);
}
