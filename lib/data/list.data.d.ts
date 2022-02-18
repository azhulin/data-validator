import * as Data from "..";
declare type Type = any[];
export declare namespace $List {
    type Config<T extends Type = Type> = Data.Config<T> & {
        item: Data.Definition;
    };
}
/**
 * The list data handler class.
 */
export declare class $List<T extends Type = Type> extends Data.Handler<T> {
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
    protected default: Data.Default<T>;
    /**
     * {@inheritdoc}
     */
    static constraint: {
        length: {
            eq: (length: number) => Data.Constraint<Type>;
            gt: (length: number) => Data.Constraint<Type>;
            gte: (length: number) => Data.Constraint<Type>;
            lt: (length: number) => Data.Constraint<Type>;
            lte: (length: number) => Data.Constraint<Type>;
            neq: (length: number) => Data.Constraint<Type>;
        };
        unique: Data.Constraint<Type>;
    };
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
    constructor(settings: Data.Settings<T>);
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
    /**
     * {@inheritdoc}
     */
    protected process(data: unknown[], context: Data.Context<T>): Promise<T>;
    /**
     * Returns data handler.
     */
    protected getHandler(index?: number): Data.Handler;
    /**
     * Configures the data handler.
     */
    static conf(config?: $List.Config): Data.Definition;
    /**
     * Initializes the data handler.
     */
    static init<T extends Type = Type>(config?: $List.Config<T>): $List<T>;
}
export {};
