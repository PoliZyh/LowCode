
import { defineStore } from "pinia";
import useComponentsStore from "./useComponentStore";
import useEditorRoutesStore from "./useEditorRoutesStore";
import { deepCopy } from "@/utils/deepCopy";
import type { ICustomeComponent } from "@/components/custome-components/types";
import { ElMessage } from "element-plus";


interface ISnapeshotState {
    curSanpShotIndex: number;
    snapeshot: Array<Array<ICustomeComponent>>;
    savedIndex: number;
    history: Array<IHistoryItem>;
}

export interface IHistoryItem {
    event: string;
    value: string;
}

const useSnapshotStore = defineStore("snapshot", {

    state: (): ISnapeshotState => ({
        curSanpShotIndex: -1,
        snapeshot: [],
        savedIndex: -1,
        history: [],
    }),

    actions: {

        /**
         * * 保存快照
         * * 当新增组件、删除组件、修改组件时执行保存快照;
         */
        saveSnapshot(historyItem: IHistoryItem = { event: '默认', value: '默认' }) {
            const componentsStore = useComponentsStore();
            // 深拷贝避免快照记录被修改
            const newCurComponents = deepCopy(componentsStore.curComponents);
            this.curSanpShotIndex++;
            this.snapeshot[this.curSanpShotIndex] = newCurComponents;
            this.history.unshift(historyItem)
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
            if (this.curSanpShotIndex <= this.savedIndex) return
            this.curSanpShotIndex--;
            const componentsStore = useComponentsStore();
            // 将激活态组件失活
            componentsStore.setActiveComponent(null)
            if (this.curSanpShotIndex < 0) {
                componentsStore.setCurComponents([])
            } else {
                componentsStore.setCurComponents(deepCopy(this.snapeshot[this.curSanpShotIndex]))
            }
            console.log('revoke', this.curSanpShotIndex, componentsStore.curComponents)
        },


        /**
         * * 重置快照，并修改routeMap
         */
        resetSnapShot() {

            if (this.savedIndex === this.curSanpShotIndex && this.curSanpShotIndex !== -1) {
                ElMessage.warning('请勿重复保存')
                return
            }
            this.savedIndex = this.curSanpShotIndex;
            // 将当前components保存到editorRoutesStore中
            const editorRoutesStore = useEditorRoutesStore();
            editorRoutesStore.setRoutesMap(deepCopy(this.snapeshot[this.curSanpShotIndex]))
            ElMessage.success('保存成功')
        }


    }

})


export default useSnapshotStore