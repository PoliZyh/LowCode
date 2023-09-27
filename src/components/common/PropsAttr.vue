<template>
    <div class="props-attr-box">
        <template v-if="componentsStore.curActiveComponent">
            <!-- 对于字符串属性 -->
            <template v-if="typeof componentsStore.curActiveComponent.propValue === 'string'">
                <div class="content-box">
                    <span>内容</span>
                    <el-input type="textarea" v-model="componentsStore.curActiveComponent.propValue"></el-input>
                </div>
            </template>
        </template>
    </div>
</template>


<script setup lang="ts">
import useComponentsStore from '@/store/useComponentStore';

const componentsStore = useComponentsStore()

</script>


<style lang="less" scoped>
.props-attr-box {
    .content-box {
        display: flex;
        gap: 10px;
    }
}
</style>