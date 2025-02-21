import defaultSettings from '@/settings'
import { defineStore } from 'pinia'

const { fixedHeader, sidebarLogo } = defaultSettings

interface SettingsState {
  fixedHeader: boolean
  sidebarLogo: boolean
}

export const useSettingsStore = defineStore('settings', {
  // id: 'settings',
  state: (): SettingsState => ({
    fixedHeader,
    sidebarLogo,
  }),
  getters: {},
})
