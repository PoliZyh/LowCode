<template>
    <div v-if="props.isShow"  class="json-drawer-box">
        <el-drawer
        direction="rtl"
        v-model="props.isShow"
        @close="handleClose"
        >
            <template #header>
                <h4>修改JSON</h4>
            </template>
            <template #default>
                <json-editor-vue class="editor" v-model="styleValue" style="height: 100%;" />
            </template>
        </el-drawer>

    </div>
</template>



<script setup lang="ts">
import JsonEditorVue from 'json-editor-vue3';
import useComponentsStore from '@/store/useComponentStore';
import { computed } from 'vue';

const componentStore = useComponentsStore()

const props = defineProps<{
    isShow: boolean;
}>()
const emits = defineEmits<{
    (e: 'update:isShow', val: boolean): void
}>()

const styleValue = computed({
    get: () => componentStore.curActiveComponent ? componentStore.curActiveComponent.style : {},
    set: (newValue: any) => {
        if (componentStore.curActiveComponent) {
            componentStore.curActiveComponent.style = newValue;
        }
    }
});

const handleClose = () => {
    emits('update:isShow', false)
}
</script>


<style scoped lang="less">
// .json-drawer-box {
//     position: relative;
//     z-index: 5000 !important;
// }
</style>