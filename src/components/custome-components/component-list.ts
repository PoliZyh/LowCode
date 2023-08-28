
import type {
    ICustomeComponent,
} from './types'

import { commonAttr } from '../common/common-attr'


// * 组件列表
// * 自定义组件默认样式
export const componentList: Array<ICustomeComponent> = [
    {
        componentName: 'MButton',
        type: 'e',
        label: '按钮',
        propValue: 'button',
        animations: [],
        events: [],
        style: {
            ...commonAttr,
            width: 100,
            height: 34,
        }
    },
    {
        componentName: 'MText',
        type: 'e',
        label: '文本',
        propValue: '文字',
        animations: [],
        events: [],
        style: {
            ...commonAttr,
            width: 100,
            height: 34,
            backgroundColor: 'transparent',
            textAlign: 'left'
        }
    }
]