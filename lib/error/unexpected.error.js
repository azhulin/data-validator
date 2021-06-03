"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorUnexpected = void 0;
const data_error_1 = require("./data.error");
/**
 * The unexpected data error.
 *
 * Errors not related to the data validation itself, e.g. checking a non-existing data constraint.
 */
class ErrorUnexpected extends data_error_1.ErrorData {
    constructor() {
        super(...arguments);
        /**
         * {@inheritdoc}
         */
        this.type = "data.unexpected";
    }
}
exports.ErrorUnexpected = ErrorUnexpected;
