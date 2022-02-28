import { RouterTy, RouteItemTy } from '~/router'
import { ObjTy } from '~/common'
import { PermissionTy } from '~/store'
import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: string[], route: RouteItemTy) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta?.roles?.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: RouterTy, roles: string[]) {
  const res: RouterTy = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state: PermissionTy = {
  routes: [],
  addRoutes: [],
  removeRoutes: []
}

const mutations = {
  SET_ROUTES: (state: PermissionTy, routes: RouterTy) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_REMOVE_ROUTES: (state: PermissionTy, removeRoutes: any[]) => {
    state.removeRoutes = removeRoutes
  }
}

const actions = {
  generateRoutes({ commit }: ObjTy, roles: string[]) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  setRemoveRoutes({ commit }: ObjTy, removeRoutes: any[]) {
    return new Promise(resolve => {
      commit('SET_REMOVE_ROUTES', removeRoutes)
      resolve(removeRoutes)
    })
  },
  resetRoutes({ commit }: ObjTy) {
    state.removeRoutes.forEach(i => {
      i()
    })
    commit('SET_REMOVE_ROUTES', [])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
