import { defineStore } from 'pinia'
import defaultSettings from '@/settings'

const { fixedHeader, sidebarLogo } = defaultSettings

interface SettingsState {
  fixedHeader: boolean
  sidebarLogo: boolean
}

export const useSettingsStore = defineStore({
  id: 'settings',
  state: (): SettingsState => {
    return {
      fixedHeader,
      sidebarLogo
    }
  },
  getters: {}
})
