import * as Data from "..";
declare type Type = number | string;
export declare namespace $Option {
    type Config<T extends Type = Type> = Data.Config<T> & {
        key_type?: KeyType;
        options?: Options;
    };
    type KeyType = "number" | "string";
    type Keys<T = Type> = T[];
    type KeysLabelsNumber = Map<number, string>;
    type KeysLabelsString = Record<string, string>;
    type Options = Keys | KeysLabelsNumber | KeysLabelsString;
}
/**
 * The option data handler class.
 */
export declare class $Option<T extends Type = Type> extends Data.Handler<T> {
    /**
     * {@inheritdoc}
     */
    get id(): string;
    /**
     * {@inheritdoc}
     */
    get name(): string;
    /**
     * The options.
     */
    protected options: $Option.Options;
    /**
     * The type of option keys.
     */
    protected keyType: $Option.KeyType;
    /**
     * {@inheritdoc}
     */
    constructor(settings: Data.Settings<T>);
    /**
     * {@inheritdoc}
     */
    validate(data: unknown, baseContext?: Data.BaseContext<T>): Promise<T>;
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
    /**
     * Determines whether the option key type is valid.
     */
    protected isValidKeyType(key: unknown): boolean;
    /**
     * Returns option keys.
     */
    protected optionKeys(): T[];
    /**
     * Returns option keys.
     */
    static optionKeys(options: $Option.Options): $Option.Keys;
    /**
     * Configures the data handler.
     */
    static conf(config?: $Option.Config): Data.Definition;
    /**
     * Initializes the data handler.
     */
    static init<T extends Type = Type>(config?: $Option.Config<T>): $Option<T>;
}
export {};
