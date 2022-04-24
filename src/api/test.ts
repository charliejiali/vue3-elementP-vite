import request from '@/utils/request'
import { ObjTy } from '~/common'

enum API {
    list = '/screen/latest-report'
}

export function getTestList(params: ObjTy) {
  return request({
    baseURL: import.meta.env.VITE_BASE_TEST_API,
    url: API.list,
    method: 'get',
    params
  })
}
