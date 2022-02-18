import * as Data from ".."

export namespace $Number {
  export type Config<T = number> = Data.Config<T> & {
    decimals?: number
  }
}

/**
 * The number data handler class.
 */
export class $Number<T = number> extends Data.Handler<T> {

  /**
   * {@inheritdoc}
   */
  public get id(): string { return "number" }

  /**
   * {@inheritdoc}
   */
  public get name(): string { return "Number" }

  /**
   * {@inheritdoc}
   */
  public get description(): string {
    switch (this.decimals) {
      case null:
        return ""

      case 1:
        return "1 decimal place"

      default:
        return `${this.decimals} decimal places`
    }
  }

  /**
   * The number of decimal points.
   */
  protected decimals: null | number = null

  /**
   * {@inheritdoc}
   */
  public static constraint = {
    ...Data.Handler.constraint,
    eq: (value: number): Data.Constraint<number> => [
      `=${value}`,
      data => data === value ? null : `Value should be equal to ${value}.`,
    ],
    gt: (value: number): Data.Constraint<number> => [
      `>${value}`,
      data => data > value ? null : `Value should be greater than ${value}.`,
    ],
    gte: (value: number): Data.Constraint<number> => [
      `>=${value}`,
      data => data >= value ? null : `Value should be greater than or equal to ${value}.`,
    ],
    lt: (value: number): Data.Constraint<number> => [
      `<${value}`,
      data => data < value ? null : `Value should be lesser than ${value}.`,
    ],
    lte: (value: number): Data.Constraint<number> => [
      `<=${value}`,
      data => data <= value ? null : `Value should be lesser than or equal to ${value}.`,
    ],
    neq: (value: number): Data.Constraint<number> => [
      `<>${value}`,
      data => data !== value ? null : `Value should not be equal to ${value}.`,
    ],
  }

  /**
   * {@inheritdoc}
   */
  public constructor(settings: Data.Settings<T>) {
    super(settings)
    const config = (settings.config ?? {}) as $Number.Config
    this.decimals = config.decimals ?? this.decimals
    if (null !== this.decimals && !Data.isIndex(this.decimals)) {
      throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Invalid 'decimals' property.`)
    }
  }

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return "number" === typeof data && isFinite(data)
  }

  /**
   * {@inheritdoc}
   */
  protected async process(data: number, context: Data.Context<T>): Promise<T> {
    const original = data
    data = null !== this.decimals ? +data.toFixed(this.decimals) : data
    original !== data
      && this.warn(new Data.ErrorAdapted(this.path, original, data))
    return super.process(data, context)
  }

  /**
   * Configures the data handler.
   */
  public static conf(config?: $Number.Config): Data.Definition {
    return [$Number, config]
  }

  /**
   * Initializes the data handler.
   */
  public static init(config?: $Number.Config): $Number {
    return new $Number({ config })
  }

}
