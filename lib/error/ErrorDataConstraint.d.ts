import type { Path } from "../type";
import ErrorDataExpected from "./ErrorDataExpected";
/**
 * The data constraint error.
 */
export default class ErrorDataConstraint extends ErrorDataExpected {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorDataConstraint object.
     */
    constructor(message: string, path: Path, type: string, constraint: string, details?: Record<string, unknown>);
}
