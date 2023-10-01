<template>
    <div class="loading-box" v-show="isVisible">
        <div class="loading">
            <div class="points">
                <div class="circle">
                    <div class="point"></div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">


defineProps({
    isVisible: {
        type: Boolean,
        default: false
    }
})

</script>


<style scoped lang="less">
.loading-box {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 7000;
    width: 100vw;
    height: 100vh;
    background-color: rgba(243, 243, 243, 0.62);
    .loading {
        position: absolute;
        top: 30vh;
        left: 50%;
        transform: translateX(-50%);
        .points {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 100px;
            border-radius: 20px;
            background-color: rgba(235, 235, 235, 0.917);
            .circle {
                width: 40%;
                height: 40%;
                border-radius: 50%;
                border: 5px solid white;
                position: absolute;
                animation: cir-rotate 2s linear infinite ;
                .point {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translate(-50%, -5px);
                    width: 5px;
                    height: 5px;
                    background-color: black;
                    border-radius: 50%;
                }
            }
            @keyframes cir-rotate {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }

        }
    }
}
</style>