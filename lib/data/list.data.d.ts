import * as Data from "..";
export declare type Config = Data.Config & {
    item: Data.Definition;
};
/**
 * The list data handler class.
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
    protected constraintLibrary: Data.Constraint.Library;
    /**
     * The list item definition.
     */
    protected item: Data.Definition;
    /**
     * The list item type ID.
     */
    protected typeId: string;
    /**
     * The list item type name.
     */
    protected typeName: string;
    /**
     * {@inheritdoc}
     */
    constructor(settings: Data.Settings);
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
    /**
     * {@inheritdoc}
     */
    protected checkConstraint(constraint: string, data: unknown[], context: Data.Context): Promise<Data.Constraint.Result>;
    /**
     * {@inheritdoc}
     */
    protected process(data: unknown[], context: Data.Context): Promise<unknown[]>;
    /**
     * Returns data handler.
     */
    protected getHandler(index?: number): Data.Handler;
}
export declare function conf(config: Config): {
    Handler: typeof Data.$List.Handler;
    input?: Data.Property<boolean, Data.Context> | undefined;
    require?: Data.Property<boolean, Data.Context> | undefined;
    default?: Partial<Data.Default> | undefined;
    preparers?: Data.Processor[] | undefined;
    preprocessors?: Data.Processor[] | undefined;
    constraints?: Data.Constraint[] | undefined;
    /**
     * {@inheritdoc}
     */
    postprocessors?: Data.Processor[] | undefined;
    item: Data.Definition;
};
export declare function init(config: Config): Data.$List.Handler;
