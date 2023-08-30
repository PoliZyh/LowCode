
import type { ICustomeStyle } from "@/components/custome-components/types"
import type { ICommonAttrInputItem, ICommonAttrSelectOption } from "@/components/common/types"

interface IComponentResult {
    [key: string]: any
}

// 不需要补充px的样式
const notPx = ['opacity']

const clearPosition = (result: IComponentResult) => {
    result['left'] = '0px'
    result['top'] = '0px'
}

// 计算自定义组件的样式 填充px等转换
export const getCustomeComponentStyle = (componentStyle: ICustomeStyle) => {
    const result: IComponentResult = {}

    for (const key in componentStyle) {
        if (typeof componentStyle[key] === 'string') {
            // 字符串不需要处理
            result[key] = componentStyle[key]
        } else if (typeof componentStyle[key] === 'number' && !notPx.includes(key)) {
            // number类型并且需要px填充的
            result[key] = `${componentStyle[key]}px`
        } else {
            // 其他
            result[key] = componentStyle[key]
        }
    }

    // 清除位置信息，避免与shape冲突
    clearPosition(result)

    return result
}


// 计算Shape组件的样式
export const getShapeStyle = (componentStyle: ICustomeStyle) => {
    const result: IComponentResult = {}

    // 需要计算出Shape的属性
    const keys = ['width', 'height', 'left', 'top']
    for (const key of keys) {
        if (componentStyle[key]) {
            result[key] = `${componentStyle[key]}px`
        }
    }
    return result
}


const styleInputMap: {
    [key: string]: string
} = {
    left: 'X 坐标',
    top: 'Y 坐标',
    width: '宽度',
    height: '高度',
    opacity: '透明度',
    fontSize: '字号',
    lineHeight: '行高',
    letterSpacing: '字间距',
    color: '字体颜色',
    backgroundColor: '背景颜色',
    borderColor: '边框颜色',
    borderWidth: '边框宽度',
    borderRadius: '圆角',
    textAlign: '对齐方式',
}

const selectOptionsMap: {
    [key: keyof ICustomeStyle]: Array<ICommonAttrSelectOption>
} = {
    textAlign: [
        {
            label: '居中对齐',
            value: 'center'
        },
        {
            label: '左对齐',
            value: 'left'
        },
        {
            label: '右对齐',
            value: 'right'
        }
    ]
}

// 获取属性栏输入框的类型等属性
export const getCommonAttrInputStyle = (componentStyle: ICustomeStyle): Array<ICommonAttrInputItem> => {
    const result: Array<ICommonAttrInputItem> = []

    let key: keyof ICustomeStyle
    for (key in componentStyle) {
        // 赋值为null即为不需要这一项的input
        if (componentStyle[key] === null) {
            continue
        }
        let type: 'text' | 'number' | 'colorPicker' | 'select' = 'number'
        const selectOptions: Array<ICommonAttrSelectOption> = []
        if (/color/.test(key.toLowerCase())) {
            // 如果key中带有color
            type = 'colorPicker'
        } else if (typeof componentStyle[key] === 'number') {
            type = 'number'
        } else if ( selectOptionsMap[key] && typeof componentStyle[key] === 'string') {
            type = 'select'
            selectOptions.push(...selectOptionsMap[key])
        }
        const commonAttrInputItem: ICommonAttrInputItem = {
            key: key,
            label: styleInputMap[key],
            value: componentStyle[key],
            inputType: type,
            selectOptions: selectOptions,
        }
        result.push(commonAttrInputItem)
    }

    return result
}


