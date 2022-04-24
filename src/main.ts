import { createApp } from 'vue'
import App from './App.vue'

import '@/styles/index.scss'

import router from './router'
import store from './store'

import 'virtual:svg-icons-register'
import svgIcon from '@/components/SvgIcon/index.vue'

import '@/permission'

import VueBlocksTree from 'vue3-blocks-tree'
import 'vue3-blocks-tree/dist/vue3-blocks-tree.css'
const defaultoptions = { treeName: 'blocks-tree' }

createApp(App)
  .component('svg-icon', svgIcon)
  .use(store)
  .use(router)
  .use(VueBlocksTree, defaultoptions)
  .mount('#app')
