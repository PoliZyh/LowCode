import { App } from "vue"
import vPermission from "./v-permission"

const directiveMap = {
    permission: vPermission
}

export default {
    install(app: App) {
        for (const [key, directive] of Object.entries(directiveMap)) {
            app.directive(key, directive)
        }
    }
}