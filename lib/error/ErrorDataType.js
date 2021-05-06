"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorDataExpected_1 = require("./ErrorDataExpected");
/**
 * The data type error.
 */
class ErrorDataType extends ErrorDataExpected_1.default {
    /**
     * Constructor for the ErrorDataType object.
     */
    constructor(path, { id, name, description }) {
        super("", path);
        /**
         * {@inheritdoc}
         */
        this.type = "data.type";
        const type = description ? `${name} (${description})` : name;
        this.message = `Value has invalid type. ${type} expected.`;
        this.details = Object.assign(Object.assign({}, this.details), { type: id });
    }
}
exports.default = ErrorDataType;
