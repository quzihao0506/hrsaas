import axios from 'axios'
// import { Promise } from 'core-js'
// import { Message } from 'element-ui'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',
  timeout: 5000
})

request.interceptors.request.use(config => {
  console.log('config', config)
  const token = window.localStorage.getItem('hrsaas_hm__token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
// request.interceptors.response.use(response => {
//   const { success, data, message } = response.data
//   if (success) {
//     return data
//   } else {
//     Message.error(message)
//     return Promise.reject(new Error(message))
//   }
// }, error => {
//   Message.error(error.message)
//   return Promise.reject(error)
// })

export default request
