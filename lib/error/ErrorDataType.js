"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorData_1 = require("./ErrorData");
/**
 * The data type error.
 */
class ErrorDataType extends ErrorData_1.default {
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
