<template>
    <div class="route-table-dialog-box">
        <el-dialog
        title="路由表"
        :model-value="props.isShow"
        :before-close="handleBeforeClose"
        >
            <el-table
            :data="tableData"
            height=250
            @row-dblclick="handleDoubleClickRow">
                <el-table-column prop="date" label="更新日期"></el-table-column>
                <el-table-column prop="route" label="路由路径"></el-table-column>
                <el-table-column prop="pageName" label="界面名"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import useEditorRoutesStore from '@/store/useEditorRoutesStore';
import useSnapshotStore from '@/store/useSnapshotStore';
import useComponentsStore from '@/store/useComponentStore';
import { computed } from 'vue';
import { ElMessage } from 'element-plus';

const editorRoutesStore = useEditorRoutesStore()
const snapshotStore = useSnapshotStore()
const componentsStore = useComponentsStore()
const props = defineProps<{
    isShow: boolean;
}>()
const emit = defineEmits<{
    (e: 'update:isShow', value: boolean): void;
}>()
const tableData = computed(() => {
    const res = []
    for (let i in editorRoutesStore.routesMap) {
        const item = {
            route: i,
            pageName: editorRoutesStore.routesMap[i].pageName,
            date: editorRoutesStore.routesMap[i].date
        }
        res.push(item)
    }
    return res
})

const handleBeforeClose = (done: () => void) => {
    emit('update:isShow', false)
    done()
}

const handleDoubleClickRow = (row: {route: string, pageName: string, date: string}) => {
    // 当点击切换路由的时候需要重置snapShotStore和componentsStore
    // 重新赋值curComponents
    componentsStore.$reset()
    snapshotStore.$reset()
    // 解决bug
    snapshotStore.setSavedIndex(0)
    editorRoutesStore.setCurRouteInfo(row.route, row.pageName)
    const routeComponents = editorRoutesStore.routesMap[row.route].components
    componentsStore.setCurComponentsWithoutDeepCopy(routeComponents)
    snapshotStore.saveSnapshot()
    emit('update:isShow', false)
    ElMessage.success('路由成功')
}
</script>

<style scoped lang="less">
.route-table-dialog-box {
    position: relative;
    z-index: 7000;
}
</style>


