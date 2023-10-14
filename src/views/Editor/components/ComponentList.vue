<template>
    <div class="component-list-box" >

        <div class="scroll-box"
        :style="{
            height: isShowHistory ? 'calc(100% - 300px);' : '100%'
        }">
            <el-collapse>
                <el-collapse-item title="基础组件">
                    <div class="row">
                        <div class="component-item"
                        v-for="(item, index) in componentList"
                        :key="item.componentName"
                        :data-index="index"
                        draggable="true"
                        @dragstart="handleDragStart"
                        >
                            {{ item.label }}
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="基础形状">
                    <div class="row">
                        <div class="component-item"
                        v-for="(item, index) in shapeList"
                        :key="item.componentName"
                        :data-index="index + componentList.length"
                        draggable="true"
                        @dragstart="handleDragStart">
                        {{ item.label }}
                        </div>
                    </div>
                </el-collapse-item>

            </el-collapse>
        </div>

        <div class="history" v-if="isShowHistory">
            <History></History>
        </div>

    </div>
</template>


<script setup lang="ts">
import { componentList, shapeList } from '@/components/custome-components/component-list';
import { ElMessage } from 'element-plus';
import History from './History.vue'
import { onUnmounted, ref } from 'vue';
import $bus from '@/utils/bus';

const isShowHistory = ref<boolean>(false)

$bus.on('changeShowHistory', (newVal: any) => {
    isShowHistory.value = newVal as boolean
})

onUnmounted(() => {
    $bus.off('*')
})

const handleDragStart = (e: DragEvent) => {
    e.stopPropagation()
    const target = e.target as HTMLDivElement;
    // 设置传输数据 index 即为当前的组件在componentList中的索引
    if (e.dataTransfer) {
        e.dataTransfer.setData('index', target.dataset.index as string);
    } else {
        ElMessage({
            type: 'warning',
            message: '当前浏览器不支持拖拽'
        })
    }
}
</script>


<style scoped lang="less">
.component-list-box {
    width: 200px;
    height: 100%;
    background-color: white;
    border-right: 1px solid var(--border-c-deep);
    padding: 10px 10px;
    position: relative;
    .scroll-box {
        overflow: scroll;
    }
    .row {
        display: flex;
        justify-content: space-around;
        .component-item {
            height: fit-content;
            padding: 7px 15px;
            font-size: 0.8rem;
            border: 1px solid rgb(213, 213, 213);
            cursor: grab;
            background-color: white;
            position: relative;
            width: 40%;
            text-align: center;

        }
    }
    .history {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 300px;
        left: 0;
        padding: 10px;
        background-color: white;
    }
}
</style>