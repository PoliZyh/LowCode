<template>
    <div class="projects-box">
        <!-- 标签页 -->
        <Tab :data="tabStore.tabs"></Tab>

        <!-- 项目列表 -->
        <div class="list">
            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
            <ProjectCardEmpty></ProjectCardEmpty>
        </div>

    </div>
</template>


<script setup lang="ts">
import Tab from "@/components/layout/Tab/index.vue"
import ProjectCard from "./projects-components/ProjectCard.vue"
import ProjectCardEmpty from "./projects-components/ProjectCardEmpty.vue";
import useTabStore from "@/store/useTabStore"

const tabStore = useTabStore()


</script>


<style lang="less" scoped>
.projects-box {
    width: calc(100% - 237px);
    padding: 10px 30px;
    display: flex;
    flex-direction: column;
    .list {
        padding: 30px 0px;
        display: flex;
        gap: 20px;
        flex-direction: row;
        flex-wrap: wrap;
    }
}
</style>