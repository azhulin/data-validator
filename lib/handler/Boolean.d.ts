import * as Data from "..";
export declare type Config = Data.Config;
/**
 * The boolean data handler class.
 */
export declare class Handler extends Data.Handler {
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
    protected default: Data.Default;
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
}
export declare function conf(config?: Config): {
    input?: Data.Property<boolean, Data.Context>;
    require?: Data.Property<boolean, Data.Context>;
    default?: Partial<Data.Default>;
    preprocessors?: Data.Processor[];
    constraints?: Data.Constraint[];
    postprocessors?: Data.Processor[];
    Handler: typeof Handler;
};
export declare function init(config?: Config): Handler;
