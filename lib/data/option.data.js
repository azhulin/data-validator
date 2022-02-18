"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Option = void 0;
const Data = require("..");
/**
 * The option data handler class.
 */
class $Option extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(settings) {
        var _a, _b, _c;
        super(settings);
        /**
         * The options.
         */
        this.options = [];
        /**
         * The type of option keys.
         */
        this.keyType = "string";
        const config = ((_a = settings.config) !== null && _a !== void 0 ? _a : {});
        this.keyType = (_b = config.key_type) !== null && _b !== void 0 ? _b : this.keyType;
        this.options = (_c = config.options) !== null && _c !== void 0 ? _c : this.options;
        if (!this.optionKeys().every(key => this.isValidKeyType(key))) {
            throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Option keys don't match key type.`);
        }
    }
    /**
     * {@inheritdoc}
     */
    get id() { return this.keyType; }
    /**
     * {@inheritdoc}
     */
    get name() {
        return "string" === this.keyType ? "String" : "Number";
    }
    /**
     * {@inheritdoc}
     */
    async validate(data, baseContext) {
        try {
            return await super.validate(data, baseContext);
        }
        catch (error) {
            if (error instanceof Data.ErrorType) {
                throw new Data.ErrorOption(this.path, this, this.options);
            }
            throw error;
        }
    }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return this.isValidKeyType(data) && this.optionKeys().includes(data);
    }
    /**
     * Determines whether the option key type is valid.
     */
    isValidKeyType(key) {
        switch (this.keyType) {
            case "number":
                return "number" === typeof key && isFinite(key);
            case "string":
                return "string" === typeof key;
        }
    }
    /**
     * Returns option keys.
     */
    optionKeys() {
        return $Option.optionKeys(this.options);
    }
    /**
     * Returns option keys.
     */
    static optionKeys(options) {
        return Array.isArray(options)
            ? options
            : options instanceof Map
                ? [...options.keys()]
                : Object.keys(options);
    }
    /**
     * Configures the data handler.
     */
    static conf(config) {
        return [$Option, config];
    }
    /**
     * Initializes the data handler.
     */
    static init(config) {
        return new $Option({ config });
    }
}
exports.$Option = $Option;
