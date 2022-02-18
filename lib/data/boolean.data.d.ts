import * as Data from "..";
export declare namespace $Boolean {
    type Config<T = boolean> = Data.Config<T>;
}
/**
 * The boolean data handler class.
 */
export declare class $Boolean<T = boolean> extends Data.Handler<T> {
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
    protected isValid(data: unknown): boolean;
    /**
     * Configures the data handler.
     */
    static conf(config?: $Boolean.Config): Data.Definition;
    /**
     * Initializes the data handler.
     */
    static init(config?: $Boolean.Config): $Boolean;
}
