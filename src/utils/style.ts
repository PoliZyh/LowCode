
import { ICustomeStyle } from "@/components/custome-components/types"

interface IComponentResult {
    [key: string]: string
}

// 不需要补充px的样式
const notPx = ['visible']

const clearPosition = (result: IComponentResult) => {
    result['left'] = '0px'
    result['top'] = '0px'
}

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