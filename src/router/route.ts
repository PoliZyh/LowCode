
import { RouteRecordRaw } from "vue-router";


const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home/index.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login/index.vue'),
    }
]


export {
    constantRoutes
}