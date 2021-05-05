import * as Data from "..";
export declare type Config = Data.Config & {
    item?: string | Data.Definition;
};
/**
 * The list data handler class.
 */
export default class List extends Data.Handler {
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
    protected item: string | Data.Definition;
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
export { List as Handler };
