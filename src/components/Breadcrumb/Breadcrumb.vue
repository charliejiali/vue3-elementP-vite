<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect' || index === levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { compile } from 'path-to-regexp'

import { RouteItemTy } from '~/router'

const levelList: any = ref(null)
const route = useRoute()
const router = useRouter()

const getBreadcrumb = () => {
  const matched: any = route.matched.filter(item => item.meta && item.meta.title)
  levelList.value = matched.filter((item: RouteItemTy) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}
const pathCompile = (path: string) => {
  const { params } = route
  const toPath = compile(path)
  return toPath(params)
}

const handleLink = (item: RouteItemTy) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  if (path) {
    router.push(pathCompile(path))
  }
}

watch(
  () => route.path,
  () => {
    if (route.path.startsWith('/redirect')) {
      return
    }
    getBreadcrumb()
  },
  { immediate: true }
)

getBreadcrumb()

</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
