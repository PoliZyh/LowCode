import MButton from './MButton/index.vue';
import MText from './MText/index.vue';

interface IRegisterComponents {
    [key: string]: any
}

const components: IRegisterComponents = {
    'MButton': MButton,
    'MText': MText
}


export const registerComponents = (app: any) => {
    for (let item in components) {
        app.component(item, components[item]);
    }
}