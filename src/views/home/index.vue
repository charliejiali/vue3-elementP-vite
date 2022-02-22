<template>
  <div class="test-container">
    <el-button>home</el-button>
    <div>mock: {{ mockData }}</div><br>
    <div>online: {{ onlineData }}</div>
    <el-calendar />
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { getList } from '@/api/home'
import { getTestList } from '@/api/test'

const dataObj = reactive({
  mockData: null,
  onlineData: null
})

getList({}).then(({ data }) => {
  dataObj.mockData = data
})
getTestList({}).then(({ data }) => {
  dataObj.onlineData = data
})

const { mockData, onlineData } = toRefs(dataObj)
</script>
