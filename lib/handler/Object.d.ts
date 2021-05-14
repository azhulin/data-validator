import * as Data from "..";
export declare type Config = Data.Config & {
    schema: Data.Schema;
    reduce?: boolean;
};
declare type Struct = Record<string, unknown>;
/**
 * The object data handler class.
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
     * The schema.
     */
    protected get schema(): Data.Schema;
    protected set schema(schema: Data.Schema);
    protected _schema: {
        raw?: Data.Schema;
        prepared?: Data.Schema;
    };
    /**
     * Whether to use default value, if all schema keys are optional and equal to Null.
     */
    protected reduce: boolean;
    /**
     * {@inheritdoc}
     */
    constructor(settings: Data.Settings);
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
    protected process(data: Struct, context: Data.Context): Promise<Struct | null>;
    /**
     * Returns data handler.
     */
    protected getHandler(key: string): Data.Handler;
}
export declare function conf(config: Config): {
    Handler: typeof Handler;
    input?: Data.Property<boolean, Data.Context>;
    require?: Data.Property<boolean, Data.Context>;
    default?: Partial<Data.Default>;
    preprocessors?: Data.Processor[];
    constraints?: Data.Constraint[];
    postprocessors?: Data.Processor[];
    schema: Record<string, Data.Definition>;
    reduce?: boolean;
};
export declare function init(config: Config): Handler;
export {};
