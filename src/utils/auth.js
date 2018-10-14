import Cookies from 'js-cookie'

// 給定一個假想TOKEN
const TokenKey = 'Fake-Token'

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
