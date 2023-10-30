<template>
    <div class="grid-box"
    ref="gridBox"
    @drop="handleDrop"
    @dragover="handleDragOver"
    @click="handleClickGrid"
    :style="gridStyle"
    >

        <!-- 渲染画布上的组件 -->
        <Shape
        v-for="(item, index) in componentStore.curComponents"
        :key="item.componentName"
        :isActive="item === componentStore.curActiveComponent"
        :style="getShapeStyle(item.style)"
        :el="item"
        >
            <component
            :is="item.componentName"
            :propValue="item.propValue"
            :component-style="getCustomeComponentStyle(item.style)"
            :zIndex="index"
            ></component>
        </Shape>

        <!-- 吸附标线 -->
        <MarkLine></MarkLine>

        <!-- 预览组件 -->
        <Preview></Preview>

        <GridBackground></GridBackground>

    </div>

    <!-- 右键弹窗 -->
    <ContextMenu
    :left="contextMenuPos.x"
    :top="contextMenuPos.y"
    ></ContextMenu>


</template>


<script setup lang="ts">
import Shape from './Shape.vue';
import ContextMenu from './ContextMenu.vue'
import MarkLine from './MarkLine.vue'
import GridBackground from './GridBackground.vue';
import useComponentsStore from '@/store/useComponentStore';
import useSnapshotStore from '@/store/useSnapshotStore';
import useContextmenuStore from '@/store/useContextmenuStore';
import { deepCopy } from '@/utils/deepCopy';
import { componentList, shapeList } from '@/components/custome-components/component-list';
import { getCustomeComponentStyle, getShapeStyle } from '@/utils/style';
import type { ICustomeComponent } from '@/components/custome-components/types';
import type { ICanvasAttr } from '@/components/common/types';
import { onMounted, ref, reactive, computed, onUnmounted } from 'vue';
import Preview from './Preview.vue';
import $bus from '@/utils/bus';

const componentStore = useComponentsStore();
const snapshotStore = useSnapshotStore();
const contextmenuStore = useContextmenuStore();
const canvasParams = ref<ICanvasAttr>({
    transparency: 1,
    backgroundColor: '#ffffff',
    height: 740,
    width: 1200
})

const gridBox = ref<HTMLElement | null>(null);
const contextMenuPos = reactive({ x: 0, y: 0 })
const gridStyle = computed(() => {
    return {
        backgroundColor: canvasParams.value.backgroundColor,
        opacity: canvasParams.value.transparency,
        height: canvasParams.value.height + 'px',
        width: canvasParams.value.width + 'px'
    }
})

const allComponentList = [
    ...componentList,
    ...shapeList
]

$bus.on('update:CanvasAttr', (data: any) => {
    canvasParams.value = data as ICanvasAttr
})

// 松开拖拽的组件事件
const handleDrop = (e: DragEvent) => {
    // 阻止默认行为
    e.preventDefault();
    e.stopPropagation();
    // 根据索引拿到组件的默认数据，修改x、y坐标，提交到Store中
    const index = Number(e.dataTransfer?.getData('index')) || 0
    let component: ICustomeComponent = deepCopy(allComponentList[index])
    // 计算鼠标松开时，距离画布左侧和上侧的距离e.offset，并修改component
    component.style.top = e.offsetY
    component.style.left = e.offsetX
    componentStore.addComponent(component)
    // 设置当前激活的组件
    componentStore.setActiveComponent(null)
    componentStore.setActiveComponent(component)
    // 快照
    snapshotStore.saveSnapshot({
        event: '新增',
        value: componentStore.curActiveComponent!.label
    })
}

const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
}

// 点击画布事件
const handleClickGrid = (e: Event) => {
    e.stopPropagation()
    // 点击画布时，将当前激活的组件设置为null,
    componentStore.setActiveComponent(null)
}

onMounted(() => {
    // grid挂载时候对组件右键弹出contextmenu进行处理
    gridBox.value!.oncontextmenu = async (e: MouseEvent) => {
        e.preventDefault()
        contextmenuStore.deactiveContextmenu()
        contextmenuStore.activeContextmenu()
        contextMenuPos.x = e.clientX
        contextMenuPos.y = e.clientY - 56 // 修正高度
    }
})

onUnmounted(() => {
    $bus.off('*')
})

</script>


<style scoped lang="less">
.grid-box {

    // background-color: white;
    position: relative;
    z-index: 0;
}

</style>