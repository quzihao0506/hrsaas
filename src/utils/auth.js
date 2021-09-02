// import Cookies from 'js-cookie'

const TokenKey = 'hrsaas_hm__token'

export function getToken() {
  return window.localStorage.getItem(TokenKey)
  // return Cookies.get(TokenKey)
}

export function setToken(token) {
  window.localStorage.setItem(TokenKey, token)
  // return Cookies.set(TokenKey, token)
}

export function removeToken() {
  window.localStorage.removeItem(TokenKey)
  // return Cookies.remove(TokenKey)
}
