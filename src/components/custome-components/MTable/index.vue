<template>
    <div class="m-table-box"
    :style="{'zIndex': props.zIndex}">
    <table
    :style="props.componentStyle"
    :data-zindex="props.zIndex"
    border="1">
        <tr >
            <td
            v-for="title in propValue.tableTitle"
            :key="title.propName"
            :style="{
                'fontWeight': propValue.isTitleBold ? 600 : ''
            }"
            >{{ title.titleName }}</td>
        </tr>
        <tr v-for="(row, index) in propValue.tableData"
        :key="index"
        :class="index % 2 == 0 && propValue.hasZebraStripe ? 'td-bg' : ''">
            <td v-for="column in propValue.tableTitle" :key="column.propName" >
                {{ (row as any)[column.propName] }}
            </td>
        </tr>

    </table>
    </div>
</template>


<script setup lang="ts">
import type { IMTableAttr } from './type';

const props = defineProps<{
    propValue: IMTableAttr;
    componentStyle: any;
    zIndex: number;
}>();

</script>


<style scoped lang="less">
.m-table-box {
    position: relative;
    td {
        padding: 10px 10px;
    }
    .td-bg {
        background-color: #f6f6f6;
    }

}
</style>