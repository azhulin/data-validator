import * as Data from "..";
export declare type Config = Data.Config & {
    schema?: Data.Schema;
    reduce?: boolean;
};
declare type Obj = Record<string, unknown>;
/**
 * The object data handler class.
 */
export default class ObjectHandler extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    id: string;
    /**
     * {@inheritdoc}
     */
    name: string;
    /**
     * The raw schema.
     */
    protected schemaRaw: Data.Schema;
    /**
     * The schema.
     */
    protected get schema(): Data.Schema;
    private _schema;
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
    protected process(data: Obj, context: Data.Context): Promise<Obj | null>;
    /**
     * Returns data handler.
     */
    protected getHandler(key: string): Data.Handler;
}
export { ObjectHandler as Handler };
