<template>
    <div class="m-text"
    :style="{'zIndex': props.zIndex}"
    >
        <span
        :style="props.componentStyle"
        :data-zindex="props.zIndex"
        v-show="!isEdit"
        @dblclick="handleToEdit"
        >{{ props.propValue }}</span>
        <!-- 双击编辑文字 -->
        <template v-if="componentsStore.curActiveComponent">
            <textarea type="text"
            :style="props.componentStyle"
            v-show="isEdit"
            v-model="(componentsStore.curActiveComponent.propValue as string)"
            @blur="handleToView"
            class="edit">
            </textarea>
        </template>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import useComponentsStore from '@/store/useComponentStore';

const props = defineProps<{
    propValue: string;
    componentStyle: any;
    zIndex: number;
}>()
const isEdit = ref<boolean>(false)
const componentsStore = useComponentsStore()

// 双击编辑
const handleToEdit = () => {
    isEdit.value = true
}
// 编辑input失焦
const handleToView = () => {
    isEdit.value = false
}

</script>


<style lang="less" scoped>
.m-text {
    position: relative;
    span {
        display: block;
        width: fit-content;
    }
    .edit {

    }
}
</style>