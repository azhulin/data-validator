import * as Data from ".."
import { $List, $Option } from "."

type Type = (number | string)[]

export namespace $OptionList {
  export type Config<T extends Type = Type> = Data.Config<T> & {
    key_type?: $Option.KeyType
    options?: $Option.Options
    preserve?: boolean
  }
}

/**
 * The option list data handler class.
 */
export class $OptionList<T extends Type = Type> extends $List<T> {

  /**
   * {@inheritdoc}
   */
  protected constraints: Data.Constraint.List = [
    ...this.constraints,
    $List.constraint.unique,
  ]

  /**
   * {@inheritdoc}
   */
  public static processor = {
    ...$List.processor,
    order: <T extends Type>(data: T, { handler }: Data.Context<T>): T => {
      const keys = $Option.optionKeys((<$OptionList>handler).options)
      type Key = typeof keys[0]
      return data.sort((a: Key, b: Key) => keys.indexOf(a) - keys.indexOf(b))
    }
  }

  /**
   * The options.
   */
  protected options: $Option.Options = []

  /**
   * Whether to keep the items order from the input.
   */
  protected preserve: boolean = false

  /**
   * {@inheritdoc}
   */
  public constructor(settings: Data.Settings<T>) {
    super({
      ...settings,
      config: <$List.Config<T>>{
        ...settings.config,
        item: $Option.conf({
          key_type: (settings.config as $Option.Config).key_type,
          options: (settings.config as $Option.Config).options,
        }),
      },
    })
    const config = (settings.config ?? {}) as $OptionList.Config
    this.options = config.options ?? this.options
    this.preserve = config.preserve ?? this.preserve
    this.preserve || this.postprocessors.push($OptionList.processor.order)
  }

  /**
   * Configures the data handler.
   */
  public static conf(config?: $OptionList.Config): Data.Definition {
    return [$OptionList, config]
  }

  /**
   * Initializes the data handler.
   */
  public static init<T extends Type = Type>(config?: $OptionList.Config<T>): $OptionList<T> {
    return new $OptionList<T>({ config })
  }

}
