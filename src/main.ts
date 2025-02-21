import svgIcon from '@/components/SvgIcon/index.vue'
import { createPinia } from 'pinia'

import { createApp } from 'vue'
import VueBlocksTree from 'vue3-blocks-tree'

import App from './App.vue'

import router from './router'
import 'element-plus/dist/index.css'

import '@/styles/index.scss'

import 'virtual:svg-icons-register'
import '@/permission'

import 'vue3-blocks-tree/dist/vue3-blocks-tree.css'

const defaultOptions = { treeName: 'blocks-tree', nodeName: 'vue3-blocks-tree' }

const pinia = createPinia()

createApp(App)
  .component('svg-icon', svgIcon)
  .use(router)
  .use(VueBlocksTree, defaultOptions)
  .use(pinia)
  .mount('#app')
