import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import '@/styles/index.scss'

import router from './router'
import store from './store'

import 'virtual:svg-icons-register'
import svgIcon from '@/components/SvgIcon'

createApp(App)
  .component('svg-icon', svgIcon)
  .use(store)
  .use(router)
  .use(ElementPlus, { size: 'small', locale: zhCn })
  .mount('#app')
