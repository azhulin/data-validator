import type { Path } from "../type";
import ErrorDataExpected from "./ErrorDataExpected";
/**
 * The data adapted error.
 */
export default class ErrorDataAdapted extends ErrorDataExpected {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorDataAdapted object.
     */
    constructor(path: Path, original: unknown, adapted: unknown);
    /**
     * {@inheritdoc}
     */
    toString(): string;
}
