<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="false"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { toRefs, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.module.scss'

const route = useRoute()
const router = useRouter()
const { state, getters } = useStore()

const data = reactive({
  showLogo: computed(() => {
    return state.settings.sidebarLogo
  }),
  permission_routes: router.options.routes,
  // permission_routes: computed(() => {
  //   return getters.permission_routes
  // }),
  activeMenu: computed(() => {
    const { meta, path } = route
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  }),
  isCollapse: computed(() => {
    return !state.app.sidebar.opened
  })
})

const { showLogo, permission_routes, activeMenu, isCollapse } = toRefs(data)
</script>
