"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorData_1 = require("./ErrorData");
/**
 * The data adapted error.
 */
class ErrorDataAdapted extends ErrorData_1.default {
    /**
     * Constructor for the ErrorDataAdapted object.
     */
    constructor(path, original, adapted) {
        super(`Value was adapted from ${JSON.stringify(original)} to ${JSON.stringify(adapted)}.`, path);
        /**
         * {@inheritdoc}
         */
        this.type = "data.adapted";
        this.details = Object.assign(Object.assign({}, this.details), { original, adapted });
    }
    /**
     * {@inheritdoc}
     */
    toString() {
        let { original, adapted } = this.details;
        original = JSON.stringify(original);
        adapted = JSON.stringify(adapted);
        return `Value of field ${this.getField()} was adapted from ${original} to ${adapted}.`;
    }
}
exports.default = ErrorDataAdapted;
