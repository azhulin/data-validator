import type { Path } from "../type";
import ErrorData from "./ErrorData";
import Handler from "../Handler";
/**
 * The data type error.
 */
export default class ErrorDataType extends ErrorData {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorDataType object.
     */
    constructor(path: Path, { id, name, description }: Handler);
}
