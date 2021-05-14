import * as Data from "..";
export declare type Config = Data.Config;
/**
 * The string data handler class.
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
    protected constraintLibrary: Data.Constraint.Library;
    /**
     * {@inheritdoc}
     */
    protected processorLibrary: Data.Processor.Library;
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
    /**
     * {@inheritdoc}
     */
    protected process(data: string, context: Data.Context): Promise<string>;
    /**
     * {@inheritdoc}
     */
    protected checkConstraint(constraint: string, data: string, context: Data.Context): Promise<Data.Constraint.Result>;
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
