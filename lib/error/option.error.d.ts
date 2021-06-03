import { ErrorExpected } from "./expected.error";
import type { Handler } from "../component";
import type { Path } from "../type";
import type { Keys, Options } from "../data/option.data";
/**
 * The data option error.
 */
export declare class ErrorOption extends ErrorExpected {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorOption object.
     */
    constructor(path: Path, { id, name, description }: Handler, options: Options);
    /**
     * Returns formatted options.
     */
    protected formatOptions(options: Options): Keys | [number, string][] | Record<string, string>;
}
