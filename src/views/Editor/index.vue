<template>
    <div class="editor-page">

        <!-- 顶部选择区域 -->
        <OptionsList></OptionsList>

        <!-- 中间编辑区域 -->
        <main>

            <div class="main-item left">
                <ComponentList></ComponentList>
            </div>

            <div class="main-item center">
                <Grid></Grid>
            </div>

            <div class="main-item right">
                <AttrList></AttrList>
            </div>

        </main>


    </div>
</template>


<script setup lang="ts">
import OptionsList from "./components/OptionsList.vue";
import ComponentList from "./components/ComponentList.vue";
import Grid from "./components/Grid.vue";
import AttrList from "./components/AttrList.vue";


</script>

<style scoped lang="less">
.editor-page {
    width: 100%;
    height: 100%;

    main {
        height: calc(100% - 66px);
        position: relative;
        .main-item {
            height: 100%;
        }
        .left {
            position: absolute;
            left: 0;
            top: 0;
        }
        .center {
            margin-left: 200px;
            margin-right: 288px;
            padding: 10px;
            background-color: rgb(239, 239, 239);
        }
        .right {
            position: absolute;
            right: 0;
            top: 0;
        }

    }

}
</style>