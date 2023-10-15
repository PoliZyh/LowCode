
import { defineStore } from "pinia";
import type { ICustomeComponent } from "@/components/custome-components/types";
import useComponentsStore from "./useComponentStore";
import { deepCopy } from "@/utils/deepCopy";
import { ElMessage } from "element-plus";

interface IContextmenuState {
    loackedComponents: Array<ICustomeComponent>;
    isActive: boolean;
    curRights: string[];
    clipBoard: ICustomeComponent | null;
}

const useContextmenuStore = defineStore('contextmenu', {

    state: (): IContextmenuState => ({
        loackedComponents: [],
        isActive: false,
        curRights: [],
        clipBoard: null
    }),

    actions: {

        // 激活右键菜单
        activeContextmenu() {
            this.isActive = true;
        },

        // 失活右键菜单
        deactiveContextmenu() {
            this.isActive = false;
        },

        // 给当前组件添加权限
        addCurRights(rights: string[]) {
            this.curRights = [...this.curRights, ...rights]
        },

        // 清空当前组件拥有的权限
        clearRights() {
            this.curRights = []
        },

        // 设置当前组件拥有的权限
        setCurRights() {
            const componentsStore = useComponentsStore()
            const opstion = componentsStore.curActiveComponent ? 'activeComponent' : 'canvas'
            // 操作与权限的映射
            const optionRightMap = {
                activeComponent: ['up', 'down', 'top', 'bottom', 'copy', 'paste', 'cut'],
                canvas: ['paste']
            }
            // 基础权限
            let rights = optionRightMap[opstion as keyof typeof optionRightMap]
            // 额外权限
            if (componentsStore.curActiveComponent?.other) {
                if (componentsStore.curActiveComponent.other.hasLocked) {
                    rights = []
                    rights.push('unlock')
                } else {
                    rights.push('lock')
                }
            } else {
                rights.push('lock')
            }

            this.clearRights()
            this.addCurRights(rights)
        },

        // 复制组件
        copyComponent() {
            const componentsStore = useComponentsStore()
            this.clipBoard = deepCopy(componentsStore.curActiveComponent)
        },

        // 粘贴组件
        pasteComponent(left: number, top: number) {
            const componentsStore = useComponentsStore()
            if (this.clipBoard) {
                const component = deepCopy(this.clipBoard)
                component.style = { ...component.style, left, top }
                componentsStore.addComponent(component)
            } else {
                ElMessage.warning('剪贴板为空')
            }
        },

        // 剪切组件
        cutComponent() {
            // 复制当前激活的组件
            this.copyComponent()
            // 删除当前激活的组件
            const componentsStore = useComponentsStore()
            componentsStore.removeComponent(componentsStore.curActiveComponent)
        }

    }


})



export default useContextmenuStore;