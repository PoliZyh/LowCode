<template>
    <div class="project-card-box">
        <div class="card-header card-item" @click="handleViewEditor">
            <span>{{ props.info.name }}</span>
            <el-icon><ArrowRight /></el-icon>
        </div>
        <div class="card-content card-item">
            <span>项目简介</span>
            <span>{{ props.info.description }}</span>
        </div>
        <div class="card-bottom card-item">
            <div class="ops-item">
                <el-icon style="color: rgb(0, 123, 255)"><View /></el-icon>
            </div>
            <div class="ops-item">
                <el-icon style="color: red;"><Delete /></el-icon>
            </div>
            <div class="ops-item">
                <el-icon style="color: orange;"><Operation /></el-icon>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { IProjectInfoItem } from '../../types'

const router = useRouter()
const props = defineProps<{
    info: IProjectInfoItem
}>()

const handleViewEditor = () => {
    router.push({
        name: 'Editor'
    })
}

</script>


<style lang="less" scoped>
.project-card-box {
    width: 300px;
    height: 250px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: 0 0 10px 3px rgba(219, 219, 219, 0.738);
    .card-header {
        display: flex;
        height: 18%;
        font-size: 1.3rem;
        justify-content: space-between;
        align-items: center;
        padding-top: 5px;
    }
    .card-content {
        height: 64%;
        padding-top: 10px!important;
        display: flex;
        flex-direction: column;
        gap: 10px;
        span:first-child {
            font-size: 1.4rem;
            font-weight: 500;
        }
        span:last-child {
            font-size: 0.9rem;
            color: grey;
        }
        span {
            white-space: pre-wrap;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
            overflow: hidden;
        }
    }
    .card-bottom {
        height: 18%;
        display: flex;
        padding: 0!important;
        .ops-item {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

        }
        .ops-item:hover {
            background-color: rgba(237, 237, 237, 0.601);
        }
    }
    .card-item {
        padding: 0px 15px;
    }
    .card-item:first-child:hover {
        background-color: rgba(237, 237, 237, 0.601);
        cursor: pointer;
    }

}

</style>