import * as Data from "..";
export declare namespace $String {
    type Config<T = string> = Data.Config<T>;
}
/**
 * The string data handler class.
 */
export declare class $String<T = string> extends Data.Handler<T> {
    /**
     * {@inheritdoc}
     */
    get id(): string;
    /**
     * {@inheritdoc}
     */
    get name(): string;
    /**
     * {@inheritdoc}
     */
    static constraint: {
        trimmed: Data.Constraint<string>;
        length: {
            eq: (length: number) => Data.Constraint<string>;
            gt: (length: number) => Data.Constraint<string>;
            gte: (length: number) => Data.Constraint<string>;
            lt: (length: number) => Data.Constraint<string>;
            lte: (length: number) => Data.Constraint<string>;
            neq: (length: number) => Data.Constraint<string>;
        };
    };
    /**
     * {@inheritdoc}
     */
    static processor: {
        trim: (data: string) => string;
        lower: (data: string) => string;
        upper: (data: string) => string;
    };
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
    /**
     * {@inheritdoc}
     */
    protected process(data: T, context: Data.Context<T>): Promise<T>;
    /**
     * Configures the data handler.
     */
    static conf(config?: $String.Config): Data.Definition;
    /**
     * Initializes the data handler.
     */
    static init(config?: $String.Config): $String;
}
