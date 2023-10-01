import Loading from './index.vue'
import { createVNode, render } from 'vue'

const node = document.querySelector('body')


export default {
    startLoding() {
        const loadingInstance = createVNode(Loading, {
            isVisible: true
        })
        render(null, node as HTMLElement)
        render(loadingInstance, node as HTMLElement)
    },
    endLoding() {
        render(null, node as HTMLElement)
    }
}

