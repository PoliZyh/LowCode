
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
            borderWidth: 1,
            borderColor: '#C7C7C7',
            backgroundColor: '#FFFFFF'
        }
    },
    {
        componentName: 'MText',
        type: 'e',
        label: '文本',
        propValue: '双击编辑文字',
        animations: [],
        events: [],
        style: {
            ...commonAttr,
            width: 210,
            height: 24,
            backgroundColor: 'transparent',
            textAlign: 'left'
        }
    }
]


// * 形状列表
export const shapeList: Array<ICustomeComponent> = [
    {
        componentName: 'MRectangle',
        type: 'e',
        label: '矩形',
        propValue: '',
        animations: [],
        events: [],
        style: {
            ...commonAttr,
            width: 300,
            height: 200,
            backgroundColor: '#E6E6E6',
            textAlign: null,
            fontSize: null,
            lineHeight: null,
            letterSpacing: null,
            color: null,
        }
    },
    {
        componentName: 'MCircle',
        type: 'e',
        label: '圆形',
        propValue: '',
        animations: [],
        events: [],
        style: {
            ...commonAttr,
            width: 300,
            height: 300,
            backgroundColor: '#E6E6E6',
            textAlign: null,
            fontSize: null,
            lineHeight: null,
            letterSpacing: null,
            color: null,
            radius: 300,
            borderRadius: 150
        }
    }
]