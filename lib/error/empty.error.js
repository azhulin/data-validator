"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorEmpty = void 0;
const expected_error_1 = require("./expected.error");
/**
 * The data empty error.
 */
class ErrorEmpty extends expected_error_1.ErrorExpected {
    /**
     * Constructor for the ErrorEmpty object.
     */
    constructor(path) {
        super("Value should not be empty.", path);
        /**
         * {@inheritdoc}
         */
        this.type = "data.empty";
    }
}
exports.ErrorEmpty = ErrorEmpty;
