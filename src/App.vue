<script setup>
import en from 'element-plus/dist/locale/en.mjs'

const locale = en
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
