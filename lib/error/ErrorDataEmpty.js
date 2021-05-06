"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorDataExpected_1 = require("./ErrorDataExpected");
/**
 * The data empty error.
 */
class ErrorDataEmpty extends ErrorDataExpected_1.default {
    /**
     * Constructor for the ErrorDataEmpty object.
     */
    constructor(path) {
        super("Value should not be empty.", path);
        /**
         * {@inheritdoc}
         */
        this.type = "data.empty";
    }
}
exports.default = ErrorDataEmpty;
