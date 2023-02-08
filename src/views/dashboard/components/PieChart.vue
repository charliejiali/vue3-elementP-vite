<template>
  <div ref="div" :class="className" :style="{height:height,width:width}" />
</template>

<script setup lang="ts">
import { resizeChart } from '../components/mixins/resize'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入图表，图表后缀都为 Chart ，系列类型的定义后缀都为 SeriesOption
import { PieChart, PieSeriesOption } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer是必须的一部
import { CanvasRenderer } from 'echarts/renderers'
// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
    | PieSeriesOption
    | TooltipComponentOption
    | GridComponentOption
    | LegendComponentOption
    >
// 注册必须的组件
echarts.use([
  PieChart,
  CanvasRenderer,
  GridComponent,
  TooltipComponent,
  LegendComponent
])

const props = defineProps({
  className: {
    type: String,
    default: 'chart'
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '350px'
  },
  autoResize: {
    type: Boolean,
    default: true
  }
})

const div = ref(null)
let chart: any = shallowRef()
const { resize } = resizeChart(chart)

const initChart = () => {
  if (div.value) {
    chart = echarts.init(div.value)
    setOptions()
  }
}

const setOptions = () => {
  const option: ECOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      left: 'center',
      bottom: '10',
      data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
    },
    series: [
      {
        name: 'WEEKLY WRITE ARTICLES',
        type: 'pie',
        roseType: 'radius',
        radius: [15, 95],
        center: ['50%', '38%'],
        data: [
          { value: 320, name: 'Industries' },
          { value: 240, name: 'Technology' },
          { value: 149, name: 'Forex' },
          { value: 100, name: 'Gold' },
          { value: 59, name: 'Forecasts' }
        ],
        animationEasing: 'cubicInOut',
        animationDuration: 2600
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

watch(
  () => resize.value,
  (val) => {
    nextTick(() => {
      chart.resize({
        animation: {
          duration: 300,
          easing: 'cubicInOut'
        }
      })
    })
  }
)

onBeforeUnmount(() => {
  if (!chart) {
    return
  }
  chart.dispose()
  chart = null
})
</script>
