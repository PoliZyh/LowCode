<template>
    <div class="tab-box">
        <div class="items">
            <div class="tab-item" v-for="tab in props.data" :ref="setTabItems" @click="handleClickItem(tab.key)">
                <div class="icon-box">
                    <el-icon :style="{color: tab.key === activeKey ? 'rgb(0, 115, 255)' : '' }"><component :is="tab.iconName" /></el-icon>
                </div>
                <p :style="{color: tab.key === activeKey ? 'rgb(0, 115, 255)' : '' }">{{ tab.title }}</p>
            </div>

        </div>
        <div class="line">
            <div class="swiper-line" ref="swiperLine"></div>
        </div>
    </div>
</template>


<script setup lang="ts">

import { onMounted, ref } from 'vue';

const tabItems = ref<HTMLDivElement[]>([]);
const activeKey = ref(0)
const swiperLine = ref<HTMLDivElement>()
const props = defineProps<{
    data: Array<ITabItem>
}>()

const setTabItems = (el: any) => {
    tabItems.value.push(el as HTMLDivElement)
}

const handleClickItem = (index: number) => {
    activeKey.value = index

    if (swiperLine.value) {
        swiperLine.value.style.setProperty('left', tabItems.value[index].offsetLeft + 'px')
        swiperLine.value.style.setProperty('width', tabItems.value[index].offsetWidth + 'px')
    }
}

onMounted(() => {
    handleClickItem(0)
})

</script>

<style scoped lang="less">
.tab-box {
    width: 100%;
    position: relative;
    .items {
        display: flex;
        gap: 23px;
        cursor: pointer;
        .tab-item {
            padding: 12px 0px;
            display: flex;
            gap: 5px;
            align-items: center;
            font-size: 1.2rem;
            font-weight: 400;
            .icon-box {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
    .line {
        width: 100%;
        height: 1px;
        background-color: rgb(227, 227, 227);
        position: relative;
        left: 0;
        .swiper-line {
            width: 0px;
            position: absolute;
            height: 2px;
            background-color: rgb(0, 115, 255);
            bottom: 0;
            left: 0%;
            transition: width 0.3s ease-in-out;
            transition: left 0.3s ease-in-out;
        }
    }
}
</style>