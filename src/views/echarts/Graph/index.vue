<template>
  <div class="echarts-graph-container">
    <div ref="div" class="chart-graph" />
    <div id="rightMenu" class="menu" style="display: none">
      <ul>
        <li style="cursor: pointer;" @click="handleClick">扩展</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getGraphData } from '@/api/echarts'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入图表，图表后缀都为 Chart ，系列类型的定义后缀都为 SeriesOption
import { GraphChart, GraphSeriesOption } from 'echarts/charts'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer是必须的一部
import { CanvasRenderer } from 'echarts/renderers'
// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<GraphSeriesOption>
// 注册必须的组件
echarts.use([GraphChart, CanvasRenderer])

const chartData: any[] = [
  {
    name: '中心',
    symbolSize: 40,
    value: 1
  }
]
const chartLinks: any[] = []
const chartCategories: any[] = []

const nodeData = {
  name: '',
  category: ''
}
const handleClick = () => {
  getGraphData({
    name: nodeData.name
  }).then(({ data }) => {
    makeNewData(data)
    setRightMenuVisible('hide')
  })
}
const setRightMenuVisible = (type: string, left = 0, top = 0) => {
  const divRightMenu: HTMLElement | null = document.querySelector('#rightMenu')
  if (divRightMenu) {
    if (type === 'show') {
      divRightMenu.style.display = 'block'
      divRightMenu.style.left = left + 15 + 'px'
      divRightMenu.style.top = top + 15 + 'px'
    } else { // hide
      divRightMenu.style.display = 'none'
      divRightMenu.style.left = '-9999px'
      divRightMenu.style.top = '-9999px'
    }
  }
}
const makeNewData = (data: any) => {
  data.forEach(({ name, value }: { name: string, value: number }) => {
    if (nodeData.category === '') {
      chartData.push({
        name,
        value,
        symbolSize: value,
        category: name
      })
      chartCategories.push({
        name
      })
    } else {
      chartData.push({
        name,
        value,
        symbolSize: value,
        category: nodeData.category
      })
    }
    chartLinks.push({
      source: nodeData.name,
      target: name
    })
  })
  setOptions()
}

const div = ref(null)
let chart: any = shallowRef()

const initChart = () => {
  if (div.value) {
    chart = echarts.init(div.value)
    setOptions()

    chart.getZr().on('click', (e: any) => {
      nodeData.name = ''
      setRightMenuVisible('hide')
    })
    chart.on('contextmenu', (e: any) => {
      nodeData.name = e.data.name
      nodeData.category = e.data.category || ''

      setRightMenuVisible('show', e.event.offsetX, e.event.offsetY)
    })
  }
}

const setOptions = () => {
  chart.clear()
  const option: ECOption = {
    backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
      {
        offset: 0,
        color: '#f7f8fa'
      },
      {
        offset: 1,
        color: '#cdd0d5'
      }
    ]),
    series: [
      {
        name: '专利',
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 400,
          gravity: 0.1
        },
        data: chartData,
        links: chartLinks,
        categories: chartCategories,
        focusNodeAdjacency: true,
        roam: true,
        label: {
          show: true,
          position: 'top'
        },
        lineStyle: {
          color: 'source',
          curveness: 0,
          type: 'solid'
        }
      }
    ]
  }

  chart.setOption(option)
}

onMounted(() => {
  nextTick(() => {
    initChart()
  })
})

onBeforeUnmount(() => {
  if (!chart) {
    return
  }
  chart.getZr().off('click')
  chart.off('contextmenu')
  chart.dispose()
  chart = null
})
</script>

<style lang="scss" scoped>
.chart-graph {
  width: 100%;
  height: calc(100vh - 50px);
}
.menu {
  position: absolute;
  background: rgba(3, 3, 3, 0.6);
  border-radius: 5px;
  left: -99999px;
  top: -99999px;
}
.menu ul {
  list-style: none;
}
.menu ul li {
  padding: 5px 10px;
  color: #ffffff;
  border-bottom: 1px dashed #ffffff;
}
.menu ul li:last-child {
  border-bottom: none;
}
</style>
