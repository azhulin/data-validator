import * as Data from ".."
import * as $Number from "./Number"

export type Config = Data.Config

/**
 * The integer data handler class.
 */
export class Handler extends $Number.Handler {

  /**
   * {@inheritdoc}
   */
  public id: string = this.id + ".integer"

  /**
   * {@inheritdoc}
   */
  public name: string = "Integer"

  /**
   * {@inheritdoc}
   */
  public get description(): string { return }

  /**
   * {@inheritdoc}
   */
  protected decimals: number | null = 0

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return super.isValid(data) && Number.isInteger(data)
  }

}

export function conf(config?: Config) { return { Handler, ...config } }
export function init(config?: Config) { return new Handler({ config }) }