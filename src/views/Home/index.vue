<template>
    <div class="home-page">
        <!-- 头部 -->
        <Header></Header>

        <!-- 流动大屏 -->
        <div class="stage-welcome">
            <div class="inner-header flex">
                <Transition name="title">
                    <h1 v-if="isShowStageWelcomeTitle">FlexiWeb 让编码更简单</h1>
                </Transition>
                <Transition name="btn">
                    <button v-if="isShwoStageWelcomeBtn">Try Me</button>
                </Transition>
            </div>
            <div>
                <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave"
                            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g class="parallax">
                        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                        <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                        <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                        <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
                    </g>
                </svg>
            </div>
        </div>


    </div>
</template>


<script setup lang="ts">
import Header from "@/components/layout/Header/index.vue";
import { onMounted, onUnmounted, ref } from "vue";


const isShowStageWelcomeTitle = ref<boolean>(false)
const isShwoStageWelcomeBtn = ref<boolean>(false)

onMounted(() => {
    // 挂在时显示组件 触发动画
    isShowStageWelcomeTitle.value = true
    setTimeout(() => {
        isShwoStageWelcomeBtn.value = true
    }, 1000);
})


onUnmounted(() => {
    // 卸载时隐藏组件 关闭动画
    isShowStageWelcomeTitle.value = false
    isShwoStageWelcomeBtn.value = false
})
</script>


<style scoped lang="less">
.home-page {

    .stage-welcome {
        position: relative;
        text-align: center;
        background: linear-gradient(to right, rgba(84, 58, 183, 1) , rgb(0, 109, 193) , rgb(38, 114, 196));
        background-size: 400%;
        color: white;
        animation: bg-move 5s ease-in-out infinite alternate;

        .inner-header {
            height: 65vh;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.2rem;
            flex-direction: column;
            gap: 30px;
            .block {
                font-size: 1.2rem;
            }
            h1 {
                position: relative;
            }
            button {
                color: white;
                font-size: 2rem;
                border: 1px solid white;
                padding: 10px 30px;
                border-radius: 10px;
            }
        }
    }

    @keyframes bg-move {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 100% 0;
        }
    }
    .waves {
        position: relative;
        width: 100%;
        height: 15vh;
        margin-bottom: -7px;
        /*Fix for safari gap*/
        min-height: 100px;
        max-height: 150px;

        .parallax>use {
            animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
        }

        .parallax>use:nth-child(1) {
            animation-delay: -2s;
            animation-duration: 7s;
        }

        .parallax>use:nth-child(2) {
            animation-delay: -3s;
            animation-duration: 10s;
        }

        .parallax>use:nth-child(3) {
            animation-delay: -4s;
            animation-duration: 13s;
        }

        .parallax>use:nth-child(4) {
            animation-delay: -5s;
            animation-duration: 20s;
        }

    }

    @keyframes move-forever {
        0% {
            transform: translate3d(-90px, 0, 0);
        }

        100% {
            transform: translate3d(85px, 0, 0);
        }
    }



}

.title-enter-active,
.title-leave-active {
    transition: all 1s ease;
}

.title-enter-from,
.title-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.btn-enter-active,
.btn-leave-active {
    transition: all 1s ease;
}

.btn-enter-from,
.btn-leave-to {
    opacity: 0;
}

</style>