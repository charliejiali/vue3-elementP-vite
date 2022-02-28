import { createApp } from 'vue'
import App from './App.vue'

import '@/styles/index.scss'

import router from './router'
import store from './store'

import 'virtual:svg-icons-register'
import svgIcon from '@/components/SvgIcon/index.vue'

import '@/permission'

createApp(App)
  .component('svg-icon', svgIcon)
  .use(store)
  .use(router)
  .mount('#app')
