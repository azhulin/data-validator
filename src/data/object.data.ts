import * as Data from ".."

export type Config = Data.Config & {
  schema: Data.Schema
  reduce?: boolean
}

/**
 * The object data handler class.
 */
export class Handler extends Data.Handler {

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
  public constructor(settings: Data.Settings) {
    super(settings)
    const config = (settings.config ?? {}) as Config
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
  protected async process(data: Record<string, unknown>, context: Data.Context): Promise<Record<string, unknown> | null> {
    Object.keys(data).filter(key => !(key in this.preparedSchema))
      .forEach(key => this.warn(new Data.ErrorIgnored([...this.path, key])))
    const result: Record<string, unknown> = {}
    this.result = Data.set(this.result, this.path, result)
    for (const key of Object.keys(this.preparedSchema)) {
      result[key] = await this.getHandler(key).validate(data[key], context)
    }
    data = result
    if (this.reduce && Object.values(result).every(value => null === value)
        && !await this.isRequired(context)) {
      data = await this.getDefault(context) as Record<string, unknown>
    }
    return super.process(data, context) as Promise<Record<string, unknown> | null>
  }

  /**
   * Returns data handler.
   */
  protected getHandler(key: string): Data.Handler {
    return this.initHandler(this.preparedSchema[key], [...this.path, key])
  }

}

export function conf(config: Config) { return { ...config, Handler } }
export function init(config: Config) { return new Handler({ config }) }
