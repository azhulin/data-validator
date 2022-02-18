import * as Data from ".."

type Type = Record<string, any>

export namespace $Object {
  export type Config<T = Type> = Data.Config<T> & {
    schema: Data.Schema
    reduce?: boolean
  }
}

/**
 * The object data handler class.
 */
export class $Object<T = Type> extends Data.Handler<T> {

  /**
   * {@inheritdoc}
   */
  public get id(): string { return "object" }

  /**
   * {@inheritdoc}
   */
  public get name(): string { return "Object" }

  /**
   * The schema.
   */
  protected schema: Data.Schema = {}

  /**
   * The prepared schema.
   */
  protected get preparedSchema(): Data.Schema {
    return this._preparedSchema ?? (this._preparedSchema = this.prepareSchema())
  }
  private _preparedSchema?: Data.Schema

  /**
   * Whether to use default value, if all schema keys are optional and equal to Null.
   */
  protected reduce: boolean = false

  /**
   * {@inheritdoc}
   */
  public constructor(settings: Data.Settings<T>) {
    super(settings)
    const config = (settings.config ?? {}) as $Object.Config<T>
    this.schema = config.schema ?? this.schema
    this.reduce = config.reduce ?? this.reduce
  }

  /**
   * Prepares the schema.
   */
  protected prepareSchema(): Data.Schema {
    return this.schema
  }

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return Data.isObject(data)
  }

  /**
   * {@inheritdoc}
   */
  protected async process(data: Type, context: Data.Context<T>): Promise<T> {
    Object.keys(data).filter(key => !(key in this.preparedSchema))
      .forEach(key => this.warn(new Data.ErrorIgnored([...this.path, key])))
    const result: Type = {}
    this.result = Data.set(this.result, this.path, result)
    for (const key of Object.keys(this.preparedSchema)) {
      result[key] = await this.getHandler(key).validate(data[key], context)
    }
    data = result
    if (this.reduce && Object.values(result).every(value => null === value)
        && !await this.isRequired(context)) {
      data = await this.getDefault(context)
    }
    return super.process(data, context)
  }

  /**
   * Returns data handler.
   */
  protected getHandler(key: string): Data.Handler {
    return this.initHandler(this.preparedSchema[key], [...this.path, key])
  }

  /**
   * Configures the data handler.
   */
  public static conf(config?: $Object.Config): Data.Definition {
    return [$Object, config]
  }

  /**
   * Initializes the data handler.
   */
  public static init<T = Type>(config?: $Object.Config<T>): $Object<T> {
    return new $Object<T>({ config })
  }

}
