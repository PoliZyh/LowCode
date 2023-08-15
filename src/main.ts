import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'element-plus/dist/index.css'


import pinia from './store'
import router from './router'


const app = createApp(App)


app.use(pinia).use(router)

app.mount('#app')
