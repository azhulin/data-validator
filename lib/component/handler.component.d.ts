import type { BaseContext, Context, Settings } from "../interface";
import type { Constraint, Default, Definition, Path, Processor, Property } from "../type";
/**
 * The base data handler class.
 */
export declare abstract class Handler<T = any> {
    /**
     * The ID of the data type.
     */
    abstract get id(): string;
    /**
     * The name of the data type.
     */
    abstract get name(): string;
    /**
     * The description of the data type.
     */
    get description(): string;
    /**
     * A map of available data constraints.
     */
    static constraint: Constraint.Library<any>;
    /**
     * A map of available data processors.
     */
    static processor: Processor.Library<any>;
    /**
     * The default data.
     */
    protected default: Default<T>;
    /**
     * Whether to accept the data from input.
     */
    protected input: Property<boolean, Context<T>>;
    /**
     * Whether the data is required.
     */
    protected require: Property<boolean, Context<T>>;
    /**
     * An array of data preparers.
     */
    protected preparers: Processor<T>[];
    /**
     * An array of data preprocessors.
     */
    protected preprocessors: Processor<T>[];
    /**
     * An array of data constraints.
     */
    protected constraints: Constraint.List<T>;
    /**
     * An array of data postprocessors.
     */
    protected postprocessors: Processor<T>[];
    /**
     * Custom preparers, preprocessors, constraints, postprocessors.
     */
    protected custom: {
        preparers?: Processor<T>[];
        preprocessors?: Processor<T>[];
        constraints?: Constraint.List<T>;
        postprocessors?: Processor<T>[];
    };
    /**
     * The path of the data in the data tree.
     */
    protected path: Path;
    /**
     * Source data.
     */
    protected source: unknown;
    /**
     * Currently processed data.
     */
    protected result: unknown;
    /**
     * Intermediate data storage.
     */
    protected storage: Record<string, unknown>;
    /**
     * An array of collected during data handling warnings.
     */
    warnings: Error[];
    /**
     * Constructor for the Handler object.
     */
    constructor({ config, path, source, result, storage, warnings }: Settings<T>);
    /**
     * Resets the handler state.
     */
    protected reset(data: unknown): void;
    /**
     * Returns validated data.
     */
    validate(data: unknown, baseContext?: BaseContext<T>): Promise<T>;
    /**
     * Returns the context.
     */
    protected getContext(context?: BaseContext<T>): Promise<Context<T>>;
    /**
     * Determines whether the data is valid.
     */
    protected isValid(data: unknown): boolean;
    /**
     * Prepares the data.
     */
    protected prepare(data: unknown, context: Context<T>): Promise<unknown>;
    /**
     * Processes the data.
     */
    protected process(data: any, context: Context<T>): Promise<T>;
    /**
     * Runs data preprocessors.
     */
    protected preprocess(data: T, context: Context<T>): Promise<T>;
    /**
     * Runs data postprocessors.
     */
    protected postprocess(data: T, context: Context<T>): Promise<T>;
    /**
     * Runs processors on the data.
     */
    protected run(type: "preparers" | "preprocessors" | "postprocessors", data: unknown, context: Context<T>): Promise<T>;
    /**
     * Checks data constraints.
     */
    protected checkConstraints(data: T, context: Context<T>): Promise<void>;
    /**
     * Determines whether the value is present in source data.
     */
    protected inSource(): boolean;
    /**
     * Determines whether this is a root data handler.
     */
    protected isRoot(): boolean;
    /**
     * Determines whether the data was not provided.
     */
    protected isOmitted(data: unknown): boolean;
    /**
     * Determines whether the data is empty.
     */
    protected isEmpty(data: unknown): boolean;
    /**
     * Returns "input" flag value.
     */
    protected isInputable(context: Context<T>): Promise<boolean>;
    /**
     * Returns "require" flag value.
     */
    protected isRequired(context: Context<T>): Promise<boolean>;
    /**
     * Returns the default value based on behavior.
     */
    protected getDefault(context: Context<T>, behavior?: keyof Default<T>): Promise<T>;
    /**
     * Returns data handler dynamic context property value.
     */
    protected getProperty<P = unknown>(key: string, context: Context<T>): Promise<P>;
    /**
     * Returns dynamic context property value.
     */
    protected getValue<P = unknown, C = Context<T>>(property: Property<P, C>, context: C): Promise<P>;
    /**
     * Returns the data handler for specified data definition.
     */
    protected initHandler(definition: Definition, path: Path): Handler;
    /**
     * Adds a warning.
     */
    protected warn(error: Error): void;
}
