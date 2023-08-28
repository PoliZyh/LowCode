<template>
    <div class="m-button">
        <el-button v-if="props.type === 'e'" :style="props.componentStyle">{{ props.propValue }}</el-button>
        <a-button v-else-if="props.type === 'a'">{{ props.propValue }}</a-button>
        <button v-else>{{ props.propValue }}</button>
    </div>
</template>


<script setup lang="ts">


const props = defineProps<{
    propValue: string;
    type: 'e' | 'a' | 'm';
    componentStyle: any;
}>();

</script>


<style lang="less" scoped>
.m-button {
    position: relative;
}
</style>