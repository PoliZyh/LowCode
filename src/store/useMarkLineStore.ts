import { defineStore } from "pinia";
import type { ILineItem } from "@/views/Editor/types";
import useComponentsStore from "./useComponentStore";

interface IMarkLineState {
    onMoving: boolean;
    curLines: Array<ILineItem>;
    diff: number;
}


const useMarkLineStore = defineStore("markLine", {

    state: (): IMarkLineState => ({
        onMoving: false,
        diff: 3, // 自动修正的距离
        curLines: [{
            name: 'xt', //水平头部
            pos: 0,
            isActived: false
        }, {
            name: 'xm', //水平中间
            pos: 0,
            isActived: false
        }, {
            name: 'xb', //水平底部
            pos: 0,
            isActived: false
        }, {
            name: 'yl', //垂直左侧
            pos: 0,
            isActived: false
        }, {
            name: 'ym', //垂直中间
            pos: 0,
            isActived: false
        }, {
            name: 'yr', //垂直右侧
            pos: 0,
            isActived: false
        }]
    }),

    actions: {

        movingMarkLine() {
            this.onMoving = true;
        },

        endMovingMarkLine() {
            this.onMoving = false;
        },

        getCurLineByName(name: 'yl' | 'ym' | 'yr' | 'xt' | 'xm' | 'xb') {
            return this.curLines.findIndex(item => item.name === name);
        },

        getNearlyLine(): Array<'yl' | 'ym' | 'yr' | 'xt' | 'xm' | 'xb'> {
            const componentsStore = useComponentsStore()
            const res: Array<'yl' | 'ym' | 'yr' | 'xt' | 'xm' | 'xb'> = []
            componentsStore.curComponents.forEach(component => {
                if (componentsStore.curActiveComponent && component !== componentsStore.curActiveComponent) {
                    // 判断是否足够贴近，即位置小于diff
                    const diffAvtiveLeftComponentLeft = Math.abs(componentsStore.curActiveComponent.style.left - component.style.left)
                    const diffAvtiveLeftComponentRight = Math.abs(componentsStore.curActiveComponent.style.left - (component.style.left + component.style.width))
                    const diffAvtiveRightComponentLeft = Math.abs((componentsStore.curActiveComponent.style.left + componentsStore.curActiveComponent.style.width) - component.style.left)
                    const diffAvtiveRightComponentRight = Math.abs((componentsStore.curActiveComponent.style.left + componentsStore.curActiveComponent.style.width) - (component.style.left + component.style.width))
                    const diffActiveYMidComponentYMid = Math.abs((componentsStore.curActiveComponent.style.left + componentsStore.curActiveComponent.style.width / 2) - (component.style.left + component.style.width / 2))
                    const diffActiveTopComponentTop = Math.abs(componentsStore.curActiveComponent.style.top - component.style.top)
                    const diffActiveTopComponentBottom = Math.abs(componentsStore.curActiveComponent.style.top - (component.style.top + component.style.height))
                    const diffActiveBottomComponentTop = Math.abs((componentsStore.curActiveComponent.style.top + componentsStore.curActiveComponent.style.height) - component.style.top)
                    const diffActiveBottomComponentBottom = Math.abs((componentsStore.curActiveComponent.style.top + componentsStore.curActiveComponent.style.height) - (component.style.top + component.style.height))
                    const diffActiveXMidComponentXMid = Math.abs((componentsStore.curActiveComponent.style.top + componentsStore.curActiveComponent.style.height / 2) - (component.style.top + component.style.height / 2))
                    const newStyle = {
                        ...componentsStore.curActiveComponent.style,
                    }
                    // 垂直左侧
                    if (diffAvtiveLeftComponentLeft < this.diff) {
                        res.push('yl')
                        newStyle.left = component.style.left
                    }
                    if (diffAvtiveLeftComponentRight < this.diff) {
                        res.push('yl')
                        newStyle.left = component.style.left + component.style.width
                    }
                    // 垂直中间
                    if (diffActiveYMidComponentYMid < this.diff) {
                        res.push('ym')
                        newStyle.left = componentsStore.curActiveComponent.style.left - (componentsStore.curActiveComponent.style.left + componentsStore.curActiveComponent.style.width / 2) + (component.style.left + component.style.width / 2)
                    }
                    // 垂直右侧
                    if (diffAvtiveRightComponentRight < this.diff) {
                        res.push('yr')
                        newStyle.left = -componentsStore.curActiveComponent.style.width + (component.style.left + component.style.width)
                    }
                    if (diffAvtiveRightComponentLeft < this.diff) {
                        res.push('yr')
                        newStyle.left = -componentsStore.curActiveComponent.style.width + component.style.left
                    }
                    // 水平顶部
                    if (diffActiveTopComponentTop < this.diff) {
                        res.push('xt')
                        newStyle.top = component.style.top
                    }
                    if (diffActiveTopComponentBottom < this.diff) {
                        res.push('xt')
                        newStyle.top = component.style.top + component.style.height
                    }
                    // 水平中间
                    if (diffActiveXMidComponentXMid < this.diff) {
                        res.push('xm')
                        newStyle.top =  componentsStore.curActiveComponent.style.top - (componentsStore.curActiveComponent.style.top + componentsStore.curActiveComponent.style.height / 2) + (component.style.top + component.style.height / 2)
                    }
                    // 水平底部
                    if (diffActiveBottomComponentBottom < this.diff) {
                        res.push('xb')
                        newStyle.top = -componentsStore.curActiveComponent.style.height + component.style.top + component.style.height
                    }
                    if (diffActiveBottomComponentTop < this.diff) {
                        res.push('xb')
                        newStyle.top = -componentsStore.curActiveComponent.style.height + component.style.top
                    }

                    componentsStore.setActiveComponentStyle(newStyle)


                }
            })
            return res
        },

        activeLines() {
            const nearlyLines = this.getNearlyLine()
            const componentsStore = useComponentsStore()
            if (!componentsStore.curActiveComponent) return
            nearlyLines.forEach(line => {
                // 激活当前Line
                const index = this.getCurLineByName(line)
                this.curLines[index].isActived = true
                if (line === 'yr') {
                    this.curLines[index].pos = componentsStore.curActiveComponent!.style.left + componentsStore.curActiveComponent!.style.width
                } else if (line === 'ym') {
                    this.curLines[index].pos = componentsStore.curActiveComponent!.style.left + componentsStore.curActiveComponent!.style.width / 2
                } else if (line === 'yl') {
                    this.curLines[index].pos = componentsStore.curActiveComponent!.style.left
                } else if (line === 'xt') {
                    this.curLines[index].pos = componentsStore.curActiveComponent!.style.top
                } else if (line === 'xb') {
                    this.curLines[index].pos = componentsStore.curActiveComponent!.style.top + componentsStore.curActiveComponent!.style.height
                } else if (line === 'xm') {
                    this.curLines[index].pos = componentsStore.curActiveComponent!.style.top + componentsStore.curActiveComponent!.style.height / 2
                }
            })
            const notNearlyLines = this.curLines.filter(line => !nearlyLines.includes(line.name))
            notNearlyLines.forEach(line => {
                const index = this.getCurLineByName(line.name)
                this.curLines[index].isActived = false
            })
        }

    }

})


export default useMarkLineStore