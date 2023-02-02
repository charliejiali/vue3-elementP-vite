import { defineStore } from 'pinia'
import { RouteItemTy, RouterRowTy, RouterTy } from '~/router'
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

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionTy => {
    return {
      routes: [],
      addRoutes: [],
      removeRoutes: []
    }
  },
  getters: {
    permission_routes: (state) => state.routes
  },
  actions: {
    generateRoutes(roles: string[]) {
      return new Promise<RouterRowTy[]>(resolve => {
        let accessedRoutes : RouterRowTy[]
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        // commit('SET_ROUTES', accessedRoutes)
        this.setRoutes(accessedRoutes)
        resolve(accessedRoutes)
      })
    },
    setRemoveRoutes(removeRoutes: any[]) {
      return new Promise(resolve => {
        // commit('SET_REMOVE_ROUTES', removeRoutes)
        this.makeRemoveRoutes(removeRoutes)
        resolve(removeRoutes)
      })
    },
    resetRoutes() {
      this.removeRoutes.forEach((i: any) => {
        i()
      })
      // commit('SET_REMOVE_ROUTES', [])
      this.makeRemoveRoutes([])
    },
    setRoutes(routes: RouterTy) {
      this.addRoutes = routes
      this.routes = constantRoutes.concat(routes)
    },
    makeRemoveRoutes(removeRoutes: any[]) {
      this.removeRoutes = removeRoutes
    }
  }
})
