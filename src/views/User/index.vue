<template>
    <div class="user-page">
        <!-- 头部 -->
        <Header :data="headerStore.userHeader"></Header>

        <div class="content">
            <!-- 侧边栏 -->
            <Sidebar :data="sidebarStore.userSidebar"></Sidebar>

            <!-- views -->
            <RouterView></RouterView>
        </div>
    </div>
</template>


<script lang="ts" setup>

import Header from "@/components/layout/Header/index.vue";
import useHeaderStore from "@/store/useHeaderStore";
import Sidebar from "@/components/layout/Sidebar/index.vue"
import useSidebarStore from "@/store/useSidebarStore";


const sidebarStore = useSidebarStore()

const headerStore = useHeaderStore()

</script>


<style lang="less" scoped>
.user-page {
    .content {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        background-color: rgba(247, 247, 247, 0.855);
    }
}
</style>