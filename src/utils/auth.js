import Cookies from 'js-cookie'

// 給定一個原始假TOKEN
const TokenKey = 'AUTH-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

// 從API取得TOKEN並RESET
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
