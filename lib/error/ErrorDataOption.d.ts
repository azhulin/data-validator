import type { Path } from "../type";
import { Keys, KeyType, Options } from "../handler/Option";
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
    constructor(path: Path, options: Options, keyType: KeyType);
    /**
     * Returns formatted options.
     */
    protected formatOptions(options: Options, keyType: KeyType): Keys | [number, string][] | Record<string, string>;
}
