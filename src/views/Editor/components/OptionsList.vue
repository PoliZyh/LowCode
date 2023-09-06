<template>
    <div class="opstion-list-box">
        <div class="ops-item">
            <el-button>项目列表</el-button>
        </div>
        <div class="ops-item">
            <el-button
            @click="handleNewBuild"
            >
                新建
            </el-button>
        </div>
        <div class="ops-item">
            <el-button @click="isShowRouteTableDialog = true">路由表</el-button>
        </div>
        <div class="ops-item">
            <el-button
            @click="handleClickRevoke"
            :disabled="snapshotStore.curSanpShotIndex < 0 || snapshotStore.curSanpShotIndex <= snapshotStore.savedIndex">
                撤销
            </el-button>
        </div>
        <div class="ops-item">
            <el-button
            @click="handleSave">保存</el-button>
        </div>
        <div class="ops-item">
            <el-button
            @click="handleClear"
            :disabled="componentsStore.curComponents.length === 0">
                清空
            </el-button>
        </div>
        <div class="ops-item">
            <el-button>预览</el-button>
        </div>
        <div class="ops-item">
            <el-button @click="isShowDialog = true">个性化设置</el-button>
        </div>
    </div>

    <PersonalDialog v-model:isShow="isShowDialog"></PersonalDialog>
    <RouteSaveDialog></RouteSaveDialog>
    <RouteTableDialog v-model:isShow="isShowRouteTableDialog"></RouteTableDialog>
</template>

<script lang="ts" setup>

import PersonalDialog from './PersonalDialog.vue';
import RouteSaveDialog from './RouteSaveDialog.vue';
import RouteTableDialog from './RouteTableDialog.vue';
import useSnapshotStore  from '@/store/useSnapshotStore';
import useComponentsStore from '@/store/useComponentStore';
import useEditorRoutesStore from '@/store/useEditorRoutesStore';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const snapshotStore = useSnapshotStore();
const componentsStore = useComponentsStore();
const editorRoutesStore = useEditorRoutesStore();
const isShowDialog = ref(false);
const isShowRouteTableDialog = ref(false);

const handleClickRevoke = () => {
    snapshotStore.revoke();
}

const handleClear = () => {
    componentsStore.setCurComponents([]);
    componentsStore.setActiveComponent(null)
    snapshotStore.saveSnapshot()
}

const handleSave = () => {
    if (editorRoutesStore.curRoute) {
        // 如果当前已经保存了路由，则无需重新保存
        snapshotStore.resetSnapShot()
        return
    }
    editorRoutesStore.showRouteSaveDialog(true)
}

const handleNewBuild = () => {
    // 新建必须在保存的情况下操作
    // 清空当前的curRoute和curPageName确保在新界面能够正常保存
    // 重置snapShotStore和componentStore
    if (!editorRoutesStore.curRoute || snapshotStore.curSanpShotIndex !== snapshotStore.savedIndex) {
        ElMessage.error('请先保存当前路由')
        return
    }
    editorRoutesStore.setCurRouteInfo('', '')
    snapshotStore.$reset()
    componentsStore.$reset()
}

</script>


<style scoped lang="less">
.opstion-list-box {
    width: 100%;
    height: 66px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid var(--border-c-deep);
}
</style>