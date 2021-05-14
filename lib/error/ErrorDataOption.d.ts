import type { Path } from "../type";
import type { Keys, Options } from "../handler/Option";
import type Handler from "../Handler";
import ErrorDataExpected from "./ErrorDataExpected";
/**
 * The data option error.
 */
export default class ErrorDataOption extends ErrorDataExpected {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorDataOption object.
     */
    constructor(path: Path, { id, name, description }: Handler, options: Options);
    /**
     * Returns formatted options.
     */
    protected formatOptions(options: Options): Keys | [number, string][] | Record<string, string>;
}
