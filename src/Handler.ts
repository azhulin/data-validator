import type PluginManager from "@azhulin/plugin-manager"
import type {
  BaseContext, Config, Constraint, Context, Default,
  Definition, Path, Processor, Property, Settings,
} from "./type"
import Operation from "./Operation"
import * as Util from "./Util"
import ErrorDataConstraint from "./error/ErrorDataConstraint"
import ErrorDataEmpty from "./error/ErrorDataEmpty"
import ErrorDataIgnored from "./error/ErrorDataIgnored"
import ErrorDataInternal from "./error/ErrorDataInternal"
import ErrorDataRequired from "./error/ErrorDataRequired"
import ErrorDataType from "./error/ErrorDataType"

/**
 * The data validator class.
 */
export default abstract class Handler {

  /**
   * The user-faced ID of the data type.
   */
  public abstract id: string

  /**
   * The name of the data type.
   */
  public abstract name: string

  /**
   * The description of the data type.
   */
  public description?: string

  /**
   * The default data.
   */
  protected default: Default = {
    value: null,
    create: context => this.getValue(context.default.value, context),
    update: context => context.original() as any ?? context.default.value,
    integrate: context => this.getValue(context.default.update, context),
    nulled: context => this.getValue(context.default.create, context),
  }

  /**
   * [!] Whether to accept the input data.
   */
  protected accept: Property<boolean, Context> = true

  /**
   * [?] Whether the data is required.
   */
  protected require: Property<boolean, Context> = true

  /**
   * Data type modifiers.
   */
  protected static modifiers: Record<string, (config: Config) => void> = {
    "!": config => config.accept = false,
    "?": config => config.require = false,
  }

  /**
   * An array of data preprocessors.
   */
  protected preprocessors: Processor[] = []

  /**
   * An array of data constraints.
   */
  protected constraints: Constraint[] = []

  /**
   * An array of data postprocessors.
   */
  protected postprocessors: Processor[] = []

  /**
   * Custom preprocessors, constraints, postprocessors.
   */
  protected custom: {
    preprocessors?: Processor[]
    constraints?: Constraint[]
    postprocessors?: Processor[]
  } = {}

  /**
   * A map of available data constraints.
   */
  protected constraintLibrary: Constraint.Library = {}

  /**
   * A map of available data processors.
   */
  protected processorLibrary: Processor.Library = {}

  /**
   * The path of the data in the data tree.
   */
  protected path: Path = []

  /**
   * Source data.
   */
  protected source: unknown

  /**
   * Currently processed data.
   */
  protected result: unknown

  /**
   * Intermediate data storage.
   */
  protected storage: Record<string, unknown> = {}

  /**
   * An array of collected during data handling warnings.
   */
  protected warning: Error[] = []

  /**
   * The manager.
   */
  protected manager: PluginManager

  /**
   * Normalizes the data definition.
   */
  public static definitionNormalize(type: string | Definition, config?: Config): Definition {
    ({ type, ...config } = "string" === typeof type ? { type, ...config ?? {} } : type)
    while (this.modifiers[type[0]]) {
      this.modifiers[type[0]](config)
      type = type.substring(1)
    }
    return { type, ...config }
  }

  /**
   * Constructor for the Handler object.
   */
  public constructor(settings: Settings) {
    const config = settings.config ?? {}
    this.accept = config.accept ?? this.accept
    this.require = config.require ?? this.require
    this.default = { ...this.default, ...config.default }
    this.custom.preprocessors = [
      ...this.custom.preprocessors ?? [],
      ...config.preprocessors ?? [],
    ]
    this.custom.constraints = [
      ...this.custom.constraints ?? [],
      ...config.constraints ?? [],
    ]
    this.custom.postprocessors = [
      ...this.custom.postprocessors ?? [],
      ...config.postprocessors ?? [],
    ]
    const { path, source, result, storage, warning, manager } = settings
    this.path = path ?? this.path
    this.source = source
    this.result = result
    this.storage = storage ?? this.storage
    this.warning = warning ?? this.warning
    this.manager = manager
  }

  /**
   * Resets the handler state.
   */
  protected reset(): void {
    this.source = undefined
    this.result = undefined
    this.storage = {}
    this.warning = []
  }

  /**
   * Returns validated data.
   */
  public async validate(data: unknown, baseContext?: BaseContext): Promise<unknown> {
    this.isRoot() && this.reset()
    const context = this.getContext(baseContext)
    undefined === this.source && (this.source = data)
    if (!await this.isAcceptable(context)) {
      !this.isOmitted(data) && this.inSource()
        && this.warn(new ErrorDataIgnored(this.path))
      data = await this.getDefault(context)
    }
    else if (this.isOmitted(data)) {
      const required = await this.isRequired(context)
      if (required && !context.update) {
        throw new ErrorDataRequired(this.path)
      }
      data = await this.getDefault(context)
      if (required && this.isEmpty(data)) {
        throw new ErrorDataRequired(this.path)
      }
    }
    else if (this.isEmpty(data)) {
      if (await this.isRequired(context)) {
        throw new ErrorDataEmpty(this.path)
      }
      data = await this.getDefault(context, "nulled")
    }
    if (!this.isEmpty(data) && !this.isOmitted(data)) {
      if (!this.isValid(data)) {
        throw new ErrorDataType(this.path, this)
      }
      data = await this.process(data, context)
    }
    return data
  }

  /**
   * Returns the context.
   */
  protected getContext(context?: BaseContext): Context {
    const { create, update, integrate } = Operation
    const { operation = create, data } = context ?? {}
    if ([update, integrate].includes(operation) && !data) {
      throw new ErrorDataInternal(`Context data is required for the ${operation} operation.`)
    }
    return {
      ...context,
      operation,
      create: false,
      update: false,
      integrate: false,
      [operation]: true,
      default: this.default,
      path: this.path,
      current: field =>
        Util.extract(this.result, Util.pathResolve(this.path, field)),
      original: field =>
        Util.extract(data, Util.pathResolve(this.path, field)),
      storage: (key, value?) =>
        undefined !== value ? this.storage[key] = value : this.storage[key],
    }
  }

  /**
   * Determines whether the data is valid.
   */
  protected isValid(data: unknown): boolean {
    return true
  }

  /**
   * Processes the data.
   */
  protected async process(data: unknown, context: Context): Promise<unknown> {
    data = await this.preprocess(data, context)
    await this.checkConstraints(data, context)
    return this.postprocess(data, context)
  }

  /**
   * Runs data preprocessors.
   */
  protected async preprocess(data: unknown, context: Context): Promise<unknown> {
    return this.run("preprocessors", data, context)
  }

  /**
   * Runs data postprocessors.
   */
  protected async postprocess(data: unknown, context: Context): Promise<unknown> {
    return this.run("postprocessors", data, context)
  }

  /**
   * Runs processors on the data.
   */
  protected async run(type: "preprocessors" | "postprocessors", data: unknown, context: Context): Promise<unknown> {
    for (let processor of [...this[type], ...this.custom[type]]) {
      "string" === typeof processor
        && this.processorLibrary[processor]
        && (processor = this.processorLibrary[processor])
      if ("function" !== typeof processor) {
        throw new ErrorDataInternal(`${this.name} processor '${processor}' is invalid.`)
      }
      data = await processor(data, context)
    }
    return data
  }

  /**
   * Checks data constraints.
   */
  protected async checkConstraints(data: unknown, context: Context): Promise<void> {
    const constraints = []
    for (const item of [...this.constraints, ...this.custom.constraints]) {
      constraints.push(..."function" === typeof item ? item(context) : [item])
    }
    for (const item of constraints) {
      const [constraint, func] = ("string" === typeof item ? [item] : item)
      const { update, original } = context
      // Allows to skip constraint validation on update with unchanged value.
      if ("?" === constraint[0] && update && data === original()) {
        continue
      }
      const id = constraint.replace(/^\?/, "")
      const result = func
        ? await func(data, context)
        : this.constraintLibrary[id]
          ? await this.constraintLibrary[id](data, context)
          : await this.checkConstraint(id, data, context)
      if (null !== result) {
        const [message, details] = "string" === typeof result ? [result] : result
        throw new ErrorDataConstraint(message, this.path, this.id, id, details)
      }
    }
  }

  /**
   * Checks a data constraint.
   */
  protected async checkConstraint(constraint: string, data: unknown, context: Context): Promise<Constraint.Result> {
    throw new ErrorDataInternal(`${this.name} constraint '${constraint}' is invalid.`)
  }

  /**
   * Determines whether the value is present in source data.
   */
  protected inSource(): boolean {
    return undefined !== Util.extract(this.source, this.path)
  }

  /**
   * Determines whether this is a root data handler.
   */
  protected isRoot(): boolean {
    return !this.path.length
  }

  /**
   * Determines whether the data was not provided.
   */
  protected isOmitted(data: unknown): boolean {
    return undefined === data
  }

  /**
   * Determines whether the data is empty.
   */
  protected isEmpty(data: unknown): boolean {
    return null === data
  }

  /**
   * Returns "accept" flag value.
   */
  protected async isAcceptable(context: Context): Promise<boolean> {
    return this.getProperty<boolean, Context>("accept", context)
  }

  /**
   * Returns "require" flag value.
   */
  protected async isRequired(context: Context): Promise<boolean> {
    return this.getProperty<boolean, Context>("require", context)
  }

  /**
   * Returns the action-based default value.
   */
  protected async getDefault(context: Context, action?: Operation | "nulled"): Promise<unknown> {
    const property = this.default[action ?? context.operation]
    return this.getValue<unknown | Promise<unknown>, Context>(property, context)
  }

  /**
   * Returns data handler dynamic context property value.
   */
  protected getProperty<T, C>(key: string, context: C): T {
    return this.getValue((this as any)[key] as Property<T, C>, context)
  }

  /**
   * Returns dynamic context property value.
   */
  protected getValue<T, C>(property: Property<T, C>, context: C): T {
    return "function" === typeof property
      ? (property as Property.Dynamic<T, C>)(context)
      : property as Property.Static<T>
  }

  /**
   * Returns the data handler for specified data definition.
   */
  protected initHandler(definition: string | Definition, path: Path): Handler {
    const { type, ...config } = Handler.definitionNormalize(definition)
    const { source, result, storage, warning, manager } = this
    const settings: Settings = {
      config, path, source, result, storage, warning, manager,
    }
    return this.manager.instance(type, settings)
  }

  /**
   * Adds a warning.
   */
  protected warn(error: Error): void {
    this.warning.push(error)
  }

  /**
   * Returns an array of collected during data handling warnings.
   */
  public get warnings(): Error[] {
    return this.warning
  }

}
