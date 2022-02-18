import * as Data from "..";
export declare namespace $Timestamp {
    type Config<T = number> = Data.Config<T>;
}
/**
 * The timestamp data handler class.
 */
export declare class $Timestamp<T = number> extends Data.Handler<T> {
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
     * {@inheritdoc}
     */
    static constraint: {
        future: Data.Constraint<number>;
        past: Data.Constraint<number>;
    };
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
    /**
     * Configures the data handler.
     */
    static conf(config?: $Timestamp.Config): Data.Definition;
    /**
     * Initializes the data handler.
     */
    static init(config?: $Timestamp.Config): $Timestamp;
}
