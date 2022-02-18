import * as Data from ".."

export namespace $Timestamp {
  export type Config<T = number> = Data.Config<T>
}

/**
 * The timestamp data handler class.
 */
export class $Timestamp<T = number> extends Data.Handler<T> {

  /**
   * {@inheritdoc}
   */
  public get id(): string { return "number.timestamp" }

  /**
   * {@inheritdoc}
   */
  public get name(): string { return "Timestamp" }

  /**
   * {@inheritdoc}
   */
  public get description(): string { return `e.g. ${+new Date()}` }

  /**
   * {@inheritdoc}
   */
  public static constraint = {
    ...Data.Handler.constraint,
    future: <Data.Constraint<number>>[
      ">now",
      data => data > +new Date() ? null : "Future date expected.",
    ],
    past: <Data.Constraint<number>>[
      "<now",
      data => data < +new Date() ? null : "Past date expected.",
    ],
  }

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return Data.isIndex(data)
  }

  /**
   * Configures the data handler.
   */
  public static conf(config?: $Timestamp.Config): Data.Definition {
    return [$Timestamp, config]
  }

  /**
   * Initializes the data handler.
   */
  public static init(config?: $Timestamp.Config): $Timestamp {
    return new $Timestamp({ config })
  }

}
