import * as Data from ".."

type Type = any[]

export namespace $List {
  export type Config<T extends Type = Type> = Data.Config<T> & {
    item: Data.Definition
  }
}

/**
 * The list data handler class.
 */
export class $List<T extends Type = Type> extends Data.Handler<T> {

  /**
   * {@inheritdoc}
   */
  public get id(): string { return `array<${this.typeId}>` }

  /**
   * {@inheritdoc}
   */
  public get name(): string { return `${this.typeName} array` }

  /**
   * {@inheritdoc}
   */
  protected default: Data.Default<T> = {
    ...this.default,
    value: (this.default.value ?? []) as T,
  }

  /**
   * {@inheritdoc}
   */
  public static constraint = {
    ...Data.Handler.constraint,
    length: {
      eq: (length: number): Data.Constraint<Type> => [
        `length=${length}`,
        data => data.length === length ? null : `Length should be equal to ${length}.`,
      ],
      gt: (length: number): Data.Constraint<Type> => [
        `length>${length}`,
        data => data.length > length ? null : `Length should be greater than ${length}.`,
      ],
      gte: (length: number): Data.Constraint<Type> => [
        `length>=${length}`,
        data => data.length >= length ? null : `Length should be greater than or equal to ${length}.`,
      ],
      lt: (length: number): Data.Constraint<Type> => [
        `length<${length}`,
        data => data.length < length ? null : `Length should be lesser than ${length}.`,
      ],
      lte: (length: number): Data.Constraint<Type> => [
        `length<=${length}`,
        data => data.length <= length ? null : `Length should be lesser than or equal to ${length}.`,
      ],
      neq: (length: number): Data.Constraint<Type> => [
        `length<>${length}`,
        data => data.length !== length ? null : `Length should not be equal to ${length}.`,
      ],
    },
    unique: <Data.Constraint<Type>>[
      "unique",
      data => {
        const items = new Set()
        for (const [index, item] of data.map(i => JSON.stringify(i)).entries()) {
          if (items.has(item)) {
            return [`Values are not unique.`, { index }]
          }
          items.add(item)
        }
        return null
      }
    ],
  }

  /**
   * The list item definition.
   */
  protected item: Data.Definition

  /**
   * The list item type ID.
   */
  protected typeId: string

  /**
   * The list item type name.
   */
  protected typeName: string

  /**
   * {@inheritdoc}
   */
  public constructor(settings: Data.Settings<T>) {
    super(settings)
    const config = (settings.config ?? {}) as $List.Config
    if (!config.item) {
      throw new Data.ErrorUnexpected(`List configuration is invalid. Missing 'item' property.`)
    }
    this.item = config.item
    const { id, name } = this.getHandler()
    this.typeId = id
    this.typeName = name
  }

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return Array.isArray(data)
  }

  /**
   * {@inheritdoc}
   */
  protected async process(data: unknown[], context: Data.Context<T>): Promise<T> {
    const result: unknown[] = []
    this.result = Data.set(this.result, this.path, result) as T
    for (const [index, item] of data.entries()) {
      result[index] = await this.getHandler(index).validate(item, context)
    }
    return super.process(result, context)
  }

  /**
   * Returns data handler.
   */
  protected getHandler(index?: number): Data.Handler {
    return this.initHandler(this.item, [...this.path, index ?? "#"])
  }

  /**
   * Configures the data handler.
   */
  public static conf(config?: $List.Config): Data.Definition {
    return [$List, config]
  }

  /**
   * Initializes the data handler.
   */
  public static init<T extends Type = Type>(config?: $List.Config<T>): $List<T> {
    return new $List<T>({ config })
  }

}
