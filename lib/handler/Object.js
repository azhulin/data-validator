"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const Data = require("..");
/**
 * The object data handler class.
 */
class ObjectHandler extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(settings) {
        var _a, _b, _c;
        super(settings);
        /**
         * {@inheritdoc}
         */
        this.id = "object";
        /**
         * {@inheritdoc}
         */
        this.name = "Object";
        /**
         * The raw schema.
         */
        this.schemaRaw = {};
        /**
         * Whether to use default value, if all schema keys are optional and equal to Null.
         */
        this.reduce = false;
        const config = (_a = settings.config) !== null && _a !== void 0 ? _a : {};
        this.schemaRaw = (_b = config.schema) !== null && _b !== void 0 ? _b : this.schemaRaw;
        this.reduce = (_c = config.reduce) !== null && _c !== void 0 ? _c : this.reduce;
    }
    /**
     * The schema.
     */
    get schema() {
        var _a;
        return (_a = this._schema) !== null && _a !== void 0 ? _a : (this._schema = this.prepareSchema());
    }
    /**
     * Prepares the schema.
     */
    prepareSchema() {
        return this.schemaRaw;
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
exports.default = ObjectHandler;
exports.Handler = ObjectHandler;
