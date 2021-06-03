"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorExpected = void 0;
const data_error_1 = require("./data.error");
/**
 * The expected data error.
 *
 * Errors related to the data validation itself, e.g. invalid data type.
 */
class ErrorExpected extends data_error_1.ErrorData {
}
exports.ErrorExpected = ErrorExpected;
