import request from '@/utils/request'
import { ArticleQuery, ArticleData } from '~/article'

export function fetchList(params: ArticleQuery) {
  return request({
    baseURL: import.meta.env.VITE_MOCK_API,
    url: '/article/list',
    method: 'get',
    params
  })
}

export function updateArticle(data: ArticleData) {
  return request({
    baseURL: import.meta.env.VITE_MOCK_API,
    url: '/article/update',
    method: 'post',
    data
  })
}

export function createArticle(data: ArticleData) {
  return request({
    baseURL: import.meta.env.VITE_MOCK_API,
    url: '/article/create',
    method: 'post',
    data
  })
}

export function fetchPv(params: { pv: number }) {
  return request({
    baseURL: import.meta.env.VITE_MOCK_API,
    url: '/article/pv',
    method: 'get',
    params
  })
}
