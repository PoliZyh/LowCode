
import useContextmenuStore from "@/store/useContextmenuStore"

const vPermission = {
    updated(el: any, binding: any) {
        const contextmenuStore = useContextmenuStore()
        contextmenuStore.setCurRights()
        if (!contextmenuStore.curRights.find(item => item === binding.value)) {
            el.style.display = 'none'
        } else {
            el.style.display = ''
        }
    }
}


export default vPermission