<script setup lang="ts">
import G6 from '@antv/g6'
import { resizeChart } from './mixins/resize'

const props = defineProps({
  containerId: {
    type: String,
    default: 'dagre-container',
  },
  jsonData: {
    type: String,
    default: '{}',
  },
})

const width = ref(0)
const height = ref(0)
const graph: any = shallowRef()
const { resize } = resizeChart()

watch(
  () => resize.value,
  () => {
    const container = document.getElementById(props.containerId)
    if (container) {
      width.value = container.clientWidth
    }
    console.log(width, height)
    nextTick(() => {
      graph.value.changeSize(width, height)
      graph.value.fitView()
    })
  },
)

onMounted(() => {
  const container = document.getElementById(props.containerId)

  if (container) {
    width.value = container.scrollWidth || 500
    height.value = container.scrollHeight || 470
  }

  nextTick(() => {
    initChart()
  })
})

onBeforeUnmount(() => {
  if (!graph.value) {
    return
  }
  graph.value.destroy()
  graph.value = null
})

interface NodesData {
  name: string
  id: string
}
interface EdgesData {
  source: string
  target: string
  label: string
  labelCfg: {
    refX: number
    refY: number
  }
}

watch(
  () => props.jsonData,
  (val) => {
    const jsonData = isJson(val)

    if (jsonData !== false && 'nodes' in jsonData && 'links' in jsonData) {
      const nodes = jsonData.nodes.reduce((prev: NodesData[], item: { name: string, id: string }) => {
        prev.push({
          name: item.name,
          id: item.id,
        })
        return prev
      }, [] as NodesData[])

      const edges = jsonData.links.reduce((prev: EdgesData[], item: { source: string, target: string, type: string }) => {
        prev.push({
          source: item.source,
          target: item.target,
          label: item.type,
          labelCfg: {
            refX: 5,
            refY: 15,
          },
        })
        return prev
      }, [] as EdgesData[])

      graph.value.data({
        nodes,
        edges,
      })
      graph.value.render()
    }
    else {
      graph.value.clear()
    }
  },
  { deep: true },
)

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
function initChart() {
  graph.value = new G6.Graph({
    container: props.containerId,
    width: width.value,
    height: height.value,
    layout: {
      rankdir: 'LR',
      type: 'dagre',
      // nodesepFunc: (d) => {
      //   if (d.id === '3') {
      //     return 500
      //   }
      //   return 50
      // },
      nodesep: 60,
      ranksep: 60,
      controlPoints: true,
    },
    defaultNode: {
      type: 'sql',
    },
    defaultEdge: {
      type: 'polyline',
      style: {
        radius: 20,
        offset: 45,
        endArrow: true,
        lineWidth: 2,
        stroke: '#C2C8D5',
      },
    },
    nodeStateStyles: {
      selected: {
        stroke: '#d9d9d9',
        fill: '#5394ef',
      },
    },
    modes: {
      default: [
        'drag-canvas',
        'zoom-canvas',
        'click-select',
        // {
        //   type: 'tooltip',
        //   formatText(model) {
        //     const cfg = model.conf
        //     const text = []
        //     cfg.forEach((row) => {
        //       text.push(row.label + ':' + row.value + '<br>')
        //     })
        //     return text.join('\n')
        //   },
        //   offset: 30
        // }
      ],
    },
    fitView: true,
    fitViewPadding: 10,
  })

  const jsonData = isJson(props.jsonData)
  if (jsonData !== false && 'nodes' in jsonData && 'links' in jsonData) {
    const nodes = jsonData.nodes.reduce((prev: NodesData[], item: { name: string, id: string }) => {
      prev.push({
        name: item.name,
        id: item.id,
      })
      return prev
    }, [])
    const edges = jsonData.links.reduce((prev: EdgesData[], item: { source: string, target: string, type: string }) => {
      prev.push({
        source: item.source,
        target: item.target,
        label: item.type,
        labelCfg: {
          refX: 5,
          refY: 15,
        },
      })
      return prev
    }, [])

    graph.value.data({
      nodes,
      edges,
    })
    graph.value.render()
  }
}

G6.registerNode(
  'sql',
  {
    drawShape(cfg: any, group: any) {
      const rect = group.addShape('rect', {
        attrs: {
          x: -75,
          y: -25,
          width: 150,
          height: 50,
          radius: 10,
          stroke: '#5B8FF9',
          fill: '#C6E5FF',
          lineWidth: 3,
        },
        name: 'rect-shape',
      })
      if (cfg.name) {
        group.addShape('text', {
          attrs: {
            text: cfg.name,
            x: 0,
            y: 0,
            fill: '#00287E',
            fontSize: 14,
            textAlign: 'center',
            textBaseline: 'middle',
            fontWeight: 'bold',
          },
          name: 'text-shape',
        })
      }
      return rect
    },
  },
  'single-node',
)
</script>

<template>
  <div :id="containerId" />
</template>
