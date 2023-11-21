<template>
    <div class="common-event-box">
        <el-row>
        </el-row>
        <el-row style="margin-top: 10px;margin-left: 15px;">
            <h4>自定义事件 <el-button size="small" link icon="plus" type="primary" @click="handleAddMethods">添加自定义事件</el-button></h4>
            <div class="events">
                <template v-if="componentsStore.curActiveComponent && componentsStore.curActiveComponent.events.methods.length > 0"></template>
                <template v-else></template>
            </div>
        </el-row>
        <el-row style="margin-top: 10px;margin-left: 15px;">
            <h4>声明周期事件 <el-button size="small" link icon="plus" type="primary" @click="handleAddLifeCycle">添加声明周期</el-button></h4>
            <div class="events">
                <template v-if="componentsStore.curActiveComponent && componentsStore.curActiveComponent.events.lifeCycle.length > 0">
                    <el-tag v-for="item in componentsStore.curActiveComponent.events.lifeCycle" :key="item.eventName">
                        {{ item.eventName }}
                    </el-tag>
                </template>
                <template v-else></template>
            </div>
        </el-row>
        <el-row style="margin-top: 10px;margin-left: 15px;">
            <h4>交互事件 <el-button size="small" link icon="plus" type="primary" @click="handleAddHandler">添加交互事件</el-button></h4>
            <div class="events">
                <template v-if="componentsStore.curActiveComponent && componentsStore.curActiveComponent.events.handler.length > 0"></template>
                <template v-else></template>
            </div>
        </el-row>
        <!-- dialogs -->
        <el-dialog title="添加自定义事件"  v-model="isShowMethodsDialog">

        </el-dialog>
        <el-dialog title="添加生命周期事件"  v-model="isShowLifeCycleDialog">
            <el-form>
                <el-form-item label="生命周期">
                    <el-select v-model="lifeCycleParams.eventName">
                        <el-option
                        v-for="item in lifeCycleOptions"
                        :key="item"
                        :label="item"
                        :value="item"></el-option>
                    </el-select>
                    <el-button style="margin-left: 15px;" link type="primary" @click="handleAddJsCode">添加脚本</el-button>
                    <el-button style="margin-left: 15px;" link type="primary" @click="handleAddSysMethod">添加系统事件</el-button>
                    <el-button style="margin-left: 15px;" link type="primary" @click="handleAddCustomeMethod">添加自定义事件</el-button>
                </el-form-item>
                <el-form-item label="脚本集" v-show="lifeCycleParams.eventName">
                    <el-row style="width: 100%; display: flex; align-items: center; gap: 20px;">
                        <el-col :span="18">
                            <template v-if="addType === 0">
                                <el-input type="textarea" v-model="script"></el-input>
                            </template>
                            <template v-if="addType === 1">
                                <el-select></el-select>
                            </template>
                            <template v-if="addType === 2">
                                <el-select></el-select>
                            </template>
                        </el-col>
                        <el-button size="small" @click="handleAddEvent">确认添加</el-button>
                    </el-row>
                    <el-row style="width: 100%;margin-top: 20px; height: 200px; overflow: scroll;display: flex;flex-direction: column;flex-wrap: nowrap;">
                        <p
                        v-for="(item, index) in lifeCycleParams.eventValue"
                        :key="index"
                        > -> {{ eventValueToString(item) }}</p>
                    </el-row>
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleCancelAddLifeCycle">取消添加</el-button>
                <el-button type="primary" @click="handleConfirmAddLifeCycle">
                确认添加
                </el-button>
            </span>
            </template>
        </el-dialog>
        <el-dialog title="添加交互事件" v-model="isShowHandlerDialog"></el-dialog>
    </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue'
import useComponentsStore from '@/store/useComponentStore';
import type { ILifeCycleEvent, ICustomeEvent, ISystemEvent } from '../../custome-components/types';

const componentsStore = useComponentsStore();
const isShowMethodsDialog = ref(false)
const isShowLifeCycleDialog = ref(false)
const isShowHandlerDialog = ref(false)
const lifeCycleOptions = ref([
    'onBeforeMount', 'onMounted', 'onBeforeUpdate', 'onUpdated', 'onUnmounted', 'onBeforeUnmount'
])
const lifeCycleParams = ref<ILifeCycleEvent>({
    eventName: '',
    eventValue: []
})
const addType = ref<0 | 1 | 2>(0) // 0 脚本 1 系统事件 2 自定义事件
const script = ref<string | ICustomeEvent | ISystemEvent>('')

watch(() => addType.value, (newVal) => {
    if (newVal === 0) {
        script.value = ''
    } else if (newVal === 1 || newVal === 2) {
        script.value = {
            eventName: '',
            eventValue: []
        }
    }
})

const handleAddMethods = () => {
    isShowMethodsDialog.value = true
}

const handleAddLifeCycle = () => {
    lifeCycleParams.value = {
        eventValue: [],
        eventName: ''
    }
    script.value = ''
    addType.value = 0
    isShowLifeCycleDialog.value = true
}

const handleAddHandler = () => {
    isShowHandlerDialog.value = true
}

// 添加脚本到脚本集
const handleAddEvent = () => {
    lifeCycleParams.value.eventValue.push(script.value)

}

const eventValueToString = (value: string | ICustomeEvent) => {
    if (typeof value === 'string') {
        return value
    } else if (typeof value === 'object') {
        return value.eventName + '('
        + value.params ? value.params?.map(item => item.key).join(', ') : '' +
        ')'
    }
}

// 添加脚本
const handleAddJsCode = () => {
    addType.value = 0
}

const handleAddSysMethod = () => {
    addType.value = 1
}

const handleAddCustomeMethod = () => {
    addType.value = 2
}

const handleCancelAddLifeCycle = () => {
    isShowLifeCycleDialog.value = false
}

const handleConfirmAddLifeCycle = () => {
    componentsStore.addLifeScriptToActiveComponent(lifeCycleParams.value)
    isShowLifeCycleDialog.value = false
}

</script>



<style scoped lang="less">
.common-event-box {
    width: 100%;
    .events {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    h4 {
        display: flex;
        gap: 10px;
        align-items: center;
    }
}
</style>