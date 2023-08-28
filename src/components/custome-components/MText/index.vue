<template>
    <div class="m-text">
        <span>{{ props.propValue }}</span>
    </div>
</template>


<script setup lang="ts">

const props = defineProps<{
    propValue: string;
    componentStyle: any;
}>()

</script>


<style lang="less" scoped>
.m-text {
    position: relative;
    span {
        width: fit-content;
    }
}
</style>