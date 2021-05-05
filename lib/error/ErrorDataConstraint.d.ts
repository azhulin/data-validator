import type { Path } from "../type";
import ErrorData from "./ErrorData";
/**
 * The data constraint error.
 */
export default class ErrorDataConstraint extends ErrorData {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorDataConstraint object.
     */
    constructor(message: string, path: Path, type: string, constraint: string, details?: Record<string, unknown>);
}
