<template>
    <div class="login-page">

        <!-- 登录 / 注册盒子 -->
        <component :is="componentName" @changeBox="handleChangeBox"></component>

        <!-- 背景 -->
        <BackgroundDots />



    </div>
</template>



<script setup lang="ts">
import { ref } from "vue";
import BackgroundDots from "./components/BackgroundDots.vue";
import LoginBox from "./components/LoginBox.vue";
import RegisterBox from "./components/RegisterBox.vue";

const componentName = ref<typeof LoginBox | typeof RegisterBox>(LoginBox)

/**
 *  切换LoginBox与RegisterBox
 */
const handleChangeBox = (key: string): void => {

    key === 'Login' ? componentName.value = LoginBox
    : key === 'Register' ? componentName.value = RegisterBox
    : key === ''
}

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