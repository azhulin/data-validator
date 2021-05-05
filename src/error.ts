import ErrorData from "./error/ErrorData"
import ErrorDataAdapted from "./error/ErrorDataAdapted"
import ErrorDataConstraint from "./error/ErrorDataConstraint"
import ErrorDataEmpty from "./error/ErrorDataEmpty"
import ErrorDataIgnored from "./error/ErrorDataIgnored"
import ErrorDataInternal from "./error/ErrorDataInternal"
import ErrorDataOption from "./error/ErrorDataOption"
import ErrorDataRequired from "./error/ErrorDataRequired"
import ErrorDataType from "./error/ErrorDataType"

export default {
  Base: ErrorData,
  Adapted: ErrorDataAdapted,
  Constraint: ErrorDataConstraint,
  Empty: ErrorDataEmpty,
  Ignored: ErrorDataIgnored,
  Option: ErrorDataOption,
  Required: ErrorDataRequired,
  Type: ErrorDataType,
  Internal: ErrorDataInternal,
}
