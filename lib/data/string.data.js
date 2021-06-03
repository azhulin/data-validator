"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.conf = exports.Handler = void 0;
const Data = require("..");
/**
 * The string data handler class.
 */
class Handler extends Data.Handler {
    constructor() {
        super(...arguments);
        /**
         * {@inheritdoc}
         */
        this.constraintLibrary = Object.assign(Object.assign({}, this.constraintLibrary), { trimmed: (data) => data === data.trim() ? null : "Value should be trimmed." });
        /**
         * {@inheritdoc}
         */
        this.processorLibrary = Object.assign(Object.assign({}, this.processorLibrary), { trim: (data) => data.trim(), lower: (data) => data.toLowerCase(), upper: (data) => data.toUpperCase() });
    }
    /**
     * {@inheritdoc}
     */
    get id() { return "string"; }
    /**
     * {@inheritdoc}
     */
    get name() { return "String"; }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return "string" === typeof data;
    }
    /**
     * {@inheritdoc}
     */
    async process(data, context) {
        const original = data;
        data = await super.process(data, context);
        original !== data
            && this.warn(new Data.ErrorAdapted(this.path, original, data));
        return data;
    }
    /**
     * {@inheritdoc}
     */
    async checkConstraint(constraint, data, context) {
        const matches = constraint.match(/^length(=|>|>=|<|<=|<>)(\d+)$/);
        if (matches) {
            const length = +matches[2];
            switch (matches[1]) {
                case "=":
                    return data.length === length
                        ? null
                        : `Length should be equal to ${length}.`;
                case ">":
                    return data.length > length
                        ? null
                        : `Length should be greater than ${length}.`;
                case ">=":
                    return data.length >= length
                        ? null
                        : `Length should be greater than or equal to ${length}.`;
                case "<":
                    return data.length < length
                        ? null
                        : `Length should be lesser than ${length}.`;
                case "<=":
                    return data.length <= length
                        ? null
                        : `Length should be lesser than or equal to ${length}.`;
                case "<>":
                    return data.length !== length
                        ? null
                        : `Length should not be equal to ${length}.`;
            }
        }
        return super.checkConstraint(constraint, data, context);
    }
}
exports.Handler = Handler;
function conf(config) { return Object.assign(Object.assign({}, config), { Handler }); }
exports.conf = conf;
function init(config) { return new Handler({ config }); }
exports.init = init;
