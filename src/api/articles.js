import request from '@/utils/request'

export function getArticlesData(params) {
  return request({
    method: 'get',
    url: '/mp/v1_0/articles',
    params
  })
}

// 获取频道
export function getChannelsData(data) {
  return request({
    method: 'get',
    url: '/mp/v1_0/channels',
    data
  })
}
