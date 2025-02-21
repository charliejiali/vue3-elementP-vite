<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { usePermissionStore } from '@/stores/permission'
import { useSettingsStore } from '@/stores/settings'
import variables from '@/styles/variables.module.scss'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'

const route = useRoute()

const settingsStore = useSettingsStore()
const appStore = useAppStore()
const permissionStore = usePermissionStore()
const sidebarState = computed(() => {
  return appStore.sidebar
})

const data = reactive({
  showLogo: computed(() => {
    return settingsStore.sidebarLogo
  }),
  permission_routes: computed(() => {
    return permissionStore.permission_routes
  }),
  activeMenu: computed(() => {
    const { meta, path } = route
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  }),
  isCollapse: computed(() => {
    return !sidebarState.value.opened
  }),
})

const { showLogo, permission_routes, activeMenu, isCollapse } = toRefs(data)
</script>

<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo v-if="showLogo" :collapse="isCollapse" />
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
        <SidebarItem v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
