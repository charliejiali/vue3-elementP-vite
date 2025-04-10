import type { Router } from 'vue-router'
import type { RouterTy } from '~/router'
import Layout from '@/layout/index.vue'
import { usePermissionStore } from '@/stores/permission'

import { createRouter, createWebHistory } from 'vue-router'
import nestedRouter from './modules/nested'

export const constantRoutes: RouterTy = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'Dashboard', icon: 'dashboard' },
      },
    ],
  },
  {
    path: '/table',
    component: Layout,
    name: 'Table',
    children: [
      {
        path: '',
        component: () => import('@/views/table/index.vue'),
        name: 'TableIndex',
        meta: { title: 'Table', icon: 'table' },
      },
    ],
  },
  {
    path: '/world-map',
    component: Layout,
    name: 'WorldMap',
    children: [
      {
        path: '',
        component: () => import('@/views/world-map/index.vue'),
        name: 'WorldMapIndex',
        meta: { title: 'World Map', icon: 'international' },
      },
    ],
  },
  {
    path: '/vue3-tree-chart',
    component: Layout,
    name: 'OrgChart',
    children: [
      {
        path: '',
        component: () => import('@/views/vue3-tree-chart/index.vue'),
        name: 'VueTreeChart',
        meta: { title: 'vue3-tree-chart', icon: 'international' },
      },
    ],
  },
  {
    path: '/echarts',
    component: Layout,
    name: 'Echarts',
    redirect: '/echarts/graph',
    meta: {
      title: 'Echarts',
      icon: 'nested',
    },
    children: [
      {
        path: 'graph',
        component: () => import('@/views/echarts/Graph/index.vue'),
        name: 'EchartsGraph',
        meta: { title: 'Graph' },
      },
      {
        path: 'bar',
        component: () => import('@/views/echarts/Bar.vue'),
        name: 'EchartsBar',
        meta: { title: 'Bar' },
      },
    ],
  },
  {
    path: '/antv-g6',
    component: Layout,
    name: 'AntvG6',
    children: [
      {
        path: '',
        component: () => import('@/views/antv-g6/index.vue'),
        name: 'AntvG6Index',
        meta: { title: 'Antv/G6', icon: 'international' },
      },
    ],
  },
  nestedRouter,
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404',
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401.vue'),
        name: 'Page401',
        meta: { title: '401', noCache: true },
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404.vue'),
        name: 'Page404',
        meta: { title: '404', noCache: true },
      },
    ],
  },
]

export const asyncRoutes: RouterTy = [
  {
    path: '/documentation',
    component: Layout,
    name: 'Documentation',
    children: [
      {
        path: '',
        component: () => import('@/views/documentation/index.vue'),
        name: 'DocumentationIndex',
        meta: { title: 'Documentation', icon: 'documentation' },
      },
    ],
  },
  {
    path: '/profile',
    component: Layout,
    name: 'Profile',
    meta: { title: '', roles: ['admin'] },
    children: [
      {
        path: '',
        component: () => import('@/views/profile/index.vue'),
        name: 'ProfileIndex',
        meta: { title: 'Profile (Admin)', icon: 'user', roles: ['admin'] },
      },
    ],
  },

  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true },
]

function makeRouter() {
  return createRouter({
    history: createWebHistory(),
    scrollBehavior: () => ({ top: 0 }),
    routes: constantRoutes,
  })
}

export function resetRouter() {
  const permissionStore = usePermissionStore()
  permissionStore.resetRoutes()
}

const router: Router = makeRouter()

export default router
