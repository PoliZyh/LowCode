<template>
    <keep-alive>
        <RouterView v-if="route.meta.keepAlive"></RouterView>
    </keep-alive>
    <RouterView v-if="!route.meta.keepAlive"></RouterView>
</template>

<script setup lang="ts">

import { useRoute } from 'vue-router';


const route = useRoute();

</script>

<style scoped>

</style>
