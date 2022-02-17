// import Cookies from 'js-cookie'
import { AppTy } from '~/store'
import { ObjTy } from '~/common'

const state: AppTy = {
  sidebar: {
    opened: true,
    withoutAnimation: false
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR: (state: AppTy) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    // if (state.sidebar.opened) {
    //     Cookies.set('sidebarStatus', '1')
    // } else {
    //     Cookies.set('sidebarStatus', '0')
    // }
  },
  TOGGLE_DEVICE: (state:AppTy, device: string) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar({ commit }: ObjTy) {
    commit('TOGGLE_SIDEBAR')
  },
  toggleDevice({ commit }: ObjTy, device: string) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
