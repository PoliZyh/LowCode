<template>
    <div class="history-box">
        <p class="title">历史记录</p>
        <div class="row">
            <template v-if="snapshotStore.history.length === 0">
                <p>
                    暂无历史记录
                </p>
            </template>
            <template v-else>
                <p v-for="(item, index) in snapshotStore.history" :key="item + `${index}`">
                    <span>{{ item.event }}</span>
                    <span>{{ item.value }}</span>
                </p>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import useSnapshotStore from '@/store/useSnapshotStore'

const snapshotStore = useSnapshotStore()




</script>


<style scoped lang="less">
.history-box {
    width: 100%;
    height: 100%;
    z-index: 200;
    overflow: scroll;
    .title {
        position: sticky;
        top: 0;
        background-color: white;
        border-bottom: 1px solid rgb(224, 224, 224);
        border-top: 1px solid rgb(224, 224, 224);
        padding: 10px;
    }
    .row {
        width: 100%;
        p {
            color: grey;
            font-weight: 200;
            display: flex;
            justify-content: space-around;
            line-height: 30px;
            border-bottom: 1px solid rgb(240, 240, 240);
        }
    }
}
</style>