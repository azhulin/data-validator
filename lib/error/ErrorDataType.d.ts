import type { Path } from "../type";
import type Handler from "../Handler";
import ErrorDataExpected from "./ErrorDataExpected";
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
