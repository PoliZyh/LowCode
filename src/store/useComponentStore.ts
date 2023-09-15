import { defineStore } from "pinia";
import type { ICustomeComponent, ICustomeStyle } from "@/components/custome-components/types";
import useContextmenuStore from "./useContextmenuStore";
import { ElMessage } from "element-plus";

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
        // 增加组件
        addComponent(component: ICustomeComponent) {
            this.curComponents.push(component);
        },

        // 移除组件
        removeComponent(component: ICustomeComponent) {
            const index = this.curComponents.indexOf(component);
            this.curComponents.splice(index, 1);
        },

        // 设置当前激活的组件
        setActiveComponent(component: ICustomeComponent | null) {
            const contextmenuStore = useContextmenuStore();
            if (!component) {
                // 当所有组件失活的时候，确保contextmenu也是关闭状态
                contextmenuStore.deactiveContextmenu()
            }
            this.curActiveComponent = component;
        },

        // 设置当前激活组件的样式
        setActiveComponentStyle(style: ICustomeStyle) {
            this.curActiveComponent!.style = {...this.curActiveComponent!.style, ...style};
        },

        // 设置当前面板上渲染的组件
        setCurComponents(components: ICustomeComponent[]) {
            this.curComponents = [...components];
        },

        // 获取当前激活的组件的索引
        getActiveComponentIndex() {
            if (this.curActiveComponent) {
                return this.curComponents.indexOf(this.curActiveComponent);
            }
            return -1;
        },

        // 交换面板中的组件
        swapComponent(indexAdd: number, indexDel: number) {
            this.curComponents[indexAdd] = this.curComponents.splice(indexDel, 1, this.curComponents[indexAdd])[0];
        },

        // 让当前激活的组件上移一层
        upActiveComponentOneLayer() {
            const index = this.getActiveComponentIndex();
            if (index < 0) {
                ElMessage.error('请先激组件');
            } else if (index === this.curComponents.length - 1) {
                ElMessage.warning('已经为顶层')
            } else {
                this.swapComponent(index, index + 1);
            }
        },

        // 让当前激活的组件下移一层
        downActiveComponentOneLayer() {
            const index = this.getActiveComponentIndex();
            if (index < 0) {
                ElMessage.error('请先激组件');
            } else if (index === 0) {
                ElMessage.warning('已经为底层')
            } else {
                this.swapComponent(index, index - 1);
            }
        },

        // 置顶当前激活的组件
        upActiveComponentToTop() {
            const index = this.getActiveComponentIndex()
            if (index < 0) {
                ElMessage.error('请先激组件');
            } else if (index === this.curComponents.length - 1) {
                ElMessage.warning('已经为顶层')
            } else {
                const tempComponent: ICustomeComponent = this.curComponents.splice(index, 1)[0];
                this.addComponent(tempComponent)
            }
        },

        // 置底当前激活的组件
        downActiveComponentToBottom() {
            const index = this.getActiveComponentIndex()
            if (index < 0) {
                ElMessage.error('请先激组件');
            } else if (index === 0) {
                ElMessage.warning('已经为底层')
            } else {
                const tempComponent: ICustomeComponent = this.curComponents.splice(index, 1)[0];
                this.curComponents.unshift(tempComponent)
            }
        }

    }
})



export default useComponentsStore