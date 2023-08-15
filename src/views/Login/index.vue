<template>
    <div class="login-page">

        <!-- 登录 / 注册盒子 -->
        <component :is="componentName"></component>

        <!-- 背景 -->
        <BackgroundDots />



    </div>
</template>



<script setup lang="ts">
import { ref } from "vue";
import BackgroundDots from "./components/BackgroundDots.vue";
import LoginBox from "./components/LoginBox.vue";


const componentName = ref(LoginBox)
</script>


<style lang="less" scoped>
.login-page {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>