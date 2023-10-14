<template>
    <div class="personal-dialog">
        <el-dialog title="个性化设置"
        :model-value="props.isShow"
        :before-close="handleBeforeClose"
        width="40%">
            <div class="row">
                <el-tooltip
                effect="dark"
                content="当贴近的像素达到多少时产生吸附效果"
                placement="top"
                >
                    <span class="title-adsorption">吸附强度</span>
                </el-tooltip>
                <el-input type="number" v-model="markLineStore.diff"></el-input>
            </div>
            <div class="row">
                <el-tooltip
                effect="dark"
                content="是否显示历史记录"
                placement="top">
                    <span>历史记录</span>
                </el-tooltip>
                <el-switch v-model="isShowHistory" />
            </div>
        </el-dialog>
    </div>
</template>


<script setup lang="ts">
import useMarkLineStore from '@/store/useMarkLineStore';
import { ref, watch } from 'vue';
import $bus from '@/utils/bus';

const isShowHistory = ref<boolean>(false)
const markLineStore = useMarkLineStore()
const props = defineProps<{
    isShow: boolean;
}>()
const emit = defineEmits<{
    (e: 'update:isShow', value: boolean): void;
}>()


watch(
    () => isShowHistory.value,
    () => {
        $bus.emit('changeShowHistory', isShowHistory.value)
    }
)

const handleBeforeClose = (done: () => void) => {
    emit('update:isShow', false)
    done()
}

</script>


<style lang="less" scoped>
.personal-dialog {
    position: relative;
    z-index: 5000;

    .row {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 10px;
        .el-input {
            width: 40%;
        }
    }
}
</style>

<style lang="less">
.el-popper.is-dark {
    z-index: 5002 !important;
    position: relative;
}
</style>