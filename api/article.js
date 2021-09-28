import { request } from '@/plugins/request'

export const getArticles = (params) => {
  return request({
    url: '/api/articles',
    method: 'get',
    params
  })
}

export const addFavorite = (slug) => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: 'post'
  })
}

export const deleteFavorite = (slug) => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: 'delete'
  })
}
