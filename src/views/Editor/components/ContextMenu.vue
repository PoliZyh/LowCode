<template>
    <div class="context-menu-box"
    :style="style"
    v-show="contextmenuStore.isActive"
    >
        <ul>
            <li @click="handleMoveUpOneLayer()">上移一层</li>
            <li @click="handleMoveDownOneLayer()">下移一层</li>
            <li @click="handleMoveToTop()">置顶</li>
            <li @click="handleMoveToBottom()">置底</li>
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
    snapshotStore.saveSnapshot()
}

// 下移一层
const handleMoveDownOneLayer = () => {
    contextmenuStore.deactiveContextmenu()
    componentsStore.downActiveComponentOneLayer()
    snapshotStore.saveSnapshot()
}

// 置顶
const handleMoveToTop = () => {
    contextmenuStore.deactiveContextmenu()
    componentsStore.upActiveComponentToTop()
    snapshotStore.saveSnapshot()
}

// 置底
const handleMoveToBottom = () => {
    contextmenuStore.deactiveContextmenu()
    componentsStore.downActiveComponentToBottom()
    snapshotStore.saveSnapshot()
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
        }
        li:not(:first-child) {
            border-top: 1px solid var(--b-c);
        }
        li:hover {
            background-color: rgb(241, 245, 246);
        }
    }
}
</style>