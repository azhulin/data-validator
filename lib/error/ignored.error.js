"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorIgnored = void 0;
const expected_error_1 = require("./expected.error");
/**
 * The data ignored error.
 */
class ErrorIgnored extends expected_error_1.ErrorExpected {
    /**
     * Constructor for the ErrorIgnored object.
     */
    constructor(path) {
        super("Value is ignored.", path);
        /**
         * {@inheritdoc}
         */
        this.type = "data.ignored";
    }
    /**
     * {@inheritdoc}
     */
    toString() {
        return `Value of the field ${this.getField()} is ignored.`;
    }
}
exports.ErrorIgnored = ErrorIgnored;
