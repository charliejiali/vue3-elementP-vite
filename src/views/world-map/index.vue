<template>
  <div class="world-map-container">
    <div ref="map" class="map-chart" />
    <div
      v-for="(items, key) in cardData"
      :id="key"
      :key="key"
      ref="boxCard"
      class="box-card"
      :style="{ left: items.left, top: items.top }"
    >
      <ul>
        <li
          v-for="(item, index) in items.data"
          :id="'card-row-'+key+'-'+index"
          :key="index"
          class="box-card-item"
          :class="{'box-card-item-highlight':item.highlight}"
        >
          {{ item.value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core'
// 引入图表，图表后缀都为 Chart ，系列类型的定义后缀都为 SeriesOption
import {
  MapChart, MapSeriesOption,
  EffectScatterChart, EffectScatterSeriesOption,
  LinesChart, LinesSeriesOption
} from 'echarts/charts'
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
    | MapSeriesOption
    | EffectScatterSeriesOption
    | LinesSeriesOption
    | TooltipComponentOption
    | GridComponentOption
    | LegendComponentOption
    >
// 注册必须的组件
echarts.use([
  MapChart,
  EffectScatterChart,
  LinesChart,
  CanvasRenderer,
  GridComponent,
  TooltipComponent,
  LegendComponent
])

const map = ref(null)
let chart: any = shallowRef()
import { getWorldObj } from './world' // https://img.hcharts.cn/mapdata/
const cardData = ref()
const initChart = () => {
  if (map.value) {
    chart = echarts.init(map.value)
    echarts.registerMap('world', (getWorldObj()) as any)
    setOptions(pointsData, guideLineData)

    const _cardData = {}
    infoJson.forEach((data) => {
      if (intersectCountry.includes(data.country)) {
        const _data = Object.assign(data, { highlight: false })
        if (data.country in _cardData) {
          _cardData[data.country].data.push(_data)
        } else {
          const leftTop = chart.convertToPixel('geo', countryCoord[data.country].div_coordinate)
          _cardData[data.country] = {
            left: leftTop[0] + 'px',
            top: leftTop[1] + 'px',
            data: [_data]
          }
        }
      }
    })
    cardData.value = _cardData
  }
}

const zoom = 1.5

import cardDataJson from './card-data.json'
const infoJson = cardDataJson.data
const infoJsonCountry = infoJson.reduce((prev: string[], { country }) => {
  if (!prev.includes(country)) {
    prev.push(country)
  }
  return prev
}, [])
import countryJson from './country.json'
const countryJsonCountry = countryJson.data.reduce((prev: string[], { short_name }) => {
  prev.push(short_name)
  return prev
}, [])
const countryMap = countryJson.data.reduce((prev, { short_name, cn_name }) => {
  prev[short_name] = cn_name
  return prev
}, {})
const intersectCountry = infoJsonCountry.filter(v => countryJsonCountry.includes(v))

import nameMap from './nameMap.json'
import { PointsTy, CountryCoordTy, GuideLineTy } from '~/world-map'
const pointsData: PointsTy[] = [] // 点
const countryCoord: CountryCoordTy = {} // 国家相关坐标
const guideLineData: GuideLineTy[] = [] // 引导线

countryJson.data.forEach(
  ({
    cn_name,
    short_name,
    coordinate,
    div_coordinate,
    line_coordinate,
    transform_origin
  }) => {
    if (intersectCountry.includes(short_name)) {
      if (coordinate[0] < -20) {
        coordinate[0] = coordinate[0] + 360
      }
      pointsData.push({
        name: cn_name,
        value: coordinate.concat([1])
      })
      guideLineData.push({
        name: cn_name,
        value: 1,
        coords: [coordinate, line_coordinate]
      })
      countryCoord[short_name] = {
        coordinate,
        div_coordinate,
        line_coordinate,
        transform_origin
      }
    }
  }
)

const setOptions = (pointsData: PointsTy[], guideLineData: GuideLineTy[]) => {
  const option: ECOption = {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    geo: [
      {
        show: true,
        map: 'world',
        coordinateSystem: 'geo',
        roam: false, // 是否允许缩放
        zoom, // 默认显示级别
        layoutSize: '95%',
        layoutCenter: ['50%', '50%'],
        zlevel: 3,
        nameMap,
        itemStyle: {
          borderColor: '#0bf7e1',
          borderWidth: 1,
          areaColor: {
            type: 'linear-gradient',
            x: 0,
            y: 400,
            x2: 0,
            y2: 0,
            colorStops: [{
              offset: 0,
              color: '#022e5b'
            }, {
              offset: 1,
              color: 'rgba(15,169,195,0.3)' // 50% 处的颜色
            }],
            global: true // 缺省为 false
          }
        },
        emphasis: {
          itemStyle: {
            areaColor: '#0160AD'
          },
          label: {
            show: 0,
            color: '#fff'
          }
        },
        silent: true
      },
      {
        map: 'world',
        roam: false, // 是否允许缩放
        zoom, // 默认显示级别
        layoutSize: '95%',
        layoutCenter: ['50%', '50%'],
        itemStyle: {
          borderColor: 'rgba(192,245,249,.6)',
          borderWidth: 2,
          shadowColor: '#2C99F6',
          shadowOffsetY: 0,
          shadowBlur: 120,
          areaColor: 'rgba(29,85,139,.2)'
        },
        zlevel: 2,
        silent: true
      },
      {
        map: 'world',
        roam: false, // 是否允许缩放
        zoom, // 默认显示级别
        layoutSize: '95%',
        layoutCenter: ['50%', '51.5%'],
        itemStyle: {
          areaColor: '#013c62',
          borderWidth: 0
        },
        zlevel: 1,
        silent: true
      }
    ],
    series: [
      // 引导线
      {
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 3,
        lineStyle: {
          width: 1,
          type: 'solid',
          opacity: 1,
          color: '#ffa927'
        },
        data: guideLineData
      },
      {
        name: 'line',
        type: 'lines',
        coordinateSystem: 'geo',
        data: [
          {
            coords: [
              [280, 38],
              [116, 39]
            ]
          },
          {
            coords: [
              [37, 55],
              [116, 39]
            ]
          }
        ],
        effect: {
          show: true,
          period: 4, // 箭头指向速度，值越小速度越快
          trailLength: 0.1, // 特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: 'arrow', // 箭头图标
          symbolSize: 5 // 图标大小
        },
        lineStyle: {
          color: '#FF0C10',
          width: 0.5, // 尾迹线条宽度
          opacity: 0.5, // 尾迹线条透明度
          curveness: 0.3 // 尾迹线条曲直度
        },
        zlevel: 4
      },
      {
        name: 'Effect Scatter',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 4,
        rippleEffect: {
          // 涟漪特效
          period: 3, // 动画时间，值越小速度越快
          brushType: 'fill', // 波纹绘制方式 stroke, fill
          scale: 2.5 // 波纹圆环最大限制，值越大波纹越大
        },
        label: {
          // show: true,
          fontWeight: 'bolder',
          position: 'right', // 显示位置
          offset: [5, 0], // 偏移设置
          formatter: function(params) {
            // 圆环显示文字
            return (params.data as PointsTy).name
          },
          fontSize: 16
        },
        symbol: 'circle',
        symbolSize: [10, 8],
        itemStyle: {
          color: '#ffa927'
        },
        data: pointsData
      },
      {
        name: 'World Map',
        coordinateSystem: 'geo',
        nameMap,
        geoIndex: 0,
        zlevel: 1,
        itemStyle: {
          borderColor: '#2ab8ff',
          borderWidth: 1.5,
          areaColor: '#12235c'
        },
        emphasis: {
          itemStyle: {
            areaColor: '#2AB8FF',
            borderWidth: 0,
            color: 'red'
          }
        },
        silent: true,
        type: 'map',
        roam: true,
        map: 'world'
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
  chart.dispose()
  chart = null
})
</script>

<style lang="scss" scoped>
.world-map-container {
  height: calc(100vh - 50px);
  background: #082453;

  .map-chart {
    height: 100%;
    width: 100%;
    position: absolute;
  }

  .box-card {
    background-color: rgba(4, 5, 33, 0.35);
    box-shadow: rgba(255, 169, 39, 0.5) 0 0 15px inset;
    border: 1px solid rgba(255, 169, 39, 0.5);
    max-width: 155px;
    width: fit-content;
    max-height: 200px;
    position: absolute;
    z-index: 300;
    overflow: scroll;
    overflow-x: auto;
    overflow-y: auto;
    font-size: 14px;
    transform-origin: bottom right;
    word-wrap: break-word;

    .box-card-item {
      color: #ffffff;
      font-family: "Microsoft YaHei",serif;
      font-size: 16px;
      cursor: pointer;
      padding: 5px 16px;
    }
    .box-card-item:hover {
      background: rgba(255,169,39,0.2);
    }

    .box-card-item-selected {
      color: #ffffff;
      font-family: "Microsoft YaHei", sans-serif;
      font-size: 16px;
      cursor: pointer;
      padding: 5px 16px 5px 16px;
      background: #ffa927;
    }

    .box-card-item-highlight {
      font-family: "Microsoft YaHei", sans-serif;
      font-size: 16px;
      color: #ed2939;
    }

    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
  }
  .box-card::-webkit-scrollbar {
    height: 2px;
    width: 2px;
  }
  .box-card::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
  }
  .box-card::-webkit-scrollbar {
    height: 2px;
    width: 2px;
  }
  .box-card::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
  }
}
</style>
