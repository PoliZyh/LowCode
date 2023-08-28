<template>
    <div class="project-card-empty-box">
        <el-icon class="icon"><Plus /></el-icon>
    </div>
</template>

<script setup lang="ts">

</script>


<style lang="less" scoped>
.project-card-empty-box {
    width: 300px;
    height: 250px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px 3px rgba(219, 219, 219, 0.738);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .icon {
        font-size: 5rem;
        color: grey;
    }
}
.project-card-empty-box:hover {
    background-color: rgba(237, 237, 237, 0.601);
}
</style>