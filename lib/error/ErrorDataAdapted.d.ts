import type { Path } from "../type";
import ErrorData from "./ErrorData";
/**
 * The data adapted error.
 */
export default class ErrorDataAdapted extends ErrorData {
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
