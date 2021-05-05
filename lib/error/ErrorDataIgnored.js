"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorData_1 = require("./ErrorData");
/**
 * The data ignored error.
 */
class ErrorDataIgnored extends ErrorData_1.default {
    /**
     * Constructor for the ErrorDataIgnored object.
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
exports.default = ErrorDataIgnored;
