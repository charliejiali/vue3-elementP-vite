<template>
  <div>
    <h1>Basic</h1>
    <div>
      <blocks-tree :data="treeData" :horizontal="false"  :collapsable="false"></blocks-tree>
    </div>

    <h1>With slots</h1>
    <div>
      <blocks-tree
        :data="treeData"
        :horizontal="false"
        :collapsable="false"
        :props="{label: 'label', expand: 'expand', children: 'children',  key:'some_id'}"
      >
        <template #node="{data,context}">
<!--            <span>-->
<!--                <input type="checkbox" :checked="selected.indexOf(data.some_id)> -1" @change="(e)=>toggleSelect(data,e.target.checked)"/> {{data.label}}-->
<!--            </span>-->
          <div v-if="data.direction" class="text-vertical">{{ data.label }}</div>
          <div v-else>{{ data.label }}</div>
<!--          <br/>-->
<!--          <span v-if="data.children && data.children.length">-->
<!--                <a href="#" @click="context.toggleExpand">toggle expand</a>-->
<!--            </span>-->
        </template>
      </blocks-tree>
      <div>
        Selected: {{selected}}
      </div>
    </div>

    <h1>Change orientation</h1>
    <select v-model="treeOrientation">
      <option value="0">Vertical</option>
      <option value="1">Horizontal</option>
    </select>
  </div>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue'
import VueBlocksTree from 'vue3-blocks-tree'
import 'vue3-blocks-tree/dist/vue3-blocks-tree.css'

export default defineComponent({

  setup() {
    const selected = ref([])
    const treeOrientation = ref('0')
    const treeData = reactive({
      label: '董事会',
      expand: true,
      some_id: 1,
      children: [
        { label: '董事长', some_id: 2 },
        {
          label: '总裁办',
          some_id: 3,
          expand: false,
          children: [
            { label: '总裁办1', some_id: 31, direction: 'vertical' },
            { label: '总裁办2', some_id: 32, direction: 'vertical' },
            { label: '总裁办3', some_id: 33, direction: 'vertical' },
            { label: '总裁办4', some_id: 34, direction: 'vertical' },
            { label: '总裁办5', some_id: 35, direction: 'vertical' }
          ]
        },
        // { label: '总裁办', some_id: 3 },
        { label: '执行董事', some_id: 4 }
        // {
        //   label: 'subparent 1',
        //   some_id: 4,
        //   expand: false,
        //   children: [
        //     { label: 'subchild 1', some_id: 5 },
        //     {
        //       label: 'subchild 2',
        //       some_id: 6,
        //       expand: false,
        //       children: [
        //         { label: 'subchild 11', some_id: 7 },
        //         { label: 'subchild 22', some_id: 8 }
        //       ]
        //     }
        //   ]
        // }
      ]
    })

    const toggleSelect = (node, isSelected) => {
      isSelected ? selected.value.push(node.some_id) : selected.value.splice(selected.value.indexOf(node.some_id), 1)
      if (node.children && node.children.length) {
        node.children.forEach(ch => {
          toggleSelect(ch, isSelected)
        })
      }
    }

    return {
      treeData,
      selected,
      toggleSelect,
      treeOrientation
    }
  }
})

</script>

<style lang="scss" scoped>
.text-vertical {
  margin:0 auto;width:20px;line-height:24px;
}
</style>
