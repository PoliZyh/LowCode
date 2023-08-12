

import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoutes } from "./route";

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})

export default router;