<template>
    <div class="m-button">

        <button
        :style="props.componentStyle"
        >
            {{ props.propValue }}
        </button>

    </div>
</template>


<script setup lang="ts">




const props = defineProps<{
    propValue: string;
    componentStyle: any;
}>();

</script>




<style lang="less" scoped>
.m-button {
    position: relative;
    button {
       border-style: solid;
    }
}
</style>