"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorDataExpected_1 = require("./ErrorDataExpected");
/**
 * The data required error.
 */
class ErrorDataRequired extends ErrorDataExpected_1.default {
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
