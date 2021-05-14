"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.conf = exports.Handler = void 0;
const Data = require("..");
/**
 * The object data handler class.
 */
class Handler extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(settings) {
        var _a, _b;
        super(settings);
        this._schema = { raw: {} };
        /**
         * Whether to use default value, if all schema keys are optional and equal to Null.
         */
        this.reduce = false;
        const config = settings.config;
        this.schema = (_a = config.schema) !== null && _a !== void 0 ? _a : this.schema;
        this.reduce = (_b = config.reduce) !== null && _b !== void 0 ? _b : this.reduce;
    }
    /**
     * {@inheritdoc}
     */
    get id() { return "object"; }
    /**
     * {@inheritdoc}
     */
    get name() { return "Object"; }
    /**
     * The schema.
     */
    get schema() {
        var _a;
        return (_a = this._schema.prepared) !== null && _a !== void 0 ? _a : (this._schema.prepared = this.prepareSchema());
    }
    set schema(schema) { this._schema = { raw: schema }; }
    /**
     * Prepares the schema.
     */
    prepareSchema() {
        return this._schema.raw;
    }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return Data.Util.isObject(data);
    }
    /**
     * {@inheritdoc}
     */
    async process(data, context) {
        Object.keys(data).filter(key => !(key in this.schema))
            .forEach(key => this.warn(new Data.Error.Ignored([...this.path, key])));
        const result = {};
        this.result = Data.Util.set(this.result, this.path, result);
        for (const key of Object.keys(this.schema)) {
            result[key] = await this.getHandler(key).validate(data[key], context);
        }
        data = result;
        if (this.reduce && Object.values(result).every(value => null === value)
            && !await this.isRequired(context)) {
            data = await this.getDefault(context);
        }
        return super.process(data, context);
    }
    /**
     * Returns data handler.
     */
    getHandler(key) {
        return this.initHandler(this.schema[key], [...this.path, key]);
    }
}
exports.Handler = Handler;
function conf(config) { return Object.assign(Object.assign({}, config), { Handler }); }
exports.conf = conf;
function init(config) { return new Handler({ config }); }
exports.init = init;
