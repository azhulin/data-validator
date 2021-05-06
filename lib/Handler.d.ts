import type PluginManager from "@azhulin/plugin-manager";
import type { BaseContext, Config, Constraint, Context, Default, Definition, Path, Processor, Property, Settings } from "./type";
import Operation from "./Operation";
/**
 * The data validator class.
 */
export default abstract class Handler {
    /**
     * The user-faced ID of the data type.
     */
    abstract id: string;
    /**
     * The name of the data type.
     */
    abstract name: string;
    /**
     * The description of the data type.
     */
    description?: string;
    /**
     * The default data.
     */
    protected default: Default;
    /**
     * [!] Whether to accept the input data.
     */
    protected accept: Property<boolean, Context>;
    /**
     * [?] Whether the data is required.
     */
    protected require: Property<boolean, Context>;
    /**
     * Data type modifiers.
     */
    protected static modifiers: Record<string, (config: Config) => void>;
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
    protected warning: Error[];
    /**
     * The manager.
     */
    protected manager: PluginManager;
    /**
     * Normalizes the data definition.
     */
    static definitionNormalize(type: string | Definition, config?: Config): Definition;
    /**
     * Constructor for the Handler object.
     */
    constructor(settings: Settings);
    /**
     * Resets the handler state.
     */
    protected reset(): void;
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
     * Returns "accept" flag value.
     */
    protected isAcceptable(context: Context): Promise<boolean>;
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
    protected getProperty<T, C>(key: string, context: C): T;
    /**
     * Returns dynamic context property value.
     */
    protected getValue<T, C>(property: Property<T, C>, context: C): T;
    /**
     * Returns the data handler for specified data definition.
     */
    protected initHandler(definition: string | Definition, path: Path): Handler;
    /**
     * Adds a warning.
     */
    protected warn(error: Error): void;
    /**
     * Returns an array of collected during data handling warnings.
     */
    get warnings(): Error[];
}
