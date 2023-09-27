<template>
    <div class="opstion-list-box">
        <div class="ops-item">
            <el-button @click="router.push({name: 'Project'})">项目列表</el-button>
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
            <el-button @click="handlePreview">预览</el-button>
        </div>
        <div class="ops-item">
            <el-button @click="isShowDialog = true">个性化设置</el-button>
        </div>
        <div class="ops-item">
            <el-dropdown>
                <el-button class="el-dropdown-link">
                    导出UI
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </el-button>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="handleDownloadUI('cur')">当前路由</el-dropdown-item>
                    <el-dropdown-item @click="handleDownloadUI('all')">全部路由</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
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
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import $bus from '@/utils/bus';
import { ArrowDown } from '@element-plus/icons-vue'

const snapshotStore = useSnapshotStore();
const componentsStore = useComponentsStore();
const editorRoutesStore = useEditorRoutesStore();
const router = useRouter();
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

// 预览按钮的回调
const handlePreview = () => {
    $bus.emit('showPreview', { isShow: true })
}

// 下载UI按钮的回调
const handleDownloadUI = (type: 'all' | 'cur') => {
    $bus.emit('downloadUI', {type})
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
.example-showcase .el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>