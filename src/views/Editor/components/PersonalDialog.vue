<template>
    <div class="personal-dialog">
        <el-dialog title="个性化设置"
        :model-value="props.isShow"
        :before-close="handleBeforeClose">
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
        </el-dialog>
    </div>
</template>


<script setup lang="ts">
import useMarkLineStore from '@/store/useMarkLineStore';

const markLineStore = useMarkLineStore()
const props = defineProps<{
    isShow: boolean;
}>()
const emit = defineEmits<{
    (e: 'update:isShow', value: boolean): void;
}>()

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
        .el-input {
            width: 40%;
        }
    }
}
</style>