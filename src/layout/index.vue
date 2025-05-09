<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'

const appStore = useAppStore()
const sidebarState = computed(() => {
  return appStore.sidebar
})

const data = reactive({
  fixedHeader: false,
  classObj: computed(() => {
    return {
      hideSidebar: !sidebarState.value.opened,
      openSidebar: sidebarState.value.opened,
      withoutAnimation: sidebarState.value.withoutAnimation,
    }
  }),
})

const { fixedHeader, classObj } = toRefs(data)
</script>

<template>
  <div :class="classObj" class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <Navbar />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/mixin.scss' as mixins;
@use '@/styles/variables.scss' as vars;

.app-wrapper {
  @include mixins.clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar{
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{vars.$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>
