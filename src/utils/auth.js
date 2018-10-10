import Cookies from 'js-cookie'
import {
  loginByUsername
} from '@/api/login'

const TokenKey = 'Admin-Token'
// const TokenKey = loginByUsername

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
