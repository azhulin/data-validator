import type { Path } from "../type";
import ErrorDataExpected from "./ErrorDataExpected";
/**
 * The data empty error.
 */
export default class ErrorDataEmpty extends ErrorDataExpected {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorDataEmpty object.
     */
    constructor(path: Path);
}
