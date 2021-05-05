"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorData_1 = require("./ErrorData");
/**
 * The data constraint error.
 */
class ErrorDataConstraint extends ErrorData_1.default {
    /**
     * Constructor for the ErrorDataConstraint object.
     */
    constructor(message, path, type, constraint, details) {
        super(message, path);
        /**
         * {@inheritdoc}
         */
        this.type = "data.constraint";
        this.details = Object.assign(Object.assign(Object.assign({}, this.details), { type, constraint }), details);
    }
}
exports.default = ErrorDataConstraint;
