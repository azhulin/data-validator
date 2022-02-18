import * as Data from "..";
import { $Number } from ".";
export declare namespace $Integer {
    type Config<T = number> = Data.Config<T>;
}
/**
 * The integer data handler class.
 */
export declare class $Integer<T = number> extends $Number<T> {
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
    protected decimals: null | number;
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
    /**
     * Configures the data handler.
     */
    static conf(config?: $Integer.Config): Data.Definition;
    /**
     * Initializes the data handler.
     */
    static init(config?: $Integer.Config): $Integer;
}
