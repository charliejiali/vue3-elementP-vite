<template>
  <div class="table-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" @keyup.enter="handleFilter" />
      <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="Type" clearable style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button type="primary" :icon="Search" @click="handleFilter">
        Search
      </el-button>
      <el-button style="margin-left: 10px;" type="primary" :icon="Edit" @click="handleCreate">
        Add
      </el-button>
      <el-checkbox v-model="showReviewer" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox>
    </div>

    <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @sort-change="sortChange"
    >
      <el-table-column label="序号" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template #default="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="160px" align="center">
        <template #default="{row}">
          <span>{{ parseTime(row.timestamp, '{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" min-width="150px">
        <template #default="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
          <el-tag>{{ typeFilter(row.type) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="110px" align="center">
        <template #default="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" label="审核人" width="110px" align="center">
        <template #default="{row}">
          <span style="color:red;">{{ row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重要性" width="80px">
        <template #default="{row}">
          <svg-icon v-for="n in row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column>
      <el-table-column label="阅读数" align="center" width="95">
        <template #default="{row}">
          <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{ row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="100">
        <template #default="{row}">
          <el-tag :type="statusFilter(row.status)">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template #default="{row, $index}">
          <el-button type="primary" size="small" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.status!=='published'" size="small" type="success" @click="handleModifyStatus(row,'published')">
            Publish
          </el-button>
          <el-button v-if="row.status!=='draft'" size="small" @click="handleModifyStatus(row,'draft')">
            Draft
          </el-button>
          <el-button v-if="row.status!=='deleted'" size="small" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" v-model="dialogFormVisible" draggable>
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            Cancel
          </el-button>
          <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
<!--    阅读数-->
    <el-dialog v-model="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <template #footer>
          <span class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Search, Edit } from '@element-plus/icons-vue'
import { fetchList, updateArticle, createArticle, fetchPv } from '@/api/article'
import { ObjTy } from '~/common'
import { parseTime } from '@/utils'
import { ElForm, ElNotification } from 'element-plus'
type FormInstance = InstanceType<typeof ElForm>
const dataForm = ref<FormInstance>()

const importanceOptions = [1, 2, 3]
const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]
// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const sortOptions = [
  { label: 'ID Ascending', key: '+id' },
  { label: 'ID Descending', key: '-id' }
]
const textMap = {
  update: 'Edit',
  create: 'Create'
}
const rules = {
  type: [{ required: true, message: 'type is required', trigger: 'change' }],
  timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
  title: [{ required: true, message: 'title is required', trigger: 'blur' }]
}
const statusOptions = ['published', 'draft', 'deleted']
const listQuery = reactive({
  page: 1,
  limit: 20,
  importance: undefined,
  title: undefined,
  type: undefined,
  sort: '+id'
})

// 表单弹窗
const defaultTemp = {
  id: '',
  importance: 1,
  remark: '',
  timestamp: '',
  title: '',
  type: '',
  status: 'published'
}
const temp = ref(defaultTemp)
const stateForm = reactive({
  dialogStatus: '',
  dialogFormVisible: false
})
const { dialogStatus, dialogFormVisible } = toRefs(stateForm)
/**
 * 重置temp数据
 */
const resetTemp = () => {
  temp.value = Object.assign({}, defaultTemp)
}
/**
 * 打开编辑弹窗
 * @param row table中一行的数据
 */
const handleUpdate = (row: any) => {
  temp.value = Object.assign({}, row)
  temp.value.timestamp = parseTime(new Date(temp.value.timestamp), '{y}-{m}-{d} {h}:{i}')
  stateForm.dialogStatus = 'update'
  stateForm.dialogFormVisible = true
  nextTick(() => {
    if (dataForm.value) { dataForm.value.clearValidate() }
  })
}
/**
 * 编辑数据
 */
const updateData = () => {
  if (dataForm.value) {
    dataForm.value.validate((valid: any) => {
      if (valid) {
        const tempData = Object.assign({}, temp.value)
        tempData.timestamp = parseTime(+new Date(tempData.timestamp), '{y}-{m}-{d} {h}:{i}')
        updateArticle(tempData).then(() => {
          const index = stateTable.list.findIndex((v: any) => v.id === temp.value.id)
          stateTable.list.splice(index, 1, temp.value)
          stateForm.dialogFormVisible = false
          ElNotification({
            title: 'Success',
            message: 'Update Successfully',
            type: 'success',
            duration: 2000
          })
        })
      }
    })
  }
}
/**
 * 显示创建窗口
 */
const handleCreate = () => {
  resetTemp()
  stateForm.dialogStatus = 'create'
  stateForm.dialogFormVisible = true
  nextTick(() => {
    if (dataForm.value) { dataForm.value.clearValidate() }
  })
}
/**
 * 创建数据
 */
const createData = () => {
  if (dataForm.value) {
    dataForm.value.validate((valid: any) => {
      if (valid) {
        temp.value.id = parseInt((Math.random() * 100).toFixed()) + 1024 + ''
        createArticle(temp.value).then(() => {
          stateTable.list.unshift(temp.value)
          stateForm.dialogFormVisible = false
          ElNotification({
            title: 'Success',
            message: 'Created Successfully',
            type: 'success',
            duration: 2000
          })
        })
      }
    })
  }
}

// table
const stateTable = reactive({
  tableKey: 0,
  listLoading: false,
  list: [] as any[],
  total: 0,
  showReviewer: false
})
const { tableKey, listLoading, list, total, showReviewer } = toRefs(stateTable)
/**
 * 获取table列表
 */
const getList = () => {
  stateTable.listLoading = true
  fetchList(listQuery).then(response => {
    stateTable.list = response.data.items
    stateTable.total = response.data.total

    setTimeout(() => {
      stateTable.listLoading = false
    }, 1.5 * 1000)
  })
}
/**
 * 修改状态
 * @param row table中一行的数据
 * @param status 状态
 */
const handleModifyStatus = (row: any, status: string) => {
  ElMessage({
    message: 'success',
    type: 'success'
  })
  row.status = status
}
/**
 * 删除数据
 * @param row table中一行的数据
 * @param index 当前数据的索引
 */
const handleDelete = (row: any, index: number) => {
  ElNotification({
    title: 'Success',
    message: 'Delete Successfully',
    type: 'success',
    duration: 2000
  })
  stateTable.list.splice(index, 1)
}
/**
 * 排序
 * @param data
 */
const sortChange = (data: ObjTy) => {
  const { prop, order } = data
  if (prop === 'id') {
    sortByID(order)
  }
}
/**
 * 排序
 * @param order
 */
const sortByID = (order: string) => {
  if (order === 'ascending') {
    listQuery.sort = '+id'
  } else {
    listQuery.sort = '-id'
  }
  handleFilter()
}
/**
 * 设置class名称
 * @param key
 */
const getSortClass = (key: string) => {
  const sort = listQuery.sort
  return sort === `+${key}` ? 'ascending' : 'descending'
}
/**
 * 搜索
 */
const handleFilter = () => {
  listQuery.page = 1
  getList()
}
/**
 * 状态映射
 * @param status
 */
const statusFilter = (status: any) => {
  const statusMap = {
    published: 'success',
    draft: 'info',
    deleted: 'danger'
  }
  return statusMap[status]
}
/**
 * 国家映射
 * @param type
 */
const typeFilter = (type: string) => {
  return calendarTypeKeyValue[type]
}

// 阅读数弹窗
const statePv = reactive({
  dialogPvVisible: false,
  pvData: [] as any[]
})
const { pvData, dialogPvVisible } = toRefs(statePv)
/**
 * 打开阅读数弹窗
 * @param d pageviews
 */
const handleFetchPv = (d: number) => {
  fetchPv({
    pv: d
  }).then(response => {
    statePv.pvData = response.data.pvData
    statePv.dialogPvVisible = true
  })
}

onBeforeMount(() => {
  getList()
})
</script>

<style lang="scss" scoped>
.table-container {
  padding: 20px;
}
</style>
