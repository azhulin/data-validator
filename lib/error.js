"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorData_1 = require("./error/ErrorData");
const ErrorDataAdapted_1 = require("./error/ErrorDataAdapted");
const ErrorDataConstraint_1 = require("./error/ErrorDataConstraint");
const ErrorDataEmpty_1 = require("./error/ErrorDataEmpty");
const ErrorDataIgnored_1 = require("./error/ErrorDataIgnored");
const ErrorDataInternal_1 = require("./error/ErrorDataInternal");
const ErrorDataOption_1 = require("./error/ErrorDataOption");
const ErrorDataRequired_1 = require("./error/ErrorDataRequired");
const ErrorDataType_1 = require("./error/ErrorDataType");
exports.default = {
    Base: ErrorData_1.default,
    Adapted: ErrorDataAdapted_1.default,
    Constraint: ErrorDataConstraint_1.default,
    Empty: ErrorDataEmpty_1.default,
    Ignored: ErrorDataIgnored_1.default,
    Option: ErrorDataOption_1.default,
    Required: ErrorDataRequired_1.default,
    Type: ErrorDataType_1.default,
    Internal: ErrorDataInternal_1.default,
};
