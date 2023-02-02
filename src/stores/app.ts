import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

interface AppState {
  sidebar: {
    opened: boolean,
    withoutAnimation: boolean
  },
  device: string
}

const sidebarStatus = Cookies.get('vue3ElementPViteSidebarStatus')
let opened = true
if (sidebarStatus) {
  opened = !!+sidebarStatus
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => {
    return {
      sidebar: {
        opened,
        withoutAnimation: false
      },
      device: 'desktop'
    }
  },
  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      if (this.sidebar.opened) {
        Cookies.set('vue3ElementPViteSidebarStatus', '1')
      } else {
        Cookies.set('vue3ElementPViteSidebarStatus', '0')
      }
    }
  }
})
