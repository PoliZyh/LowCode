
import type{
    ICommonAttr
} from "@/components/common/types"

// 自定义属性
import type { IMTableAttr } from "./MTable/type";
import type { IMImageAttr } from "./MImage/type";

// 自定义事件
export interface ICustomeEvent {
    eventName: string; // 事件名称
    eventValue: Array<string | ICustomeEvent | ISystemEvent>; // 事件值，可以为string(code)或自定义事件
    params?: Array<IParams>;
}

export interface IParams {
    [key: string]: any;
}

// 系统事件
export interface ISystemEvent extends ICustomeEvent {
    eventName: 'router' | 'request' | 'message';
    sysParams: IRouterSysParams | IRequestSysParams | IMessageSysParams; // 携带参数
}
export interface IRouterSysParams {
    routeName?: string;
    routePath?: string;
}
export interface IRequestSysParams {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    data?: any;
    params?: any;
    query?: any;
}
export interface IMessageSysParams {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
}

// 生命周期事件
export interface ILifeCycleEvent extends ICustomeEvent {
    eventName: 'onBeforeMount' | 'onMounted' | 'onBeforeUpdate' | 'onUpdated' | 'onBeforeUnmount' | 'onUnmounted' | '';
}

// 交互事件
export interface IInteractionEvent extends ICustomeEvent {
    eventName: 'onClick' | 'onMouseEnter' | 'onMouseLeave' | 'onMouseDown' | 'onMouseUp' |
    'onContextMenu' | 'onDrag' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' |
    'onDragOver' | 'onDragStart' | 'onDrop' | 'onScroll' | 'onWheel' | 'onTouchCancel' |
    'onTouchEnd' | 'onTouchMove' | 'onTouchStart' | '';
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
    events: {
        lifeCycle: Array<ILifeCycleEvent>,
        methods: Array<ICustomeEvent>,
        handler: Array<IInteractionEvent>
    };
    style: ICustomeStyle;
    other?: IOtherProp;
}

export interface IOtherProp {
    hasLocked?: boolean;
}