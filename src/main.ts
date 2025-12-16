import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';  // Antd 重置样式（建议保留）
import * as Icons from '@ant-design/icons-vue';

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 1. 注册插件（顺序无关，但建议按依赖顺序）
app.use(createPinia())       // 状态管理
app.use(router)              // 路由
app.use(Antd)                // UI 组件库
// 全局注册所有图标（体积较大，但使用方便）
for (const [key, component] of Object.entries(Icons)) {
  app.component(key, component)
}

// 2. 最后挂载应用（仅需一次！）
app.mount('#app')