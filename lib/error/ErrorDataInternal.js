"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorData_1 = require("./ErrorData");
/**
 * The internal data error.
 */
class ErrorDataInternal extends ErrorData_1.default {
    constructor() {
        super(...arguments);
        /**
         * {@inheritdoc}
         */
        this.type = "data.internal";
    }
}
exports.default = ErrorDataInternal;
