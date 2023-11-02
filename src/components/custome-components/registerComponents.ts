import MButton from './MButton/index.vue';
import MText from './MText/index.vue';
import MRectangle from './MRectangle/index.vue'
import MCircle from './MCircle/index.vue'
import MTable from './MTable/index.vue'
import MImage from './MImage/index.vue'

interface IRegisterComponents {
    [key: string]: any
}

const components: IRegisterComponents = {
    // 基础组件
     MButton,
     MText,
     MTable,
     MImage,

    // 形状组件
    MRectangle,
    MCircle
}


export const registerComponents = (app: any) => {
    for (let item in components) {
        app.component(item, components[item]);
    }
}