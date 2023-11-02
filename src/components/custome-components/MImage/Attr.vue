<template>
    <div class="m-image-attr-box" v-if="componentsStore.curActiveComponent?.componentName === 'MImage'">
        <el-form>
            <el-form-item label="图片链接">
                <el-input
                v-model="(componentsStore.curActiveComponent.propValue as IMImageAttr).url"></el-input>
            </el-form-item>
            <el-form-item label="水平翻转">
                <el-switch
                    v-model="(componentsStore.curActiveComponent.propValue as IMImageAttr).isHorizontalFlip"
                    class="ml-2"
                    inline-prompt
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                    active-text="是"
                    inactive-text="否"
                />
            </el-form-item>
            <el-form-item label="垂直翻转">
                <el-switch
                    v-model="(componentsStore.curActiveComponent.propValue as IMImageAttr).isVerticalFlip"
                    class="ml-2"
                    inline-prompt
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                    active-text="是"
                    inactive-text="否"
                />
            </el-form-item>
        </el-form>
    </div>
</template>


<script setup lang="ts">
import useComponentsStore from '@/store/useComponentStore';
import type { IMImageAttr } from './type';

const componentsStore = useComponentsStore()


</script>


<style scoped lang="less">
.m-image-attr-box {
    width: 100%;
}
</style>