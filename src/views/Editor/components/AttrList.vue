<template>
    <div class="attr-list-box">
        <el-tabs class="tabs" v-show="isShow">
            <el-tab-pane label="属性">
                <el-collapse>
                    <el-collapse-item title="通用属性">
                        <CommonAttr ></CommonAttr>
                    </el-collapse-item>
                    <el-collapse-item title="组件内属性">
                        <PropsAttr></PropsAttr>
                    </el-collapse-item>
                </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="事件">
                <el-collapse>
                    <el-collapse-item title="通用事件">
                        <CommonEvent></CommonEvent>
                    </el-collapse-item>
                    <el-collapse-item title="联动事件">

                    </el-collapse-item>
                </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="动画"></el-tab-pane>
        </el-tabs>
        <!-- <h3 v-show="!isShow">请先激活组件哦</h3> -->
        <div class="attr-canvas" v-show="!isShow">
            <CanvasAttr></CanvasAttr>
        </div>
    </div>
</template>

<script setup lang="ts">
import CommonAttr from '@/components/common/CommonAttr.vue';
import PropsAttr from '@/components/common/PropsAttr.vue';
import CanvasAttr from '@/components/common/CanvasAttr.vue';
import CommonEvent from '@/components/common/Events/CommonEvent.vue';
import useComponentsStore from '@/store/useComponentStore';
import { computed } from 'vue';

const componentsStore = useComponentsStore();

const isShow = computed(() => {
    return componentsStore.curActiveComponent !== null
})
</script>

<style scoped lang="less">
.attr-list-box {
    width: 288px;
    height: 100%;
    border-left: 1px solid var(--border-c-week);
    padding: 10px;
    overflow: scroll;
    .tabs {
        width: 100%;
    }
    h3 {
        height: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: grey;
        font-weight: 400;
    }
    .attr-canvas {
        width: 100%;
        height: 100%;
    }
}
</style>