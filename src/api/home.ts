import request from '@/utils/request'
import { ObjTy } from '~/common'

enum API {
    list = '/home/list'
}

export function getList(params: ObjTy) {
  return request({
    url: API.list,
    method: 'get',
    params
  })
}
