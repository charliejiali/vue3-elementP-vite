import request from '@/utils/request'
import { ObjTy } from '~/common'

export function fetchList(params: ObjTy) {
  return request({
    url: '/article/list',
    method: 'get',
    params
  })
}

export function updateArticle(data: ObjTy) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}

export function createArticle(data: ObjTy) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function fetchPv(params: ObjTy) {
  return request({
    url: '/article/pv',
    method: 'get',
    params
  })
}
