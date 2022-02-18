import * as Data from "..";
import { $List, $Option } from ".";
declare type Type = (number | string)[];
export declare namespace $OptionList {
    type Config<T extends Type = Type> = Data.Config<T> & {
        key_type?: $Option.KeyType;
        options?: $Option.Options;
        preserve?: boolean;
    };
}
/**
 * The option list data handler class.
 */
export declare class $OptionList<T extends Type = Type> extends $List<T> {
    /**
     * {@inheritdoc}
     */
    protected constraints: Data.Constraint.List;
    /**
     * {@inheritdoc}
     */
    static processor: {
        order: <T_1 extends Type>(data: T_1, { handler }: Data.Context<T_1>) => T_1;
    };
    /**
     * The options.
     */
    protected options: $Option.Options;
    /**
     * Whether to keep the items order from the input.
     */
    protected preserve: boolean;
    /**
     * {@inheritdoc}
     */
    constructor(settings: Data.Settings<T>);
    /**
     * Configures the data handler.
     */
    static conf(config?: $OptionList.Config): Data.Definition;
    /**
     * Initializes the data handler.
     */
    static init<T extends Type = Type>(config?: $OptionList.Config<T>): $OptionList<T>;
}
export {};
