<template>
    <div class="route-submit-dialog-box">
        <el-dialog
        v-model="editorRoutesStore.isShowRouteSaveDialog"
        title="保存路由信息"
        width="30%"
        >
            <div class="rows">
                <div class="row">
                    <span>界面名</span>
                    <el-input v-model="routeInfo.pageName" placeholder="填写界面名"></el-input>
                </div>
                <div class="row">
                    <span>路由</span>
                    <el-input v-model="routeInfo.routeName" placeholder="路由请以 '/' 开头"></el-input>
                </div>
            </div>
            <template #footer>
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="handleSave">保存</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import useEditorRoutesStore from '@/store/useEditorRoutesStore';
import useSnapshotStore from '@/store/useSnapshotStore';
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';

const editorRoutesStore = useEditorRoutesStore();
const snapshotStore = useSnapshotStore();
const routeInfo = reactive({
    pageName: '',
    routeName: ''
})

const handleClose = () => {
    editorRoutesStore.showRouteSaveDialog(false);
}

const handleSave = () => {
    // 保存后需要清空快照
    if (!isValid()) {
        ElMessage.error('请填写完整且合法信息');
        return
    }
    // 提交保存的路由信息
    editorRoutesStore.setCurRouteInfo(routeInfo.routeName, routeInfo.pageName)
    // 重置快照以及表单信息
    snapshotStore.resetSnapShot()
    editorRoutesStore.showRouteSaveDialog(false);
    routeInfo.pageName = ''
    routeInfo.routeName = ''
}

const isValid = (): boolean => {
    return !!routeInfo.pageName.trim() && !!routeInfo.routeName.trim() && routeInfo.routeName[0] === '/'
}

</script>


<style scoped lang="less">
.route-submit-dialog-box {
    position: relative;
    z-index: 5000;
    .rows {
        display: flex;
        flex-direction: column;
        gap: 20px;
        .row {
            display: flex;
            gap: 20px;
            width: 80%;
            align-items: center;
            justify-content: space-around;
            span {
                width: 30%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
}
</style>

<style>
.el-message {
    z-index: 5200 !important;
}
</style>