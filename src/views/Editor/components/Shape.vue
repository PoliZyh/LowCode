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
        @mousedown="handleMouseDownOnPoint($event, item)"
        v-show="!props.el.other?.hasLocked"
        ></div>

        <!-- 上锁后的mask -->
        <div class="mask"
        v-show="props.el.other?.hasLocked"
        :style="getMaksStyle()"
        >
            <el-icon color="grey">
                <Lock />
            </el-icon>
        </div>

        <!-- 删除图标 -->
        <el-icon class="de-icon" v-show="props.isActive && !props.el.other?.hasLocked" @click="handleDelete">
            <Delete></Delete>
        </el-icon>

        <!-- 组件 -->
        <slot></slot>

    </div>
</template>


<script setup lang="ts">
import type { ICustomeComponent } from '@/components/custome-components/types';
import useComponentsStore from '@/store/useComponentStore';
import useSnapshotStore from '@/store/useSnapshotStore';
import useContextmenuStore from '@/store/useContextmenuStore';
import useMarkLineStore from '@/store/useMarkLineStore';

const pointList = ['t', 'r', 'b', 'l', 'lt', 'rt', 'rb', 'lb']
const componentStore = useComponentsStore()
const snapshotStore = useSnapshotStore()
const contextmenuStore = useContextmenuStore()
const markLineStore = useMarkLineStore()
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

// 处理mask的样式
const getMaksStyle = () => {
    const { width, height } = props.el.style
    return {
        width: width + 'px',
        height: height + 'px'
    }
}

// 点击组件事件
const handleClickComponent = (e: Event) => {
    // 点击当前组件时，激活该组件
    e.stopPropagation()
    componentStore.setActiveComponent(props.el)
}

const handleIsClickShape = (oldPos: {left: number; top: number;}, newPos: {left: number; top: number}): boolean => {
    return oldPos.left === newPos.left && oldPos.top === newPos.top
}

// 鼠标点下Shape事件 -> 移动
const handleMouseDownOnShape = (e: MouseEvent) => {
    if (props.el.other) {
        // 上锁后无法移动
        if (props.el.other.hasLocked) return
    }
    e.stopPropagation()
    // 激活当前组件
    componentStore.setActiveComponent(props.el)
    // 获取当前组件的位置
    const oldStyle = {...props.el.style}
    const { left, top } = oldStyle
    // 获取鼠标点击的位置
    const oldX = e.clientX
    const oldY = e.clientY
    let hasCloseContextmenu = false
    let hasSubmitMoved = false
    const move = (moveEvent: MouseEvent) => {
        // 避免多次触发
        !hasCloseContextmenu && contextmenuStore.deactiveContextmenu()
        !hasSubmitMoved && markLineStore.movingMarkLine()
        hasCloseContextmenu = true
        hasSubmitMoved = true
        const curX = moveEvent.clientX
        const curY = moveEvent.clientY
        oldStyle.left = curX - oldX + left
        oldStyle.top = curY - oldY + top
        componentStore.setActiveComponentStyle(oldStyle)
        markLineStore.activeLines()
    }

    const up = (mouseEvent: MouseEvent) => {
        // 判断是不是点击Shape，若不是则保存快照
        !handleIsClickShape({
            left: oldX,
            top: oldY
        },{
            left: mouseEvent.clientX,
            top: mouseEvent.clientY
        }) && snapshotStore.saveSnapshot({
            event: '移动',
            value: componentStore.curActiveComponent!.label
        })
        markLineStore.endMovingMarkLine()
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
}


// 鼠标点下Point事件 改变组件大小
const handleMouseDownOnPoint = (e: MouseEvent, point: string) => {
    e.stopPropagation()
    contextmenuStore.deactiveContextmenu()
    // 获取当前组件的大小
    const oldStyle = {...props.el.style}
    const { width, height, left, top } = oldStyle
    // 获取鼠标点击的位置
    const oldX = e.clientX
    const oldY = e.clientY
    let isSaved = false
    const move = (moveEvent: MouseEvent) => {
        const curX = moveEvent.clientX
        const curY = moveEvent.clientY
        const disX = curX - oldX
        const disY = curY - oldY
        const hasT = /t/.test(point)
        const hasL = /l/.test(point)
        const hasR = /r/.test(point)
        const hasB = /b/.test(point)
        const newHeight = height + (hasT ? -disY : hasB ? disY : 0)
        const newWidth = width + (hasL ? -disX : hasR ? disX : 0)
        const newLeft = left + (hasL ? disX : 0)
        const newTop = top + (hasT ? disY : 0)
        oldStyle.top = newTop
        oldStyle.left = newLeft
        oldStyle.width = newWidth
        oldStyle.height = newHeight
        componentStore.setActiveComponentStyle(oldStyle)
    }
    const up = () => {
        console.log('up')
        isSaved = true
        isSaved && snapshotStore.saveSnapshot({
            event: '大小',
            value: componentStore.curActiveComponent!.label
        })
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
}

// 删除组件事件
const handleDelete = () => {
    const label = componentStore.curActiveComponent?.label
    componentStore.removeComponent(componentStore.curActiveComponent)
    snapshotStore.saveSnapshot({
        event: '删除',
        value: label as string
    })
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
        z-index: 3001;
        cursor: pointer;
    }
    .de-icon {
        color: red;
        position: absolute;
        z-index: 3001;
        right: 0px;
        top: -30px;
        cursor: pointer;
    }
    .mask {
        position: absolute;
        z-index: 3002;
    }
}
.active {
    outline: 1px solid rgb(89, 186, 255);
    z-index: 3000;
}
</style>