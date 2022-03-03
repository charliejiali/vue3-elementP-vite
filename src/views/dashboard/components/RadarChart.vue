<template>
  <div ref="div" :class="className" :style="{height:height,width:width}" />
</template>

<script setup lang="ts">
import { resizeChart } from '../components/mixins/resize'
import { ObjTy } from '~/common'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入图表，图表后缀都为 Chart ，系列类型的定义后缀都为 SeriesOption
import { RadarChart, RadarSeriesOption } from 'echarts/charts'
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
    | RadarSeriesOption
    | TooltipComponentOption
    | GridComponentOption
    | LegendComponentOption
    >
// 注册必须的组件
echarts.use([
  RadarChart,
  CanvasRenderer,
  GridComponent,
  TooltipComponent,
  LegendComponent
])

const animationDuration = 3000

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
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    radar: {
      radius: '66%',
      center: ['50%', '42%'],
      splitNumber: 8,
      splitArea: {
        areaStyle: {
          color: 'rgba(127,95,132,.3)',
          opacity: 1,
          shadowBlur: 45,
          shadowColor: 'rgba(0,0,0,.5)',
          shadowOffsetX: 0,
          shadowOffsetY: 15
        }
      },
      indicator: [
        { name: 'Sales', max: 10000 },
        { name: 'Administration', max: 20000 },
        { name: 'Information Technology', max: 20000 },
        { name: 'Customer Support', max: 20000 },
        { name: 'Development', max: 20000 },
        { name: 'Marketing', max: 20000 }
      ]
    },
    legend: {
      left: 'center',
      bottom: '10',
      data: ['Allocated Budget', 'Expected Spending', 'Actual Spending']
    },
    series: [{
      type: 'radar',
      symbolSize: 0,
      areaStyle: {
        shadowBlur: 13,
        shadowColor: 'rgba(0,0,0,.2)',
        shadowOffsetX: 0,
        shadowOffsetY: 10,
        opacity: 1
      },
      data: [
        {
          value: [5000, 7000, 12000, 11000, 15000, 14000],
          name: 'Allocated Budget'
        },
        {
          value: [4000, 9000, 15000, 15000, 13000, 11000],
          name: 'Expected Spending'
        },
        {
          value: [5500, 11000, 12000, 15000, 12000, 12000],
          name: 'Actual Spending'
        }
      ],
      animationDuration
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
