<template>
    <div class="common-attr-box">
        <template v-if="componentStore.curActiveComponent">
            <div class="attr-item"
            v-for="item in getCommonAttrInputStyle(componentStore.curActiveComponent.style)"
            :key="item.label"
            >
                <span>{{ item.label }}</span>
                <el-input
                v-if="item.inputType === 'number'"
                :type="item.inputType"
                :min="0"
                v-model.number="componentStore.curActiveComponent.style[item.key]"
                ></el-input>

                <div
                v-else-if="item.inputType === 'colorPicker'"
                style="flex: 7;"
                class="e-color-picker">
                    <el-color-picker
                    v-model="componentStore.curActiveComponent.style[item.key]"
                    ></el-color-picker>
                </div>

                <el-select
                v-else-if="item.inputType === 'select'"
                v-model="componentStore.curActiveComponent.style[item.key]"
                >
                    <el-option
                    v-for="option in item.selectOptions"
                    :key="option.label"
                    :value="option.value"
                    :label="option.label"
                    ></el-option>

                </el-select>

            </div>
        </template>
    </div>
</template>


<script setup lang="ts">
import useComponentsStore from '@/store/useComponentStore';
import { getCommonAttrInputStyle } from '@/utils/style';

const componentStore = useComponentsStore()




</script>


<style lang="less" scoped>
.common-attr-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .attr-item {
        display: flex;
        align-items: center;
        span {
            flex: 3;
            display: flex;
            justify-content: center;
        }
        .el-input, .e-color-picker .el-select {
            flex: 7 !important;
        }

    }
}
</style>



