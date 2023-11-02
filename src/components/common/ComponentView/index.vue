<template>
    <div class="component-view-box" v-show="isShow" :style="{
        top: props.top + 'px'
    }">
        <component
        :is="listAll[listIndex].componentName"
        :propValue="listAll[listIndex].propValue"
        :component-style="getCustomeComponentStyle(listAll[listIndex].style)"
        :zIndex="listIndex"
        ></component>
    </div>
</template>


<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import $bus from '@/utils/bus';
import { listAll } from '@/components/custome-components/component-list'
import { getCustomeComponentStyle } from '@/utils/style';

const isShow = ref<boolean>(false)
const props = defineProps<{
    top: number;
    listIndex: number;
}>()

$bus.on('isShowComponentView', (val) => {
    isShow.value = val as boolean
})


onUnmounted(() => {
    $bus.off('*')
})


</script>


<style scoped lang="less">
.component-view-box {
    position: absolute;
    padding: 10px;
    background-color: white;
    left: 200px;
    z-index: 100000 !important;
    box-shadow: 0 0 10px 0px rgb(223, 223, 223);
    border-radius: 10px;
}
</style>