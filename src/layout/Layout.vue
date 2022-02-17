<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain.vue'

const store = useStore()
const sidebarState = computed(() => {
  return store.state.app.sidebar
})

const data = reactive({
  fixedHeader: false,
  classObj: computed(() => {
    return {
      hideSidebar: !sidebarState.value.opened,
      openSidebar: sidebarState.value.opened,
      withoutAnimation: sidebarState.value.withoutAnimation
    }
  })
})

const { fixedHeader, classObj } = toRefs(data)
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
@import 'src/styles/variables.scss';

.app-wrapper {
  @include clearfix;
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
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>
