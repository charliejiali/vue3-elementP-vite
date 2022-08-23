import request from '@/utils/request'

enum API {
  graph = '/echarts/graph-data'
}

export function getGraphData(params: {
  name: string
}) {
  return request({
    baseURL: import.meta.env.VITE_MOCK_API,
    url: API.graph,
    method: 'get',
    params
  })
}
