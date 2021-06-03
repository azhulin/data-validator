"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorOption = void 0;
const expected_error_1 = require("./expected.error");
/**
 * The data option error.
 */
class ErrorOption extends expected_error_1.ErrorExpected {
    /**
     * Constructor for the ErrorOption object.
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
exports.ErrorOption = ErrorOption;
