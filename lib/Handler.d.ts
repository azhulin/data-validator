import type { BaseContext, Constraint, Context, Default, Definition, Path, Processor, Property, Settings } from "./type";
import Operation from "./Operation";
/**
 * The data validator class.
 */
export default abstract class Handler {
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
     * The default data.
     */
    protected default: Default;
    /**
     * Whether to accept the data from input.
     */
    protected input: Property<boolean, Context>;
    /**
     * Whether the data is required.
     */
    protected require: Property<boolean, Context>;
    /**
     * An array of data preprocessors.
     */
    protected preprocessors: Processor[];
    /**
     * An array of data constraints.
     */
    protected constraints: Constraint[];
    /**
     * An array of data postprocessors.
     */
    protected postprocessors: Processor[];
    /**
     * Custom preprocessors, constraints, postprocessors.
     */
    protected custom: {
        preprocessors?: Processor[];
        constraints?: Constraint[];
        postprocessors?: Processor[];
    };
    /**
     * A map of available data constraints.
     */
    protected constraintLibrary: Constraint.Library;
    /**
     * A map of available data processors.
     */
    protected processorLibrary: Processor.Library;
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
    constructor({ config, path, source, result, storage, warnings }: Settings);
    /**
     * Resets the handler state.
     */
    protected reset(data: unknown): void;
    /**
     * Returns validated data.
     */
    validate(data: unknown, baseContext?: BaseContext): Promise<unknown>;
    /**
     * Returns the context.
     */
    protected getContext(context?: BaseContext): Promise<Context>;
    /**
     * Determines whether the data is valid.
     */
    protected isValid(data: unknown): boolean;
    /**
     * Processes the data.
     */
    protected process(data: unknown, context: Context): Promise<unknown>;
    /**
     * Runs data preprocessors.
     */
    protected preprocess(data: unknown, context: Context): Promise<unknown>;
    /**
     * Runs data postprocessors.
     */
    protected postprocess(data: unknown, context: Context): Promise<unknown>;
    /**
     * Runs processors on the data.
     */
    protected run(type: "preprocessors" | "postprocessors", data: unknown, context: Context): Promise<unknown>;
    /**
     * Checks data constraints.
     */
    protected checkConstraints(data: unknown, context: Context): Promise<void>;
    /**
     * Checks a data constraint.
     */
    protected checkConstraint(constraint: string, data: unknown, context: Context): Promise<Constraint.Result>;
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
    protected isInputable(context: Context): Promise<boolean>;
    /**
     * Returns "require" flag value.
     */
    protected isRequired(context: Context): Promise<boolean>;
    /**
     * Returns the action-based default value.
     */
    protected getDefault(context: Context, action?: Operation | "nulled"): Promise<unknown>;
    /**
     * Returns data handler dynamic context property value.
     */
    protected getProperty<T = unknown>(key: string, context: Context): Promise<T>;
    /**
     * Returns dynamic context property value.
     */
    protected getValue<T = unknown, C = Context>(property: Property<T, C>, context: C): Promise<T>;
    /**
     * Returns the data handler for specified data definition.
     */
    protected initHandler(definition: Definition, path: Path): Handler;
    /**
     * Adds a warning.
     */
    protected warn(error: Error): void;
}
