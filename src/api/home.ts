import request from '@/utils/request'
import { ObjTy } from '~/common'

enum API {
    list = '/home/list'
}

export function getList(params: ObjTy) {
  return request({
    baseURL: import.meta.env.VITE_MOCK_API,
    url: API.list,
    method: 'get',
    params
  })
}
