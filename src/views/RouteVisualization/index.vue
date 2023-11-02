<template>
    <div class="route-visualization-page">
        <el-row class="header">
            <el-icon class="icon" @click="handleBack"><DArrowLeft /></el-icon>
            <span @click="handleBack">返回</span>
        </el-row>
        <el-row class="rvr">
            <div class="rv">
                <div class="chart" ref="myChart"></div>
            </div>
        </el-row>
    </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue';
import * as echart from 'echarts'
import type { IRoutesMap } from '@/store/types'
import useEditorRoutesStore from '@/store/useEditorRoutesStore'

const router = useRouter()
const myChart = ref<HTMLDivElement>()
const editorRoutesStore = useEditorRoutesStore()

interface IRouteVisualization {
    name: string;
    value?: string;
    children?: IRouteVisualization[];
}

const option = {
    title: {
        text: '路由可视化',
    },
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
    },
    series: [{
        type: 'tree',
        roam: true,
        layout: 'orthogonal',
        orient: 'LR',
        symbol: 'emptyCircle',
        symbolSize: 10,
        left: 80,
        right: 200,
        initialTreeDepth: 5,
        label: {
            show: true,
            offset: [10, 0],
            align: 'left',
        },
        tooltip: {
            formatter: function(params: any) {
                return params.value.replace(/\/r\/n/g, '<br />')
            }
        },
        data: [{
            name: 'xxx界面',
            value: 'xxx界面',
            children: convertRoutesMapToVisualization(editorRoutesStore.routesMap)
        }]
    }]
};


function convertRoutesMapToVisualization(routesMap: IRoutesMap): IRouteVisualization[] {
    const result: IRouteVisualization[] = [];

    for (const key in routesMap) {
        const route = routesMap[key];
        const segments = key.split('/').filter(Boolean);
        let currentLevel = result;

        segments.forEach((segment, index) => {
            const existing = currentLevel.find(item => item.name === segment);

            if (existing) {
                if (index === segments.length - 1) {
                    existing.value = route.pageName;
                }
                currentLevel = existing.children || [];
            } else {
                const newRoute: IRouteVisualization = {
                    name: segment,
                    children: [],
                };

                if (index === segments.length - 1) {
                    newRoute.value = route.pageName;
                }

                currentLevel.push(newRoute);
                currentLevel = newRoute.children ? newRoute.children : [];
            }
        });
    }

    return result;
}









const handleBack = () => {
    router.go(-1)
}


onMounted(() => {
    const chart = echart.init(myChart.value)
    chart.setOption(option)

    console.log(convertRoutesMapToVisualization(editorRoutesStore.routesMap))
})


</script>


<style scoped lang="less">
.route-visualization-page {
    width: 100vw;
    height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    .header {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 1.4rem;
        color: #409eff;
        span {
            cursor: pointer;
         }
    }
    .icon {
        color: #409eff;
        font-size: 2rem;
        cursor: pointer;
    }
    .rvr {
        flex: 1;
        padding: 20px;
    }
    .rv {
        width: 100%;
        height: 100%;
        .chart {
            width: 100%;
            height: 100%;
        }
    }
}
</style>