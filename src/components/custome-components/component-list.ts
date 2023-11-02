
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
    },
    {
        componentName: 'MTable',
        type: 'e',
        label: '表格',
        propValue: {
            tableTitle: [
                {
                    propName: 'prop1',
                    titleName: '属性1'
                },
                {
                    propName: 'prop2',
                    titleName: '属性2'
                },
                {
                    propName: 'prop3',
                    titleName: '属性3'
                }
            ],
            tableData: [
                { prop1: 123, prop2: 233, prop3: 12312 },
                { prop1: 'abc', prop2: 'def', prop3: 'c' },
            ],
            isTitleBold: false,
            hasZebraStripe: false,
        },
        animations: [],
        events: [],
        style: {
            ...commonAttr,
            width: 310,
            height: 224,
            backgroundColor: '#ffffff',
            textAlign: 'center',
            borderRadius: null,
            borderColor: '#ffffff',
        }
    },
    {
        componentName: 'MImage',
        type: 'e',
        label: '图片',
        propValue: {
            isHorizontalFlip: false,
            isVerticalFlip: false,
            url: 'https://i.postimg.cc/Znt1jWYF/user.jpg'
        },
        animations: [],
        events: [],
        style: {
            ...commonAttr,
            width: 202,
            height: 165,
            backgroundColor: null,
            textAlign: null,
            fontSize: null,
            lineHeight: null,
            letterSpacing: null,
            color: null,
            borderWidth: null,
            borderColor: null
        }
    },
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