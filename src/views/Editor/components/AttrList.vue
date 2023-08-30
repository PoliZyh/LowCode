<template>
    <div class="attr-list-box">
        <el-tabs class="tabs">
            <el-tab-pane label="属性">
                <CommonAttr />
            </el-tab-pane>
            <el-tab-pane label="事件"></el-tab-pane>
            <el-tab-pane label="动画"></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import CommonAttr from '@/components/common/CommonAttr.vue';
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
}
</style>