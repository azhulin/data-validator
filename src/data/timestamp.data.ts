import * as Data from ".."

export type Config = Data.Config

/**
 * The timestamp data handler class.
 */
export class Handler extends Data.Handler {

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
  protected constraintLibrary: Data.Constraint.Library = {
    ...this.constraintLibrary,
    ">now": (data: number) =>
      data > +new Date() ? null : "Future date expected.",
    "<now": (data: number) =>
      data < +new Date() ? null : "Past date expected.",
  }

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return Data.isIndex(data)
  }

}

export function conf(config?: Config) { return { ...config, Handler } }
export function init(config?: Config) { return new Handler({ config }) }
