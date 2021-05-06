"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorData_1 = require("./ErrorData");
/**
 * The unexpected data error.
 *
 * Errors not related to the data validation itself, e.g. requesting a non-existing data handler.
 */
class ErrorDataUnexpected extends ErrorData_1.default {
    constructor() {
        super(...arguments);
        /**
         * {@inheritdoc}
         */
        this.type = "data.unexpected";
    }
}
exports.default = ErrorDataUnexpected;
