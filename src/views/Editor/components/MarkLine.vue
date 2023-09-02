<template>
    <div class="mark-line x-line"
    v-for="line in xLines"
    :key="line.name"
    :style="{top: line.pos + 'px'}"
    v-show="line.isActived && markLineStore.onMoving"
    >
    </div>
    <div class="mark-line y-line"
    v-for="line in yLines"
    :key="line.name"
    :style="{left: line.pos + 'px'}"
    v-show="line.isActived && markLineStore.onMoving"
    >
    </div>
</template>

<script setup lang="ts">
import useMarkLineStore from '@/store/useMarkLineStore';
import { computed } from 'vue';

const markLineStore = useMarkLineStore();
const xLines = computed(() => markLineStore.curLines.filter(item => item.name[0] === 'x'));
const yLines = computed(() => markLineStore.curLines.filter(item => item.name[0] === 'y'));

</script>


<style scoped lang="less">

.mark-line {
    position: absolute;
    background-color: rgb(89, 186, 255);
    z-index: 2999;
}
.x-line {
    width: 100%;
    height: 1px;
}
.y-line {
    height: 100%;
    width: 1px;
}

</style>