import { ErrorExpected } from ".";
import type { Handler } from "../component";
import type { Path } from "../type";
/**
 * The data type error.
 */
export declare class ErrorType extends ErrorExpected {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorType object.
     */
    constructor(path: Path, { id, name, description }: Handler);
}
