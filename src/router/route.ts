
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
    },
    {
        path: '/user',
        name: 'User',
        component: () => import('@/views/User/index.vue'),
        children: [
            {
                path: '',
                name: 'Project',
                component: import('@/views/User/components/Projects.vue')
            },
            {
                path: 'help-doc',
                name: 'HelpDoc',
                component: import('@/views/User/components/HelpDoc.vue')
            }
        ]
    },
    {
        path: '/editor',
        name: 'Editor',
        component: () => import('@/views/Editor/index.vue'),
    }

]


export {
    constantRoutes
}