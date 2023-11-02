<template>
    <div class="m-image-box"
    :style="{'zIndex': props.zIndex}">
    <template v-if="propValue.url !== ''">
        <img
        draggable="false"
        :src="props.propValue.url"
        :style="props.componentStyle"
        :data-zindex="props.zIndex"
        :class="{
            'horizontal-flip': propValue.isHorizontalFlip,
            'vertical-flip': propValue.isVerticalFlip,
            'horizontal-vertical-flip': propValue.isHorizontalFlip && propValue.isVerticalFlip
        }"
        >
    </template>
    <template v-else>
        <div
        class="empty-img-box"
        :style="props.componentStyle"
        :data-zindex="props.zIndex">
            请设置图片的链接哦
        </div>
    </template>

    </div>
</template>


<script setup lang="ts">
// https://i.postimg.cc/Znt1jWYF/user.jpg
import type { IMImageAttr } from './type';

const props = defineProps<{
    propValue: IMImageAttr;
    componentStyle: any;
    zIndex: number;
}>()

</script>


<style lang="less" scoped>
.m-image-box {
    position: relative;
    .empty-img-box {
        background-color: grey;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .horizontal-flip {
        transform: scaleX(-1);
    }
    .vertical-flip {
        transform: scaleY(-1);
    }
    .horizontal-vertical-flip {
        transform: scaleX(-1) scaleY(-1);
    }
}
</style>