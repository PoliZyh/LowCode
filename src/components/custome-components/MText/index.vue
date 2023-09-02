<template>
    <div class="m-text"
    :style="{'zIndex': props.zIndex}"
    >
        <span
        :style="props.componentStyle"
        :data-zindex="props.zIndex"
        >{{ props.propValue }}</span>
    </div>
</template>


<script setup lang="ts">

const props = defineProps<{
    propValue: string;
    componentStyle: any;
    zIndex: number;
}>()

</script>


<style lang="less" scoped>
.m-text {
    position: relative;
    span {
        display: block;
        width: fit-content;
    }
}
</style>