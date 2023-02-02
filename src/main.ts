import { createApp } from 'vue'
import App from './App.vue'

import '@/styles/index.scss'

import router from './router'

import 'virtual:svg-icons-register'
import svgIcon from '@/components/SvgIcon/index.vue'

import '@/permission'

import VueBlocksTree from 'vue3-blocks-tree'
import 'vue3-blocks-tree/dist/vue3-blocks-tree.css'
const defaultOptions = { treeName: 'blocks-tree' }

import { createPinia } from 'pinia'
const pinia = createPinia()

createApp(App)
  .component('svg-icon', svgIcon)
  .use(router)
  .use(VueBlocksTree, defaultOptions)
  .use(pinia)
  .mount('#app')
