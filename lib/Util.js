"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathToField = exports.fieldToPath = exports.pathResolve = exports.set = exports.extract = exports.isIndex = exports.isNumber = exports.isObject = exports.isString = void 0;
const ErrorDataUnexpected_1 = require("./error/ErrorDataUnexpected");
/**
 * Determines whether the value is a string.
 */
exports.isString = (value) => "string" === typeof value;
/**
 * Determines whether the value is an object.
 */
exports.isObject = (value) => value && "object" === typeof value && Object === value.constructor;
/**
 * Determines whether the value is a number.
 */
exports.isNumber = (value) => "number" === typeof value && isFinite(value);
/**
 * Determines whether the value is an index.
 */
exports.isIndex = (value) => Number.isInteger(value) && 0 <= value;
/**
 * Extracts a value from data by field or path.
 */
exports.extract = (data, field, fallback = undefined) => {
    const path = "string" === typeof field ? exports.fieldToPath(field) : [...field];
    let value = data;
    for (const key of path) {
        if ("string" === typeof key && !exports.isObject(value)
            || exports.isIndex(key) && !Array.isArray(value)
            || !(key in value)) {
            return fallback;
        }
        value = value[key];
    }
    return value;
};
/**
 * Sets data value by field or path.
 */
exports.set = (data, ...fields) => {
    while (fields.length) {
        const [field, item] = fields.splice(0, 2);
        const path = "string" === typeof field ? exports.fieldToPath(field) : [...field];
        if (!path.length) {
            data = item;
            continue;
        }
        const last = path.pop();
        let value = data;
        for (const key of path) {
            if ("string" === typeof key && !exports.isObject(value)
                || exports.isIndex(key) && !Array.isArray(value)
                || !(key in value)) {
                throw new ErrorDataUnexpected_1.default("Can not set data, because specified path does not exist.");
            }
            value = value[key];
        }
        if ("string" === typeof last && !exports.isObject(value)
            || exports.isIndex(last) && !Array.isArray(value)) {
            throw new ErrorDataUnexpected_1.default("Can not set data, because value at specified path is invalid.");
        }
        undefined === item ? delete value[last] : value[last] = item;
    }
    return data;
};
/**
 * Returns the modified path.
 */
exports.pathResolve = (path, field = "") => {
    var _a;
    if ("*" === field) {
        return [];
    }
    const regexp = /^\^([0-9]+)?/;
    const match = field.match(regexp);
    const up = match ? +((_a = match[1]) !== null && _a !== void 0 ? _a : 1) : 0;
    field = field.replace(regexp, "");
    if (up > path.length) {
        throw new ErrorDataUnexpected_1.default("Unable to resolve the path, because specified offset is out of bounds.");
    }
    return [
        ...path.slice(0, up ? -up : undefined),
        ...exports.fieldToPath(field),
    ];
};
/**
 * Converts a string to a data path.
 */
exports.fieldToPath = (field) => {
    if (!field) {
        return [];
    }
    if (!field.match(/^((\.([0-9a-z]+_?)*[0-9a-z])|(\[[0-9]+\]))+$/)) {
        throw new ErrorDataUnexpected_1.default(`Unable to convert field to path, because specified field '${field}' is invalid.`);
    }
    return field.split(/(\.[^.\[]+|\[[^\]]+\])/).filter(item => item)
        .map(item => "." === item[0] ? item.substr(1) : +item.substr(1, 1));
};
/**
 * Converts a data path to a string.
 */
exports.pathToField = (path) => path.map(item => "string" === typeof item ? `.${item}` : `[${item}]`).join("");
