"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorDataExpected_1 = require("./ErrorDataExpected");
/**
 * The data option error.
 */
class ErrorDataOption extends ErrorDataExpected_1.default {
    /**
     * Constructor for the ErrorDataOption object.
     */
    constructor(path, options, keyType) {
        super("Value does not match allowed options.", path);
        /**
         * {@inheritdoc}
         */
        this.type = "data.option";
        this.details = Object.assign(Object.assign({}, this.details), { options: this.formatOptions(options, keyType) });
    }
    /**
     * Returns formatted options.
     */
    formatOptions(options, keyType) {
        return Array.isArray(options)
            ? options
            : "number" === keyType
                ? [...options.entries()]
                : [...options].reduce((items, [key, label]) => (items[key] = label, items), {});
    }
}
exports.default = ErrorDataOption;
