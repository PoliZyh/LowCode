<template>
    <div class="m-button"
    :style="{'zIndex': props.zIndex}"
    >

        <button
        :style="props.componentStyle"
        :data-zindex="props.zIndex"
        >
            {{ props.propValue }}
        </button>

    </div>
</template>


<script setup lang="ts">

// props三个是必须的
// zIndex需要赋值给最外层以及携带给内部组件data-zindex


const props = defineProps<{
    propValue: string;
    componentStyle: any;
    zIndex: number;
}>();

</script>




<style lang="less" scoped>
.m-button {
    position: relative;
    button {
       border-style: solid;
    }
    button:hover {
        background-color: #ecf5ff !important;
        color: #409eff !important;
        border-color: #a0cfff !important;
    }
}
</style>