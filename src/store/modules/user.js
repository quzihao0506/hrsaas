import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getInfo } from '@/api/user'
const state = {
  // 初始化，从本地缓存读取token
  // vuex的持久化实现？ 通过本地缓存 + vuex 实现持久化和响应式
  token: getToken(),
  userInfo: null
}

const mutations = {
  setToken(state, token) {
    state.token = token
    // 存入本地缓存，持久化
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    // 清除本地缓存
    removeToken()
  },
  // state中存储user
  setUser(state, user) {
    state.userInfo = user
  },
  RESET_TOKEN(state) {
    state.token = null
    state.userInfo = {}
  }
}

const actions = {
  // 登录
  async login({ commit }, data) {
    const res = await login(data)
    console.log('res登录', res)
    if (res.status === 201) {
      commit('setToken', res.data.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 获取用户信息
  async getInfo({ commit }) {
    const res = await getInfo()
    console.log('用户资料', res)
    commit('setUser', res.data.data)
  },
  // 重置用户信息
  resetToken({ commit }) {
    return new Promise((resolve, reject) => {
      removeToken() // 清空本地存储的token
      commit('RESET_TOKEN')
      resolve()
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      removeToken() // 清空本地存储的token
      commit('RESET_TOKEN')
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

