
import { defineStore } from "pinia";
import useComponentsStore from "./useComponentStore";
import { deepCopy } from "@/utils/deepCopy";
import type { ICustomeComponent } from "@/components/custome-components/types";
import { ElMessage } from "element-plus";


interface ISnapeshotState {
    curSanpShotIndex: number;
    snapeshot: Array<Array<ICustomeComponent>>;
}

const useSnapshotStore = defineStore("snapshot", {

    state: (): ISnapeshotState => ({
        curSanpShotIndex: -1,
        snapeshot: []
    }),

    actions: {

        /**
         * * 保存快照
         * * 当新增组件、删除组件、修改组件时执行保存快照;
         */
        saveSnapshot() {
            const componentsStore = useComponentsStore();
            // 深拷贝避免快照记录被修改
            const newCurComponents = deepCopy(componentsStore.curComponents);
            this.curSanpShotIndex++;
            this.snapeshot[this.curSanpShotIndex] = newCurComponents;
            console.log('save', this.curSanpShotIndex,componentsStore.curComponents)
        },

        /**
         * * 撤销操作
         */
        revoke() {
            if (this.curSanpShotIndex < 0) {
                ElMessage({
                    type: 'warning',
                    message: '当前已经是第一张快照'
                })
                return;
            }
            this.curSanpShotIndex--;
            const componentsStore = useComponentsStore();
            // 将激活态组件失活
            componentsStore.setActiveComponent(null)
            if (this.curSanpShotIndex < 0) {
                componentsStore.setCurComponents([])
            } else {
                componentsStore.setCurComponents(this.snapeshot[this.curSanpShotIndex])
            }
            console.log('revoke', this.curSanpShotIndex, componentsStore.curComponents)
        },


    }

})


export default useSnapshotStore