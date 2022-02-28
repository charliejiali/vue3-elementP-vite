import request from '@/utils/request'
import { ObjTy } from '~/common'

enum API {
  login = '/user/login',
  info = '/user/info',
  logout = '/user/logout'
}

export function login(data: ObjTy) {
  return request({
    url: API.login,
    method: 'post',
    data
  })
}

export function getInfo(params: ObjTy) {
  return request({
    url: API.info,
    method: 'get',
    params
  })
}

export function logout(data: ObjTy) {
  return request({
    url: API.logout,
    method: 'post',
    data
  })
}
