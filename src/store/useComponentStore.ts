import { defineStore } from "pinia";

import type { ICustomeComponent, ICustomeStyle } from "@/components/custome-components/types";

interface IComponentState {
    curActiveComponent: ICustomeComponent | null;
    curComponents: ICustomeComponent[];
}

const useComponentsStore = defineStore('components', {

    state: (): IComponentState => ({
        curActiveComponent: null, // 当前激活的组件
        curComponents: [] // 当前画布上的组件
    }),


    actions: {
        addComponent(component: ICustomeComponent) {
            this.curComponents.push(component);
        },

        removeComponent(component: ICustomeComponent) {
            const index = this.curComponents.indexOf(component);
            this.curComponents.splice(index, 1);
        },

        setActiveComponent(component: ICustomeComponent | null) {
            this.curActiveComponent = component;
        },

        setActiveComponentStyle(style: ICustomeStyle) {
            this.curActiveComponent!.style = {...this.curActiveComponent!.style, ...style};
        }
    }
})



export default useComponentsStore