<template>
    <div class="projects-box">
        <!-- 标签页 -->
        <Tab :data="tabStore.tabs"></Tab>

        <!-- 项目列表 -->
        <div class="list">
            <ProjectCard
            v-for="item in projectInfo"
            :key="item.projectId"
            :info="item"></ProjectCard>
            <ProjectCardEmpty></ProjectCardEmpty>
        </div>

    </div>
</template>


<script setup lang="ts">
import Tab from "@/components/layout/Tab/index.vue"
import ProjectCard from "./projects-components/ProjectCard.vue"
import ProjectCardEmpty from "./projects-components/ProjectCardEmpty.vue";
import useTabStore from "@/store/useTabStore"
import { reactive } from "vue";
import type { IProjectInfoItem } from '../types'

const tabStore = useTabStore()
const projectInfo = reactive<Array<IProjectInfoItem>>([
    {
        name: '声纹检测项目',
        description: '基于声纹识别的智能门禁系统',
        projectId: 0,
    },
    {
        name: 'openApi',
        description: '基于openApi的智能门禁系统',
        projectId: 1,
    }
])


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