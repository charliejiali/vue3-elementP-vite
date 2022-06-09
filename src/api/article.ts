import request from '@/utils/request'
import { ObjTy } from '~/common'

export function fetchList(params: ObjTy) {
  return request({
    baseURL: import.meta.env.VITE_MOCK_API,
    url: '/article/list',
    method: 'get',
    params
  })
}

export function updateArticle(data: ObjTy) {
  return request({
    baseURL: import.meta.env.VITE_MOCK_API,
    url: '/article/update',
    method: 'post',
    data
  })
}

export function createArticle(data: ObjTy) {
  return request({
    baseURL: import.meta.env.VITE_MOCK_API,
    url: '/article/create',
    method: 'post',
    data
  })
}

export function fetchPv(params: ObjTy) {
  return request({
    baseURL: import.meta.env.VITE_MOCK_API,
    url: '/article/pv',
    method: 'get',
    params
  })
}
