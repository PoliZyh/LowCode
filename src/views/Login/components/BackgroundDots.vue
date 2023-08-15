<template>
    <div class="background-dots-box">
        <div class="dot" v-for="i in dotNum" :key="i" :ref="setDot"></div>
    </div>
</template>



<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const dots = ref<Array<HTMLDivElement>>([])

const dotNum = computed(() => {
    return Math.floor(window.innerHeight / 10);
})

const setDot = (el: any): void => {
    dots.value.push(el as HTMLDivElement)
}

/**
 * 初始化dots
 */
const initDots = (): void => {
    dots.value.forEach((el) => {
        const delay = Math.random() + 's'
        const color = `hsl(${Math.random()*360}, 50%, 50%)`
        el.style.setProperty('--delay', delay)
        el.style.setProperty('--bg-c', color)
    })
}

onMounted(() => {
    initDots()
})



</script>


<style lang="less" scoped>
.background-dots-box {
    position: fixed;
    z-index: -100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .dot {
        --delay: 0s;
        --bg-c: white;
        background-color: var(--bg-c);
        height: 5px;
        width: 5px;
        border-radius: 50%;
        animation: dot-up 3s infinite ease-out;
        animation-delay: var(--delay);
    }
    @keyframes dot-up {
        to {
            transform: translateY(-100vh);
        }
    }
}
</style>