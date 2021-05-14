"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.conf = exports.Handler = void 0;
const Data = require("..");
/**
 * The list data handler class.
 */
class Handler extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(settings) {
        var _a;
        super(settings);
        /**
         * {@inheritdoc}
         */
        this.default = Object.assign(Object.assign({}, this.default), { value: (_a = this.default.value) !== null && _a !== void 0 ? _a : [] });
        /**
         * {@inheritdoc}
         */
        this.constraintLibrary = Object.assign(Object.assign({}, this.constraintLibrary), { unique: (data) => {
                const items = new Set();
                for (const [index, item] of data.map(i => JSON.stringify(i)).entries()) {
                    if (items.has(item)) {
                        return [`Values are not unique.`, { index }];
                    }
                    items.add(item);
                }
                return null;
            } });
        const config = settings.config;
        this.item = config.item;
        const { id, name } = this.getHandler();
        this.typeId = id;
        this.typeName = name;
    }
    /**
     * {@inheritdoc}
     */
    get id() { return `array<${this.typeId}>`; }
    /**
     * {@inheritdoc}
     */
    get name() { return `${this.typeName} array`; }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return Array.isArray(data);
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
    /**
     * {@inheritdoc}
     */
    async process(data, context) {
        const result = [];
        this.result = Data.Util.set(this.result, this.path, result);
        for (const [index, item] of data.entries()) {
            result[index] = await this.getHandler(index).validate(item, context);
        }
        return super.process(result, context);
    }
    /**
     * Returns data handler.
     */
    getHandler(index) {
        return this.initHandler(this.item, [...this.path, index !== null && index !== void 0 ? index : "#"]);
    }
}
exports.Handler = Handler;
function conf(config) { return Object.assign({ Handler }, config); }
exports.conf = conf;
function init(config) { return new Handler({ config }); }
exports.init = init;
