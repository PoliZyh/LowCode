<template>
    <div class="help-doc-box">
        <div class="doc-list">
            <div class="doc-kind" v-for="item in docData" :key="item.title">
                <span class="kind-title">{{ item.title }}</span>
                <div class="doc-child"
                v-for="child in item.children"
                :key="child.title">
                    <span
                    :style="{'color': activeTitle === child.title ? 'var(--title-c-normal-blue' : ''}"
                    @click="handleClickTitle(child)">
                        {{ child.title }}
                    </span>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="md-show">
                <v-md-preview :text="activeContent" height="400px"></v-md-preview>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IDocItem, IDocChild } from '../types';
import { onMounted, reactive, ref } from 'vue';

import IntroductionThanks from './docs/introduction_thanks.md?raw'
import IntroductionAuthor from './docs/introduction_author.md?raw'
import IntroductionPlateform from './docs/introduction_plateform.md?raw'
import TechnologyComponentDesign from './docs/technology_component-design.md?raw'
import FuncComponent from './docs/component_func.md?raw'
import { useRoute, useRouter } from 'vue-router';

const docData: IDocItem[] = reactive([
    {
        title: '介绍',
        children: [
            {
                title: '致谢',
                content: IntroductionThanks
            },
            {
                title: '作者',
                content: IntroductionAuthor
            },
            {
                title: '平台',
                content: IntroductionPlateform
            }
        ]
    },
    {
        title: '使用',
        children: [
            {
                title: '项目开发',
                content: ''
            }
        ]
    },
    {
        title: '平台实现',
        children: [
            {
                title: '组件设计',
                content: TechnologyComponentDesign
            },
            {
                title: '组件功能',
                content: FuncComponent
            },
            {
                title: '敬请期待',
                content: '# 持续更新ing...'
            }
        ]
    }
])
const activeTitle = ref('')
const activeContent = ref('')
const router = useRouter()
const route = useRoute()
onMounted(() => {
    if (Object.keys(route.query).length > 0) {
        const query = route.query
        docData.forEach(item => {
            const filterItem = item.children.find(child => child.title === query.title)
            if (filterItem) {
                activeTitle.value = filterItem.title
                activeContent.value = filterItem.content
            }
        })
    } else {
        handleClickTitle(docData[0].children[0])
    }
})

const handleClickTitle = (child: IDocChild) => {
    activeTitle.value = child.title
    activeContent.value = child.content
    router.push({
        query: {
            title: child.title
        }
    })

}
</script>


<style scoped lang="less">
.help-doc-box {
    display: flex;
    height: 100%;
    height: calc(100vh - 70px);
    background-color: white;
    flex: 1;
    border-left: 1px solid var(--border-c-week);
    width: 80%;
    .doc-list {
        width: 15%;
        height: 100%;
        padding: 40px 0px 0px 40px;
        display: flex;
        flex-direction: column;
        gap: 40px;
        border-right: 1px solid var(--border-c-week);
        .doc-kind {
            .kind-title {
                font-weight: 600;
            }
            .doc-child {
                padding-left: 15px;
                span {
                    cursor: pointer;
                    color: grey;
                    transition: color .1s;
                }
                span:hover {
                    color: var(--title-c-normal-blue);
                }
            }
        }
        span {
            line-height: 30px;
        }
    }
    .content {
        width: 85%;
        white-space: normal;
        overflow: auto;
        .md-show {
            width: 90%;
            white-space: normal;
        }
    }
}
</style>

<style lang="less">
.help-doc-box {
    .content {
        p {
            white-space: normal;
            line-height: 30px;
            text-indent: 2em;
        }
    }
}
</style>