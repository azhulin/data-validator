export declare namespace Value {
    type Primitive = undefined | null | boolean | number | string;
    type Array = (Primitive | Array | Object)[];
    type Object = {
        [key: string]: Primitive | Array | Object;
    };
}
/**
 * The data value.
 */
export declare type Value = Value.Primitive | Value.Array | Value.Object;
