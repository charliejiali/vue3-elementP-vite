<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
// import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// const locale = zhCn
import en from 'element-plus/lib/locale/lang/en'
const locale = en
</script>
