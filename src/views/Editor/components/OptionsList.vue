<template>
    <div class="opstion-list-box">
        <div class="ops-item">
            <el-button>项目列表</el-button>
        </div>
        <div class="ops-item">
            <el-button>新建</el-button>
        </div>
        <div class="ops-item">
            <el-button
            @click="handleClickRevoke"
            :disabled="snapshotStore.curSanpShotIndex < 0">
                撤销
            </el-button>
        </div>
        <div class="ops-item">
            <el-button>保存</el-button>
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
</template>

<script lang="ts" setup>

import PersonalDialog from './PersonalDialog.vue';
import useSnapshotStore  from '@/store/useSnapshotStore';
import useComponentsStore from '@/store/useComponentStore';
import { ref } from 'vue';

const snapshotStore = useSnapshotStore();
const componentsStore = useComponentsStore();
const isShowDialog = ref(false);

const handleClickRevoke = () => {
    snapshotStore.revoke();
}

const handleClear = () => {
    componentsStore.setCurComponents([]);
    snapshotStore.saveSnapshot()
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