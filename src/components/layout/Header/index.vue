<template>
    <div class="header-box">
        <div class="header-icon">
            <img src="../../../assets/images/logo.png" alt="Logo" @click="router.push({name: 'Home'})">
        </div>
        <div class="header-content">
            <div class="nav">
                <div class="nav-item" v-for="item in props.data" :key="item.routePath" @click="handleRouter(item)">
                    <span>{{ item.title }}</span>
                </div>
            </div>
            <div class="ops" v-if="!userStore.token">
                <button @click="router.push({name: 'Login'})">登录 ｜ 注册</button>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

import { useRouter } from "vue-router";
import useUserStore from "@/store/useUserStore"

const router = useRouter()
const userStore = useUserStore()
const props = defineProps<{
    data: Array<IHeaderItem>
}>()

/**
 * navigation的路由
 */
const handleRouter = (item: IHeaderItem): void => {
    // 有path先根据path进行路由
    if(item.routePath) {
        router.push({
            path: item.routePath
        })
        return void 0;
    }
    router.push({
        name: item.routeName
    })
}
</script>


<style scoped lang="less">
.header-box {
    width: 100%;
    height: 70px;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border-c-week);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    gap: 50px;
    .header-icon {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            height: 60px;
            cursor: pointer;
        }
    }
    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        flex: 1;
        .nav {
            height: 100%;
            display: flex;
            align-items: center;
            .nav-item {
                height: 100%;
                cursor: pointer;
                background-color: white;
                color: black;
                transition: background-color 0.5s;
                transition: color 0.3s;
                position: relative;
                span {
                    padding: 0px 30px;
                    line-height: 70px;
                    font-size: 1.1rem;
                }
            }
            .nav-item:hover  {
                background-color: var(--background-c-week-blue);
                color: var(--title-c-normal-blue);
            }
            .nav-item::after {
                content: '';
                height: 2px;
                position: absolute;
                width: 0%;
                background-color: blue;
                left: 50%;
                transform: translateX(-50%);
                bottom: 0;
                transition: width 0.3s ease;
            }
            .nav-item:hover::after {
                width: 100%;
            }
        }
        .ops {
            button {
                border: 1px solid var(--theme-c-blue);
                padding: 5px 14px;
                color: var(--theme-c-blue);
                border-radius: 5px;
                font-size: 1rem;
            }
        }
    }
}
</style>