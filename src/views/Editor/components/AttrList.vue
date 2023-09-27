<template>
    <div class="attr-list-box">
        <el-tabs class="tabs" v-show="componentsStore.curActiveComponent !== null">
            <el-tab-pane label="属性">
                <el-collapse>
                    <el-collapse-item title="通用属性">
                        <CommonAttr />
                    </el-collapse-item>
                    <el-collapse-item title="组件内属性">
                        <PropsAttr></PropsAttr>
                    </el-collapse-item>
                </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="事件"></el-tab-pane>
            <el-tab-pane label="动画"></el-tab-pane>
        </el-tabs>
        <h3 v-show="componentsStore.curActiveComponent === null">请先激活组件哦</h3>
    </div>
</template>

<script setup lang="ts">
import CommonAttr from '@/components/common/CommonAttr.vue';
import PropsAttr from '@/components/common/PropsAttr.vue';
import useComponentsStore from '@/store/useComponentStore';

const componentsStore = useComponentsStore();
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
}
</style>