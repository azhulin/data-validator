import * as Data from "..";
declare type Type = Record<string, any>;
export declare namespace $Object {
    type Config<T = Type> = Data.Config<T> & {
        schema: Data.Schema;
        reduce?: boolean;
    };
}
/**
 * The object data handler class.
 */
export declare class $Object<T = Type> extends Data.Handler<T> {
    /**
     * {@inheritdoc}
     */
    get id(): string;
    /**
     * {@inheritdoc}
     */
    get name(): string;
    /**
     * The schema.
     */
    protected schema: Data.Schema;
    /**
     * The prepared schema.
     */
    protected get preparedSchema(): Data.Schema;
    private _preparedSchema?;
    /**
     * Whether to use default value, if all schema keys are optional and equal to Null.
     */
    protected reduce: boolean;
    /**
     * {@inheritdoc}
     */
    constructor(settings: Data.Settings<T>);
    /**
     * Prepares the schema.
     */
    protected prepareSchema(): Data.Schema;
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
    /**
     * {@inheritdoc}
     */
    protected process(data: Type, context: Data.Context<T>): Promise<T>;
    /**
     * Returns data handler.
     */
    protected getHandler(key: string): Data.Handler;
    /**
     * Configures the data handler.
     */
    static conf(config?: $Object.Config): Data.Definition;
    /**
     * Initializes the data handler.
     */
    static init<T = Type>(config?: $Object.Config<T>): $Object<T>;
}
export {};
