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
    constructor(path, { id, name, description }, options) {
        super("", path);
        /**
         * {@inheritdoc}
         */
        this.type = "data.option";
        const type = description ? `${name} (${description})` : name;
        this.message = `${type} options do not contain the specified value.`;
        this.details = Object.assign(Object.assign({}, this.details), { type: id, options: this.formatOptions(options) });
    }
    /**
     * Returns formatted options.
     */
    formatOptions(options) {
        return options instanceof Map
            ? [...options.entries()]
            : options;
    }
}
exports.default = ErrorDataOption;
