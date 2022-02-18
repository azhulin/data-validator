import * as Data from "..";
export declare namespace $Number {
    type Config<T = number> = Data.Config<T> & {
        decimals?: number;
    };
}
/**
 * The number data handler class.
 */
export declare class $Number<T = number> extends Data.Handler<T> {
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
    get description(): string;
    /**
     * The number of decimal points.
     */
    protected decimals: null | number;
    /**
     * {@inheritdoc}
     */
    static constraint: {
        eq: (value: number) => Data.Constraint<number>;
        gt: (value: number) => Data.Constraint<number>;
        gte: (value: number) => Data.Constraint<number>;
        lt: (value: number) => Data.Constraint<number>;
        lte: (value: number) => Data.Constraint<number>;
        neq: (value: number) => Data.Constraint<number>;
    };
    /**
     * {@inheritdoc}
     */
    constructor(settings: Data.Settings<T>);
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
    /**
     * {@inheritdoc}
     */
    protected process(data: number, context: Data.Context<T>): Promise<T>;
    /**
     * Configures the data handler.
     */
    static conf(config?: $Number.Config): Data.Definition;
    /**
     * Initializes the data handler.
     */
    static init(config?: $Number.Config): $Number;
}
