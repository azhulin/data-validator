"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorData_1 = require("./ErrorData");
/**
 * The data empty error.
 */
class ErrorDataEmpty extends ErrorData_1.default {
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
