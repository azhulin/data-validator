import type { Path } from "../type";
import ErrorDataExpected from "./ErrorDataExpected";
import Handler from "../Handler";
/**
 * The data type error.
 */
export default class ErrorDataType extends ErrorDataExpected {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorDataType object.
     */
    constructor(path: Path, { id, name, description }: Handler);
}
