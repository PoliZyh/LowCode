<template>
    <div class="shape-box"
    :class="{'active': props.isActive}"
    @click="handleClickComponent"
    @mousedown="handleMouseDownOnShape"
    >
        <!-- 八个点 -->
        <div class="shape-point"
        v-for="item in (props.isActive ? pointList : [])"
        :key="item"
        :style="getPointStyle(item)"
        ></div>

        <div class="test"></div>

        <!-- 组件 -->
        <slot></slot>


    </div>
</template>


<script setup lang="ts">
import type { ICustomeComponent } from '@/components/custome-components/types';
import useComponentsStore from '@/store/useComponentStore';

const pointList = ['t', 'r', 'b', 'l', 'lt', 'rt', 'rb', 'lb']
const componentStore = useComponentsStore()
const props = defineProps<{
    isActive: boolean;
    el: ICustomeComponent
}>()

// 处理八个点的样式
const getPointStyle = (point: string) => {
    const { width, height } = props.el.style
    const hasT = /t/.test(point)
    const hasR = /r/.test(point)
    const hasB = /b/.test(point)
    const hasL = /l/.test(point)
    let pointL = 0
    let pointT = 0

    if (point.length === 2) {
        // 四个角的点
        pointL = hasL ? 0 : width
        pointT = hasT ? 0 : height
    } else {
        // 其余的点
        if (hasT || hasB) {
            pointL = width / 2
            pointT = hasT ? 0 : height
        }
        if (hasL || hasR) {
            pointT = height / 2
            pointL = hasL ? 0 : width
        }
    }

    return {
        marginLeft: hasR ? '-2px' : '-3px',
        marginTop:  hasB ? '-2px' : '-3px',
        left: pointL + 'px',
        top: pointT + 'px'
    }
}

// 点击组件事件
const handleClickComponent = (e: Event) => {
    // 点击当前组件时，激活该组件
    e.stopPropagation()
    componentStore.setActiveComponent(props.el)
}

// 鼠标点下Shape事件
const handleMouseDownOnShape = (e: MouseEvent) => {
    e.stopPropagation()
    // 激活当前组件
    componentStore.setActiveComponent(props.el)
    // 获取当前组件的位置
    const oldStyle = {...props.el.style}
    const { left, top } = oldStyle
    // 获取鼠标点击的位置
    const oldX = e.clientX
    const oldY = e.clientY
    const move = (moveEvent: MouseEvent) => {
        const curX = moveEvent.clientX
        const curY = moveEvent.clientY
        oldStyle.left = curX - oldX + left
        oldStyle.top = curY - oldY + top
        componentStore.setActiveComponentStyle(oldStyle)
    }

    const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
}

</script>



<style scoped lang="less">
.shape-box {
    position: absolute;
    .shape-point {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        position: absolute;
        background-color: white;
        border: 1px solid rgb(89, 186, 255);
        z-index: 3000;
    }
}
.active {
    outline: 1px solid rgb(89, 186, 255);
}
</style>