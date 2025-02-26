<script setup lang="ts">
import ChartDagre from './components/Dagre.vue'

const DEFAULT_JSON = {
  nodes: [
    {
      id: '100001',
      name: 'name1',
    },
    {
      id: '100002',
      name: 'name2',
    },
    {
      id: '100003',
      name: 'name3',
    },
    {
      id: '100004',
      name: 'name4',
    },
    {
      id: '100005',
      name: 'name5',
    },
    {
      id: '100006',
      name: 'name6',
    },
    {
      id: '100007',
      name: 'name7',
    },
  ],
  links: [
    {
      source: '100001',
      target: '100002',
      type: 'type1',
    },
    {
      source: '100002',
      target: '100003',
      type: 'type2',
    },
    {
      source: '100003',
      target: '100004',
      type: 'type3',
    },
    {
      source: '100004',
      target: '100005',
      type: 'type4',
    },
    {
      source: '100005',
      target: '100006',
      type: 'type5',
    },
    {
      source: '100005',
      target: '100007',
      type: 'type6',
    },
  ],
}

const inputJson = ref(JSON.stringify(DEFAULT_JSON))
const chartJson = ref('')

function makeChart() {
  const jsonData = isJson(inputJson.value)

  if (jsonData !== false) {
    chartJson.value = inputJson.value
  }
}

function isJson(str: any) {
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str)
      if (typeof obj === 'object' && obj) {
        return obj
      }
      else {
        return false
      }
    }
    catch (e) {
      console.log(`error：${str}!!!${e}`)
      return false
    }
  }
  else {
    console.log('It is not a string!')
    return false
  }
}

onMounted(() => {
  nextTick(() => {
    makeChart()
  })
})
</script>

<template>
  <div class="antv-g6-index-container">
    <el-row>
      <el-col :span="6">
        <el-input v-model="inputJson" type="textarea" :rows="20" />
        <el-button type="primary" style="float: right; margin-top: 10px;" @click="makeChart">
          生成预览图
        </el-button>
      </el-col>
      <el-col :span="18">
        <ChartDagre :json-data="chartJson" container-id="dager-container-edit" />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">

</style>
