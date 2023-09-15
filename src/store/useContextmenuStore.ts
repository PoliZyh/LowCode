
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

        activeContextmenu() {
            this.isActive = true;
        },

        deactiveContextmenu() {
            this.isActive = false;
        },

        addCurRights(rights: string[]) {
            this.curRights = [...this.curRights, ...rights]
        },

        clearRights() {
            this.curRights = []
        },

        setCurRights() {
            const componentsStore = useComponentsStore()
            const opstion = componentsStore.curActiveComponent ? 'activeComponent' : 'canvas'
            // 操作与权限的映射
            const optionRightMap = {
                activeComponent: ['up', 'down', 'top', 'bottom', 'copy', 'paste'],
                canvas: ['paste']
            }
            const rights = optionRightMap[opstion as keyof typeof optionRightMap]
            this.clearRights()
            this.addCurRights(rights)
        },

        copyComponent() {
            const componentsStore = useComponentsStore()
            this.clipBoard = deepCopy(componentsStore.curActiveComponent)
        },

        pasteComponent(left: number, top: number) {
            const componentsStore = useComponentsStore()
            if (this.clipBoard) {
                const component = deepCopy(this.clipBoard)
                component.style = { ...component.style, left, top }
                componentsStore.addComponent(component)
            } else {
                ElMessage.warning('剪贴板为空')
            }
        }

    }


})



export default useContextmenuStore;