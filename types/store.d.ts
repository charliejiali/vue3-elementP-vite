import { RouterTy } from '~/router'
import { ObjTy } from './common'

export interface StateTy {
    app: AppTy
    permission: PermissionTy
    user: UserTy
}

export interface UserTy {
    token: string
    name: string
    introduction: string
    roles: Array<string>
    // avatar: string
}

export interface AppTy {
    sidebar: {
        opened: boolean
        // opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false
    }
    device: string
    // settings: ObjTy
    // cachedViews: Array<string>
    // cachedViewsDeep: Array<string>
}

export interface PermissionTy {
    routes: RouterTy // 将过滤后的异步路由和静态路由集合
    addRoutes: RouterTy // 过滤后的异步路由
    removeRoutes: any[]
}
