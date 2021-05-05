"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorData_1 = require("./ErrorData");
/**
 * The data required error.
 */
class ErrorDataRequired extends ErrorData_1.default {
    /**
     * Constructor for the ErrorDataRequired object.
     */
    constructor(path) {
        super("Value is required.", path);
        /**
         * {@inheritdoc}
         */
        this.type = "data.required";
    }
}
exports.default = ErrorDataRequired;
