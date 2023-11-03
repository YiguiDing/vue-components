import { CSSProperties } from "vue";
export type LocaleDateString = string;
export type Style = Array<CSSProperties>;
export type StyleMap = Map<LocaleDateString, Style>;
export type CalendarValModel = {
    title?: string;
    year?: number;
    styleMap?: StyleMap;
};
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    modelValue: import('vue').PropType<CalendarValModel>;
    enableAutoResize: {
        type: BooleanConstructor;
        default: boolean;
        required: false;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: import('vue').PropType<CalendarValModel>;
    enableAutoResize: {
        type: BooleanConstructor;
        default: boolean;
        required: false;
    };
}>>, {
    enableAutoResize: boolean;
}, {}>, {
    default?(_: {
        date: string;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
