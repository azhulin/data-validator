"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorDataExpected_1 = require("./ErrorDataExpected");
/**
 * The data ignored error.
 */
class ErrorDataIgnored extends ErrorDataExpected_1.default {
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
