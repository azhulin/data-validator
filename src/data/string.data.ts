import * as Data from ".."

export namespace $String {
  export type Config<T = string> = Data.Config<T>
}

/**
 * The string data handler class.
 */
export class $String<T = string> extends Data.Handler<T> {

  /**
   * {@inheritdoc}
   */
  public get id(): string { return "string" }

  /**
   * {@inheritdoc}
   */
  public get name(): string { return "String" }

  /**
   * {@inheritdoc}
   */
  public static constraint = {
    ...Data.Handler.constraint,
    trimmed: <Data.Constraint<string>>[
      "trimmed",
      data => data === data.trim() ? null : "Value should be trimmed.",
    ],
    length: {
      eq: (length: number): Data.Constraint<string> => [
        `length=${length}`,
        data => data.length === length ? null : `Length should be equal to ${length}.`,
      ],
      gt: (length: number): Data.Constraint<string> => [
        `length>${length}`,
        data => data.length > length ? null : `Length should be greater than ${length}.`,
      ],
      gte: (length: number): Data.Constraint<string> => [
        `length>=${length}`,
        data => data.length >= length ? null : `Length should be greater than or equal to ${length}.`,
      ],
      lt: (length: number): Data.Constraint<string> => [
        `length<${length}`,
        data => data.length < length ? null : `Length should be lesser than ${length}.`,
      ],
      lte: (length: number): Data.Constraint<string> => [
        `length<=${length}`,
        data => data.length <= length ? null : `Length should be lesser than or equal to ${length}.`,
      ],
      neq: (length: number): Data.Constraint<string> => [
        `length<>${length}`,
        data => data.length !== length ? null : `Length should not be equal to ${length}.`,
      ],
    },
  }

  /**
   * {@inheritdoc}
   */
  public static processor = {
    ...Data.Handler.processor,
    trim: (data: string) => data.trim(),
    lower: (data: string) => data.toLowerCase(),
    upper: (data: string) => data.toUpperCase(),
  }

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return "string" === typeof data
  }

  /**
   * {@inheritdoc}
   */
  protected async process(data: T, context: Data.Context<T>): Promise<T> {
    const original = data
    data = await super.process(data, context)
    original !== data
      && this.warn(new Data.ErrorAdapted(this.path, original, data))
    return data
  }

  /**
   * Configures the data handler.
   */
  public static conf(config?: $String.Config): Data.Definition {
    return [$String, config]
  }

  /**
   * Initializes the data handler.
   */
  public static init(config?: $String.Config): $String {
    return new $String({ config })
  }

}
