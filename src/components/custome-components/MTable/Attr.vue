<template>
    <div class="m-table-attr" v-if="componentsStore.curActiveComponent">
        <el-form>
            <el-form-item >
                <div class="scroll-row">
                    <table class="table-small">
                        <tr >
                            <td
                            v-for="(title, index) in (componentsStore.curActiveComponent.propValue as IMTableAttr).tableTitle"
                            :key="title.propName"
                            :class="{
                                'td-active': activeTd.x === 0 && activeTd.y === index
                            }"
                            @click="handleActiveTd(0, index)"
                            >{{ title.titleName }}</td>

                        </tr>
                        <tr v-for="(row, rindex) in (componentsStore.curActiveComponent.propValue as IMTableAttr).tableData" :key="rindex">
                            <td
                            v-for="(column, cindex) in (componentsStore.curActiveComponent.propValue as IMTableAttr).tableTitle"
                            :key="column.propName"
                            :class="{
                                'td-active': activeTd.x === rindex + 1 && activeTd.y === cindex
                            }"
                            @click="handleActiveTd(rindex + 1, cindex)"
                            >
                                {{ (row as any)[column.propName] }}
                            </td>
                        </tr>
                    </table>
                </div>
            </el-form-item>
            <el-form-item>
                <el-row style="width: 100%;">
                    <el-button size="small" @click="handleAddRow">添加一行</el-button>
                    <el-button size="small" @click="handleAddCol">添加一列</el-button>
                </el-row>
                <el-row style="margin-top: 10px; width: 100%;">
                    <el-button size="small" @click="handleDeleteRow">删除该行</el-button>
                    <el-button size="small" @click="handleDeleteCol">删除该列</el-button>
                </el-row>
                <el-row style="margin-top: 10px; width: 100%;">
                    <el-popover placement="left" width="200" trigger="click">
                        <template #reference>
                            <el-button size="small" icon="Edit">编辑该单元格</el-button>
                        </template>
                        <template v-if="activeTd.x === 0">
                            <!-- 表头 -->
                            <el-form>
                                <el-form-item label="标题">
                                    <el-input
                                    size="small"
                                    v-model="(componentsStore.curActiveComponent.propValue as IMTableAttr).tableTitle[activeTd.y].titleName"></el-input>
                                </el-form-item>
                                <el-form-item label="注入">
                                    <el-input
                                    size="small"
                                    v-model="(componentsStore.curActiveComponent.propValue as IMTableAttr).tableTitle[activeTd.y].propName"></el-input>
                                </el-form-item>
                            </el-form>
                        </template>
                        <template v-if="activeTd.x > 0">
                            <!-- 表体 -->
                            <el-form>
                                <el-form-item label="注入配对">
                                    <el-input size="small" v-model="(componentsStore.curActiveComponent.propValue as IMTableAttr).tableTitle[activeTd.y].propName"></el-input>
                                </el-form-item>
                                <el-form-item label="单元格值">
                                    <el-input size="small" v-model="(componentsStore.curActiveComponent.propValue as IMTableAttr).tableData[activeTd.x - 1][(componentsStore.curActiveComponent.propValue as IMTableAttr).tableTitle[activeTd.y].propName]"></el-input>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-popover>
                </el-row>
            </el-form-item>
            <el-form-item label="表头加粗">
                <el-switch
                    v-model="(componentsStore.curActiveComponent.propValue as IMTableAttr).isTitleBold"
                    class="ml-2"
                    inline-prompt
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                    active-text="加粗"
                    inactive-text="不加"
                />
            </el-form-item>
            <el-form-item label="斑马纹">
                <el-switch
                    v-model="(componentsStore.curActiveComponent.propValue as IMTableAttr).hasZebraStripe"
                    class="ml-2"
                    inline-prompt
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                    active-text="显示"
                    inactive-text="不显"
                />
            </el-form-item>
        </el-form>
    </div>
</template>


<script setup lang="ts">
import useComponentsStore from '@/store/useComponentStore';
import type { IMTableAttr } from './type';
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';

const componentsStore = useComponentsStore()

const activeTd = reactive({
    x: 0,
    y: 0
})



const handleActiveTd = (row: number, col: number) => {
    activeTd.x = row
    activeTd.y = col
}


const handleAddRow = () => {
    if (componentsStore.curActiveComponent) {
        (componentsStore.curActiveComponent.propValue as IMTableAttr).tableData.push({})
    }
}

const handleAddCol = () => {
    if (componentsStore.curActiveComponent) {
        (componentsStore.curActiveComponent.propValue as IMTableAttr).tableTitle.push({
            propName: '',
            titleName: ''
        })
    }
}

const handleDeleteCol = () => {
    if (!componentsStore.curActiveComponent) return
    const propValue = componentsStore.curActiveComponent.propValue as IMTableAttr;
    const propertyToRemove = propValue.tableTitle[activeTd.y].propName
    const delY = activeTd.y
    if (propValue.tableTitle.length === 1) {
        ElMessage.warning('这已经是最后一列')
        return
    }
    // 删除data
    propValue.tableData = propValue.tableData.map((obj) => {
        if (propertyToRemove in obj) {
            const { [propertyToRemove]: propToRemove, ...rest } = obj as { [key: string]: any };
            return rest;
        }
        return obj;
    })
    if (activeTd.y === propValue.tableTitle.length - 1) {
        activeTd.y -= 1
    }
    // 删除title
    propValue.tableTitle.splice(delY, 1)
}

const handleDeleteRow = () => {
    if (activeTd.x === 0) {
        ElMessage.warning('无法删除表头')
        return
    }
    let delX: number = activeTd.x - 1
    if (componentsStore.curActiveComponent) {
        if (activeTd.x === (componentsStore.curActiveComponent.propValue as IMTableAttr).tableData.length) {
            activeTd.x -= 1
        }
        (componentsStore.curActiveComponent.propValue as IMTableAttr).tableData.splice(delX, 1)

    }
}



</script>


<style scoped lang="less">
.m-table-attr {
    width: 100%;
    .table-small {
        padding: 10px;
        border-collapse: collapse;
        td {
            padding: 10px 10px;
            text-align: center;
            transition: all 0.3s;
        }
        .td-active {
            background-color: #ecf5ff;
            color: #409eff;
        }
    }
    table, th, td {
        border: 1px solid rgb(227, 227, 227);
    }
    .scroll-row {
        overflow: scroll;
        width: 100%;
    }
}
</style>