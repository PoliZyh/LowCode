
import {
    ICommonAttr
} from "@/components/common/types"

export interface ICustomeEvent {
    eventName: string;
    eventValue: string;
    eventCode?: string;
}

export interface ICustomeStyle extends ICommonAttr {
    [key: string]: any;
}

export interface ICustomeComponent {
    componentName: string;
    type?: 'e' | 'a' | 'm';
    label: string;
    propValue: Array<string> | string;
    icon?: string;
    animations: Array<string>;
    events: Array<ICustomeEvent>;
    style: ICustomeStyle;
}