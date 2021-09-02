import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/mp/v1_0/authorizations',
    method: 'POST',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/mp/v1_0/user/profile',
    method: 'get'
  })
}

export function logout() {
}
