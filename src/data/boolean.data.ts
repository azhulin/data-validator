import * as Data from ".."

export namespace $Boolean {
  export type Config<T = boolean> = Data.Config<T>
}

/**
 * The boolean data handler class.
 */
export class $Boolean<T = boolean> extends Data.Handler<T> {

  /**
   * {@inheritdoc}
   */
  public get id(): string { return "boolean" }

  /**
   * {@inheritdoc}
   */
  public get name(): string { return "Boolean" }

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return "boolean" === typeof data
  }

  /**
   * Configures the data handler.
   */
  public static conf(config?: $Boolean.Config): Data.Definition {
    return [$Boolean, config]
  }

  /**
   * Initializes the data handler.
   */
  public static init(config?: $Boolean.Config): $Boolean {
    return new $Boolean({ config })
  }

}
