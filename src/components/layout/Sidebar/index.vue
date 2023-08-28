<template>
    <div class="sidebar-box">
        <div class="sidebar-item" v-for="(item, index) in props.data" :key="item.routeName" @click="handleClickItem(item.routeName)">
            <p :style="{color: index === activeKey ? 'white' : ''}">{{ item.title }}</p>
            <div class="mask" :style="{width: index === activeKey ? '100%' : ''}"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const activeKey = ref(0)
const router = useRouter()
const route = useRoute()

const props = defineProps<{
    data: Array<ISidebarItem>
}>()

watch(
    () => route.path,
    () => {
        setActiveKey(route.name as string)
    }
)

const handleClickItem = (routeName: string): void => {
    // 路由
    router.push({
        name: routeName
    })
    setActiveKey(routeName)
}

const setActiveKey = (item: string) => {
    activeKey.value = props.data.findIndex(i => i.routeName === item)
}




</script>


<style lang="less" scoped>
.sidebar-box {
    width: 237px;
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    padding: 30px 0px;
    gap: 5px;
    background-color: #fff;
    .sidebar-item {
        cursor: pointer;
        width: 70%;
        margin: 0 auto;
        padding: 12px 29px;
        font-size: 1.1rem;
        border-radius: 5px;
        position: relative;
        p {
            position: relative;
            z-index: 1;
            color: grey;
        }
        .mask {
            position: absolute;
            height: 100%;
            width: 0%;
            top: 0;
            right: 0;
            border-radius: 5px;
            background-color: rgb(21, 122, 255);
            transition: width 0.3s ease-in-out;
        }
    }
}
</style>