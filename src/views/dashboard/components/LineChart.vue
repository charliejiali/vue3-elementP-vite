<template>
  <div ref="div" :class="className" :style="{height:height,width:width}" />
</template>

<script setup lang="ts">
import { resizeChart } from '../components/mixins/resize'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入折线图图表，图表后缀都为 Chart ，系列类型的定义后缀都为 SeriesOption
import { LineChart, LineSeriesOption } from 'echarts/charts'
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
  | LineSeriesOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
>
// 注册必须的组件
echarts.use([
  LineChart,
  CanvasRenderer,
  GridComponent,
  TooltipComponent,
  LegendComponent
])

const animationDuration = 2800

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
  },
  chartData: {
    type: Object,
    required: true
  }
})

const div = ref(null)
let chart: any = shallowRef()
const { resize } = resizeChart(chart)

const initChart = () => {
  if (div.value) {
    chart = echarts.init(div.value)
    setOptions(props.chartData)
  }
}

const setOptions = (data: any) => {
  const option: ECOption = {
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      boundaryGap: false,
      axisTick: {
        show: false
      }
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 20,
      top: 30,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      padding: [5, 10]
    },
    yAxis: {
      axisTick: {
        show: false
      }
    },
    legend: {
      data: ['expected', 'actual']
    },
    series: [{
      name: 'expected',
      itemStyle: {
        color: '#FF005A'
      },
      lineStyle: {
        color: '#FF005A',
        width: 2
      },
      smooth: true,
      type: 'line',
      data: data.expectedData,
      animationDuration,
      animationEasing: 'cubicInOut'
    },
    {
      name: 'actual',
      smooth: true,
      type: 'line',
      itemStyle: {
        color: '#3888fa'
      },
      lineStyle: {
        color: '#3888fa',
        width: 2
      },
      areaStyle: {
        color: '#f3f8ff'
      },
      data: data.actualData,
      animationDuration,
      animationEasing: 'quadraticOut'
    }]
  }
  chart.setOption(option)
}

onMounted(() => {
  nextTick(() => {
    initChart()
  })
})

watch(
  () => props.chartData,
  (val) => {
    setOptions(val)
  },
  { deep: true }
)

watch(
  () => resize.value,
  (val) => {
    nextTick(() => {
      chart.resize({
        animation: {
          duration: animationDuration,
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
