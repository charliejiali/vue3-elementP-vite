import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

interface AppState {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  device: string
}

const sidebarStatus = Cookies.get('vue3ElementPViteSidebarStatus')
let opened = true
if (sidebarStatus) {
  opened = !!+sidebarStatus
}

export const useAppStore = defineStore('app', {
  // id: 'app',
  state: (): AppState => ({
    sidebar: {
      opened,
      withoutAnimation: false,
    },
    device: 'desktop',
  }),
  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false

      if (this.sidebar.opened) {
        Cookies.set('vue3ElementPViteSidebarStatus', '1')
      }
      else {
        Cookies.set('vue3ElementPViteSidebarStatus', '0')
      }
    },
  },
})
