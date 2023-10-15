import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import pinia from './store'
import router from './router'

// 渲染markdown https://ckang1229.gitee.io/vue-markdown-editor/zh/examples/preview-demo.html#%E5%BC%95%E5%85%A5
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

import directives from './directives'

import 'default-passive-events';

import "jsoneditor";

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

// 注册自定义组件
import { registerComponents } from './components/custome-components/registerComponents'


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

registerComponents(app)

app.use(pinia).use(router).use(Antd).use(VMdPreview).use(directives)

app.mount('#app')
