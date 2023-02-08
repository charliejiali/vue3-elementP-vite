import request from '@/utils/request'
import { UserLogin, UserInfo } from '~/user'

enum API {
  login = '/user/login',
  info = '/user/info',
  logout = '/user/logout'
}

export function login(data: UserLogin) {
  return request({
    baseURL: import.meta.env.VITE_MOCK_API,
    url: API.login,
    method: 'post',
    data
  })
}

export function getInfo(params: UserInfo) {
  return request({
    baseURL: import.meta.env.VITE_MOCK_API,
    url: API.info,
    method: 'get',
    params
  })
}

export function logout(data: UserInfo) {
  return request({
    baseURL: import.meta.env.VITE_MOCK_API,
    url: API.logout,
    method: 'post',
    data
  })
}
