<template>
    <div class="canvas-attr-box">
        <p class="title">画布属性</p>
        <el-form style="margin-top: 20px;">
            <el-form-item label="不透明度">
                <el-input v-model="canvasParams.transparency"></el-input>
            </el-form-item>
            <el-form-item label="背景色">
                <el-color-picker v-model="canvasParams.backgroundColor" />
            </el-form-item>
            <el-form-item label="大小">
                <el-row style="width: 100%;">
                    <el-col :span="6">
                        <el-input size="small" v-model="canvasParams.width"></el-input>
                    </el-col>
                    <el-col :span="2" style="display: flex;justify-content: center;">*</el-col>
                    <el-col :span="6">
                        <el-input size="small" v-model="canvasParams.height"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="画布比例">
                <el-row style="width: 100%;">
                    <el-col :span="6">
                        <el-input size="small" v-model="canvasParams.scale"></el-input>
                    </el-col>
                    %
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>


<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';
import type { ICanvasAttr } from './types'
import $bus from '@/utils/bus';

const canvasParams = ref<ICanvasAttr>({
    transparency: 1,
    backgroundColor: '#ffffff',
    width: 1200,
    height: 740,
    scale: 100,
})

watch(
    () => canvasParams.value,
    () => {
        $bus.emit('update:CanvasAttr', canvasParams.value)
    },
    {
        deep: true
    }
)

onUnmounted(() => {
    $bus.off('*')
})

</script>



<style scoped lang="less">
.canvas-attr-box {
    width: 100%;
    height: 100%;
    .title {
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 1.2rem;
        padding: 10px;
        border-bottom: 2px solid rgb(206, 206, 206);
    }
}
</style>