<template>
    <div class="opstion-list-box">
        <div class="ops-item">
            <el-button>项目列表</el-button>
        </div>
        <div class="ops-item">
            <el-button>撤销</el-button>
        </div>
        <div class="ops-item">
            <el-button>重做</el-button>
        </div>
        <div class="ops-item">
            <el-button>保存</el-button>
        </div>
        <div class="ops-item">
            <el-button>清空</el-button>
        </div>
        <div class="ops-item">
            <el-button>预览</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>

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