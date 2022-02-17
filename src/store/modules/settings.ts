import defaultSettings from '@/settings'

const { fixedHeader, sidebarLogo } = defaultSettings

const state = {
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

export default {
  namespaced: true,
  state
}

