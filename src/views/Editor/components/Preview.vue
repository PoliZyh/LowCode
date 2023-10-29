<template>
    <Teleport to="#app" >
        <div class="preview-box" v-show="isShow" >
            <el-button class="back" @click="isShow=false">返回</el-button>
            <div class="pad" ref="downloadDomRef">
                <div
                    v-for="(item, index) in componentStore.curComponents"
                    :key="item.componentName"
                    :style="getShapeStyle(item.style)"
                    class="container"
                    >
                    <component
                    :is="item.componentName"
                    :propValue="item.propValue"
                    :component-style="getCustomeComponentStyle(item.style)"
                    :zIndex="index"
                    ></component>
                </div>
            </div>
        </div>
    </Teleport>
    <Teleport to="#app">
        <div class="loading">

        </div>
    </Teleport>
</template>

<script setup lang="ts">
import useComponentsStore from '@/store/useComponentStore';
import useEditorRoutesStore from '@/store/useEditorRoutesStore';
import { getCustomeComponentStyle, getShapeStyle } from '@/utils/style';
import $bus from '@/utils/bus'
import { ref, onUnmounted, nextTick } from 'vue';
import { downloadPicture } from '@/utils/html2png';
import loading from '@/components/common/Loading/loading'
import type { ICustomeComponent } from "@/components/custome-components/types";


const componentStore = useComponentsStore()
const editorRoutesStore = useEditorRoutesStore()
const isShow = ref<boolean>(false)
const downloadDomRef = ref<HTMLDivElement>()

$bus.on('showPreview', (show: any) => {
    isShow.value = show.isShow as boolean
})

$bus.on('downloadUI', async (type: any) => {
    loading.startLoding()
    isShow.value = true
    await nextTick()
    const downLoadType = type.type as 'all' | 'cur'
    if (downLoadType === 'cur') {
        await downloadPicture(downloadDomRef.value)
    } else if (downLoadType == 'all') {
        // 遍历历史路由并设置为当前路由，随后再更改回来
        let routeKey: string;
        const curRouteComponent: ICustomeComponent[] = componentStore.curComponents;
        console.log(curRouteComponent)
        for(routeKey in editorRoutesStore.routesMap) {
            componentStore.setCurComponentsWithoutDeepCopy(editorRoutesStore.routesMap[routeKey].components)
            await downloadPicture(downloadDomRef.value)
        }
        componentStore.setCurComponentsWithoutDeepCopy(curRouteComponent)
    }
    isShow.value = false
    loading.endLoding()
})

onUnmounted(() => {
    $bus.off('*')
})

</script>


<style lang="less" scoped>
.preview-box {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(228, 228, 228, 0.745);
    z-index: 10000;
    top: 0;
    left: 0;
    padding: 30px;
    .back {
        position: absolute;
        left: 180px;
        top: 30px;
        color: rgb(66, 141, 255);
        cursor: pointer;
    }
    .pad {
        width: 932px;
        height: 729px;
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        .container {
            position: absolute;
        }
    }
}

</style>