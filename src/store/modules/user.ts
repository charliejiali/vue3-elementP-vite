import { login, getInfo, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { UserTy } from '~/store'
import { ObjTy } from '~/common'

const state = {
  token: getToken(),
  name: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state: UserTy, token: string) => {
    state.token = token
  },
  SET_INTRODUCTION: (state: UserTy, introduction: string) => {
    state.introduction = introduction
  },
  SET_NAME: (state: UserTy, name: string) => {
    state.name = name
  },
  SET_ROLES: (state: UserTy, roles: []) => {
    state.roles = roles
  }
}

const actions = {
  login({ commit }: ObjTy, userInfo: {username: string, password: string}) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password.trim()
      }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({ commit, state }:ObjTy) {
    return new Promise((resolve, reject) => {
      getInfo({ token: state.token }).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // user logout
  logout({ commit, state }: ObjTy) {
    return new Promise((resolve, reject) => {
      logout({ token: state.token }).then(_ => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve(null)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }: ObjTy) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve(null)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

