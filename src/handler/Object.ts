import * as Data from ".."

export type Config = Data.Config & {
  schema: Data.Schema
  reduce?: boolean
}
type Struct = Record<string, unknown>

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
  protected get schema(): Data.Schema {
    return this._schema.prepared ?? (this._schema.prepared = this.prepareSchema())
  }
  protected set schema(schema: Data.Schema) { this._schema = { raw: schema } }
  protected _schema: { raw?: Data.Schema, prepared?: Data.Schema } = { raw: {} }

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
    return this._schema.raw
  }

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return Data.Util.isObject(data)
  }

  /**
   * {@inheritdoc}
   */
  protected async process(data: Struct, context: Data.Context): Promise<Struct | null> {
    Object.keys(data).filter(key => !(key in this.schema))
      .forEach(key => this.warn(new Data.Error.Ignored([...this.path, key])))
    const result: Struct = {}
    this.result = Data.Util.set(this.result, this.path, result)
    for (const key of Object.keys(this.schema)) {
      result[key] = await this.getHandler(key).validate(data[key], context)
    }
    data = result
    if (this.reduce && Object.values(result).every(value => null === value)
        && !await this.isRequired(context)) {
      data = await this.getDefault(context) as Struct
    }
    return super.process(data, context) as Promise<Struct | null>
  }

  /**
   * Returns data handler.
   */
  protected getHandler(key: string): Data.Handler {
    return this.initHandler(this.schema[key], [...this.path, key])
  }

}

export function conf(config: Config) { return { ...config, Handler } }
export function init(config: Config) { return new Handler({ config }) }
