<template>
    <div class="event-handler-box">
        <slot></slot>
    </div>
</template>


<script setup lang="ts">
import { ICustomeComponent } from '@/components/custome-components/types';
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated } from 'vue';
import { ISystemEvent, ICustomeEvent } from '@/components/custome-components/types';

const props = defineProps<{
    el: ICustomeComponent
}>()

const handleStringToCode = (eventValue: Array<string | ISystemEvent | ICustomeEvent>) => {
    let codeStr = ''
    eventValue.forEach((item) => {
        if (typeof item === 'string') {
            codeStr += item
        } else if (typeof item === 'object') {
            // TODO 调用函数
        }
    })
    return codeStr
}


onMounted(() => {
    props.el.events.handler && props.el.events.lifeCycle.forEach((item) => {
        if (item.eventName === 'onMounted') {
            const code = handleStringToCode(item.eventValue)
            eval(code)
        }
    })
})

onBeforeMount(() => {
    props.el.events.handler && props.el.events.lifeCycle.forEach((item) => {
        if (item.eventName === 'onBeforeMount') {
            const code = handleStringToCode(item.eventValue)
            eval(code)
        }
    })
})

onUpdated(() => {
    props.el.events.handler && props.el.events.lifeCycle.forEach((item) => {
        if (item.eventName === 'onUpdated') {
            const code = handleStringToCode(item.eventValue)
            eval(code)
        }
    })
})

onBeforeUpdate(() => {
    props.el.events.handler && props.el.events.lifeCycle.forEach((item) => {
        if (item.eventName === 'onBeforeUpdate') {
            const code = handleStringToCode(item.eventValue)
            eval(code)
        }
    })
})

onUnmounted(() => {
    props.el.events.handler && props.el.events.lifeCycle.forEach((item) => {
        if (item.eventName === 'onBeforeUpdate') {
            const code = handleStringToCode(item.eventValue)
            eval(code)
        }
    })
})

onBeforeUnmount(() => {
    props.el.events.handler && props.el.events.lifeCycle.forEach((item) => {
        if (item.eventName === 'onBeforeUnmount') {
            const code = handleStringToCode(item.eventValue)
            eval(code)
        }
    })
})

</script>


<style scoped lang="less">
.event-handler-box {

}
</style>