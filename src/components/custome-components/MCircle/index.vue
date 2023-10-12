<template>
    <div class="m-circle"
    :style="{
        ...props.componentStyle,
        zIndex: props.zIndex
    }"
    :data-zindex="props.zIndex"
    >
    </div>
</template>


<script setup lang="ts">


const props = defineProps<{
    propValue: string;
    componentStyle: any;
    zIndex: number;
}>();

</script>


<style scoped lang="less">
.m-circle {
    position: relative;
}
</style>