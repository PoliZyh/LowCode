
import type{
    ICommonAttr
} from "@/components/common/types"

import type { IMTableAttr } from "./MTable/type";

export interface ICustomeEvent {
    eventName: string;
    eventValue: string;
    eventCode?: string;
}


// export type ICustomeStyle = {
//     [K in keyof ICommonAttr]: ICommonAttr[K];
// } & ICommonAttr;

export interface ICustomeStyle extends ICommonAttr {
    [key: string]: any;
    radius?: number | null;
}

export interface ICustomeComponent {
    componentName: string;
    type?: 'e' | 'a' | 'm';
    label: string;
    propValue: Array<string> | string | IMTableAttr;
    icon?: string;
    animations: Array<string>;
    events: Array<ICustomeEvent>;
    style: ICustomeStyle;
    other?: IOtherProp;
}

export interface IOtherProp {
    hasLocked?: boolean;
}