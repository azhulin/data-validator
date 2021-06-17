"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const enum_1 = require("../enum");
const util_1 = require("../util");
const error_1 = require("../error");
/**
 * The base data handler class.
 */
class Handler {
    /**
     * Constructor for the Handler object.
     */
    constructor({ config = {}, path, source, result, storage, warnings }) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        /**
         * The default data.
         */
        this.default = {
            value: null,
            read: context => this.getValue(context.default.value, context),
            create: context => this.getValue(context.default.value, context),
            update: context => { var _a; return (_a = context.original()) !== null && _a !== void 0 ? _a : context.default.value; },
            integrate: context => this.getValue(context.default.update, context),
            nulled: context => this.getValue(context.default.create, context),
        };
        /**
         * Whether to accept the data from input.
         */
        this.input = true;
        /**
         * Whether the data is required.
         */
        this.require = true;
        /**
         * An array of data preprocessors.
         */
        this.preprocessors = [];
        /**
         * An array of data constraints.
         */
        this.constraints = [];
        /**
         * An array of data postprocessors.
         */
        this.postprocessors = [];
        /**
         * Custom preprocessors, constraints, postprocessors.
         */
        this.custom = {};
        /**
         * A map of available data constraints.
         */
        this.constraintLibrary = {};
        /**
         * A map of available data processors.
         */
        this.processorLibrary = {};
        /**
         * The path of the data in the data tree.
         */
        this.path = [];
        /**
         * Intermediate data storage.
         */
        this.storage = {};
        /**
         * An array of collected during data handling warnings.
         */
        this.warnings = [];
        this.input = (_a = config.input) !== null && _a !== void 0 ? _a : this.input;
        this.require = (_b = config.require) !== null && _b !== void 0 ? _b : this.require;
        this.default = Object.assign(Object.assign({}, this.default), config.default);
        this.custom.preprocessors = [
            ...(_c = this.custom.preprocessors) !== null && _c !== void 0 ? _c : [],
            ...(_d = config.preprocessors) !== null && _d !== void 0 ? _d : [],
        ];
        this.custom.constraints = [
            ...(_e = this.custom.constraints) !== null && _e !== void 0 ? _e : [],
            ...(_f = config.constraints) !== null && _f !== void 0 ? _f : [],
        ];
        this.custom.postprocessors = [
            ...(_g = this.custom.postprocessors) !== null && _g !== void 0 ? _g : [],
            ...(_h = config.postprocessors) !== null && _h !== void 0 ? _h : [],
        ];
        this.path = path !== null && path !== void 0 ? path : this.path;
        this.source = source;
        this.result = result;
        this.storage = storage !== null && storage !== void 0 ? storage : this.storage;
        this.warnings = warnings !== null && warnings !== void 0 ? warnings : this.warnings;
    }
    /**
     * The description of the data type.
     */
    get description() { return ""; }
    /**
     * Resets the handler state.
     */
    reset(data) {
        if (this.isRoot()) {
            this.source = data;
            this.result = undefined;
            this.storage = {};
            this.warnings = [];
        }
    }
    /**
     * Returns validated data.
     */
    async validate(data, baseContext) {
        this.reset(data);
        const context = await this.getContext(baseContext);
        if (!await this.isInputable(context)) {
            !this.isOmitted(data) && this.inSource()
                && this.warn(new error_1.ErrorIgnored(this.path));
            data = await this.getDefault(context);
        }
        else if (this.isOmitted(data)) {
            const required = await this.isRequired(context);
            if (required && !context.update) {
                throw new error_1.ErrorRequired(this.path);
            }
            data = await this.getDefault(context);
            if (required && this.isEmpty(data)) {
                throw new error_1.ErrorRequired(this.path);
            }
        }
        else if (this.isEmpty(data)) {
            if (await this.isRequired(context)) {
                throw new error_1.ErrorEmpty(this.path);
            }
            data = await this.getDefault(context, "nulled");
        }
        if (!this.isEmpty(data) && !this.isOmitted(data)) {
            if (!this.isValid(data)) {
                throw new error_1.ErrorType(this.path, this);
            }
            data = await this.process(data, context);
        }
        return data;
    }
    /**
     * Returns the context.
     */
    async getContext(context) {
        const { create, update, integrate } = enum_1.Operation;
        const { operation = create, data } = context !== null && context !== void 0 ? context : {};
        if ([update, integrate].includes(operation) && !data) {
            throw new error_1.ErrorUnexpected(`Context data is required for the ${operation} operation.`);
        }
        return Object.assign(Object.assign({}, context), { operation, create: false, update: false, integrate: false, [operation]: true, handler: this, default: this.default, path: this.path, source: field => util_1.extract(this.source, util_1.pathResolve(this.path, field)), result: field => util_1.extract(this.result, util_1.pathResolve(this.path, field)), original: field => util_1.extract(data, util_1.pathResolve(this.path, field)), storage: (key, value) => undefined !== value ? this.storage[key] = value : this.storage[key] });
    }
    /**
     * Determines whether the data is valid.
     */
    isValid(data) {
        return true;
    }
    /**
     * Processes the data.
     */
    async process(data, context) {
        data = await this.preprocess(data, context);
        await this.checkConstraints(data, context);
        return this.postprocess(data, context);
    }
    /**
     * Runs data preprocessors.
     */
    async preprocess(data, context) {
        return this.run("preprocessors", data, context);
    }
    /**
     * Runs data postprocessors.
     */
    async postprocess(data, context) {
        return this.run("postprocessors", data, context);
    }
    /**
     * Runs processors on the data.
     */
    async run(type, data, context) {
        var _a;
        for (let processor of [...this[type], ...(_a = this.custom[type]) !== null && _a !== void 0 ? _a : []]) {
            "string" === typeof processor
                && this.processorLibrary[processor]
                && (processor = this.processorLibrary[processor]);
            if ("function" !== typeof processor) {
                throw new error_1.ErrorUnexpected(`${this.name} processor '${processor}' is invalid.`);
            }
            data = await processor(data, context);
        }
        return data;
    }
    /**
     * Checks data constraints.
     */
    async checkConstraints(data, context) {
        var _a;
        const constraints = [];
        for (const item of [...this.constraints, ...(_a = this.custom.constraints) !== null && _a !== void 0 ? _a : []]) {
            constraints.push(..."function" === typeof item ? item(context) : [item]);
        }
        for (const item of constraints) {
            const [constraint, func] = ("string" === typeof item ? [item] : item);
            const { update, original } = context;
            // Allows to skip constraint validation on update with unchanged value.
            if ("?" === constraint[0] && update && data === original()) {
                continue;
            }
            const id = constraint.replace(/^\?/, "");
            const result = func
                ? await func(data, context)
                : this.constraintLibrary[id]
                    ? await this.constraintLibrary[id](data, context)
                    : await this.checkConstraint(id, data, context);
            if (null !== result) {
                const [message, details] = "string" === typeof result ? [result] : result;
                throw new error_1.ErrorConstraint(message, this.path, this.id, id, details);
            }
        }
    }
    /**
     * Checks a data constraint.
     */
    async checkConstraint(constraint, data, context) {
        throw new error_1.ErrorUnexpected(`${this.name} constraint '${constraint}' is invalid.`);
    }
    /**
     * Determines whether the value is present in source data.
     */
    inSource() {
        return undefined !== util_1.extract(this.source, this.path);
    }
    /**
     * Determines whether this is a root data handler.
     */
    isRoot() {
        return !this.path.length;
    }
    /**
     * Determines whether the data was not provided.
     */
    isOmitted(data) {
        return undefined === data;
    }
    /**
     * Determines whether the data is empty.
     */
    isEmpty(data) {
        return null === data;
    }
    /**
     * Returns "input" flag value.
     */
    async isInputable(context) {
        return this.getProperty("input", context);
    }
    /**
     * Returns "require" flag value.
     */
    async isRequired(context) {
        return this.getProperty("require", context);
    }
    /**
     * Returns the default value based on behavior.
     */
    async getDefault(context, behavior) {
        const property = this.default[behavior !== null && behavior !== void 0 ? behavior : context.operation];
        return this.getValue(property, context);
    }
    /**
     * Returns data handler dynamic context property value.
     */
    async getProperty(key, context) {
        return this.getValue(this[key], context);
    }
    /**
     * Returns dynamic context property value.
     */
    async getValue(property, context) {
        return "function" === typeof property
            ? property(context)
            : property;
    }
    /**
     * Returns the data handler for specified data definition.
     */
    initHandler(definition, path) {
        const { Handler } = definition, config = __rest(definition, ["Handler"]);
        const { source, result, storage, warnings } = this;
        const settings = {
            config, path, source, result, storage, warnings,
        };
        return new Handler(settings);
    }
    /**
     * Adds a warning.
     */
    warn(error) {
        this.warnings.push(error);
    }
}
exports.Handler = Handler;
