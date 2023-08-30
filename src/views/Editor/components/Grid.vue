<template>
    <div class="grid-box"
    @drop="handleDrop"
    @dragover="handleDragOver"
    @click="handleClickGrid"
    >

        <!-- 渲染画布上的组件 -->
        <Shape
        v-for="item in componentStore.curComponents"
        :key="item.componentName"
        :isActive="item === componentStore.curActiveComponent"
        :style="getShapeStyle(item.style)"
        :el="item"
        >
            <component
            :is="item.componentName"
            :propValue="item.propValue"
            :component-style="getCustomeComponentStyle(item.style)"
            ></component>
        </Shape>

    </div>
</template>


<script setup lang="ts">
import Shape from './Shape.vue';
import useComponentsStore from '@/store/useComponentStore';
import useSnapshotStore from '@/store/useSnapshotStore';
import { deepCopy } from '@/utils/deepCopy';
import { componentList } from '@/components/custome-components/component-list';
import { getCustomeComponentStyle, getShapeStyle } from '@/utils/style';
import type { ICustomeComponent } from '@/components/custome-components/types';

const componentStore = useComponentsStore();
const snapshotStore = useSnapshotStore();

// 松开拖拽的组件事件
const handleDrop = (e: DragEvent) => {
    // 阻止默认行为
    e.preventDefault();
    e.stopPropagation();
    // 根据索引拿到组件的默认数据，修改x、y坐标，提交到Store中
    const index = Number(e.dataTransfer?.getData('index')) || 0
    let component: ICustomeComponent = deepCopy(componentList[index])
    // 计算鼠标松开时，距离画布左侧和上侧的距离e.offset，并修改component
    component.style.top = e.offsetY
    component.style.left = e.offsetX
    componentStore.addComponent(component)
    // 设置当前激活的组件
    componentStore.setActiveComponent(component)
    // 快照
    snapshotStore.saveSnapshot()
}

const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
}

// 点击画布事件
const handleClickGrid = (e: Event) => {
    e.stopPropagation()
    // 点击画布时，将当前激活的组件设置为null
    componentStore.setActiveComponent(null)
}



</script>


<style scoped lang="less">
.grid-box {
    height: 100%;
    width: 100%;
    background-color: white;
    position: relative;

}
</style>