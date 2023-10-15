<template>
    <div class="context-menu-box"
    :style="style"
    v-show="contextmenuStore.isActive"
    >
        <ul>
            <li @click="handleMoveUpOneLayer()" v-permission="'up'">上移一层</li>
            <li @click="handleMoveDownOneLayer()" v-permission="'down'">下移一层</li>
            <li @click="handleMoveToTop()" v-permission="'top'">置顶</li>
            <li @click="handleMoveToBottom()" v-permission="'bottom'">置底</li>
            <li @click="handleCopy()" v-permission="'copy'">复制</li>
            <li @click="handleCut()" v-permission="'cut'">剪切</li>
            <li @click="handleLock()" v-permission="'lock'">上锁</li>
            <li @click="handleUnlock()" v-permission="'unlock'">解锁</li>
            <li @click="handlePaste($event)" :class="{'disabled': !contextmenuStore.clipBoard}" v-permission="'paste'">粘贴</li>
        </ul>
    </div>
</template>


<script setup lang="ts">
import { computed, } from 'vue';
import useContextmenuStore from '@/store/useContextmenuStore';
import useComponentsStore from '@/store/useComponentStore';
import useSnapshotStore from '@/store/useSnapshotStore';


const contextmenuStore = useContextmenuStore()
const componentsStore = useComponentsStore()
const snapshotStore = useSnapshotStore()
const props = defineProps<{
    left: number;
    top: number;
}>()

const style = computed(() => {
    return {
        left: props.left + 'px',
        top: props.top + 'px',
    }
})

// 上移一层
const handleMoveUpOneLayer = () => {
    contextmenuStore.deactiveContextmenu()
    componentsStore.upActiveComponentOneLayer()
    snapshotStore.saveSnapshot({
        event: '上移',
        value: componentsStore.curActiveComponent!.label
    })
}

// 下移一层
const handleMoveDownOneLayer = () => {
    contextmenuStore.deactiveContextmenu()
    componentsStore.downActiveComponentOneLayer()
    snapshotStore.saveSnapshot({
        event: '下移',
        value: componentsStore.curActiveComponent!.label
    })
}

// 置顶
const handleMoveToTop = () => {
    contextmenuStore.deactiveContextmenu()
    componentsStore.upActiveComponentToTop()
    snapshotStore.saveSnapshot({
        event: '置顶',
        value: componentsStore.curActiveComponent!.label
    })
}

// 置底
const handleMoveToBottom = () => {
    contextmenuStore.deactiveContextmenu()
    componentsStore.downActiveComponentToBottom()
    snapshotStore.saveSnapshot({
        event: '置底',
        value: componentsStore.curActiveComponent!.label
    })
}

// 复制
const handleCopy = () => {
    contextmenuStore.deactiveContextmenu()
    contextmenuStore.copyComponent()
}

// 粘贴
const handlePaste = (e: MouseEvent) => {
    if (!contextmenuStore.clipBoard) return
    // 鼠标落下相对于canvas的位置
    const newX = e.clientX - 210
    const newY = e.clientY - 76
    contextmenuStore.deactiveContextmenu()
    contextmenuStore.pasteComponent(newX, newY)
    snapshotStore.saveSnapshot({
        event: '粘贴',
        value: componentsStore.curActiveComponent!.label
    })
}

// 剪切
const handleCut = () => {
    contextmenuStore.deactiveContextmenu()
    contextmenuStore.cutComponent()
    snapshotStore.saveSnapshot()
}

// 上锁
const handleLock = () => {
    if (componentsStore.curActiveComponent) {
        componentsStore.curActiveComponent.other = {
            ...componentsStore.curActiveComponent.other,
            hasLocked: true
        }
    }
    contextmenuStore.deactiveContextmenu()
    snapshotStore.saveSnapshot({
        event: '上锁',
        value: componentsStore.curActiveComponent!.label
    })
}

// 解锁
const handleUnlock = () => {
    if (componentsStore.curActiveComponent) {
        componentsStore.curActiveComponent.other = {
            ...componentsStore.curActiveComponent.other,
            hasLocked: false
        }
    }
    contextmenuStore.deactiveContextmenu()
    snapshotStore.saveSnapshot({
        event: '解锁',
        value: componentsStore.curActiveComponent!.label
    })
}

</script>


<style lang="less" scoped>
.context-menu-box {
    position: absolute;
    left: 400px;
    top: 100px;
    z-index: 4000;
    ul {
        --b-c: rgb(239, 239, 239);
        list-style: none;
        text-align: center;
        border: 1px solid var(--b-c);
        box-shadow: 0 0 10px 3px rgb(238, 238, 238);
        font-size: 0.8rem;
        li {
            padding: 7px 7px;
            cursor: pointer;
            background-color: #fff;
            width: 62px;
        }
        li:not(:first-child) {
            border-top: 1px solid var(--b-c);
        }
        li:hover {
            background-color: rgb(241, 245, 246);
        }
        .disabled {
            background-color: rgb(244, 244, 244) !important;
            color: grey;
            opacity: 0.7;
            cursor: auto !important;
        }
    }
}
</style>