
import type{
    ICommonAttr
} from "@/components/common/types"

// 自定义属性
import type { IMTableAttr } from "./MTable/type";
import type { IMImageAttr } from "./MImage/type";

export interface ICustomeEvent {
    eventName: string;
    eventValue: string;
    eventCode?: string;
}



export interface ICustomeStyle extends ICommonAttr {
    [key: string]: any;
    radius?: number | null;
}

export interface ICustomeComponent {
    componentName: string;
    type?: 'e' | 'a' | 'm';
    label: string;
    propValue: Array<string> | string | IMTableAttr | IMImageAttr;
    icon?: string;
    animations: Array<string>;
    events: Array<ICustomeEvent>;
    style: ICustomeStyle;
    other?: IOtherProp;
}

export interface IOtherProp {
    hasLocked?: boolean;
}