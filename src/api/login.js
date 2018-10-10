import request from '@/utils/request'
/*
import {
  strict
} from 'assert'
*/
/*
export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      token
    }
  })
}
*/
export function loginByUsername(username, password, membertype_id) {
  const data = {
    username: username + '\;' + membertype_id,
    password,
    membertype_id
  }
  return request({
    url: 'https://www.177together.com/api-token-jwtauth',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: 'https://www.177together.com/api-token-jwtauth',
    method: 'post'
  })
}

export function getUserInfo(token) {
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  console.log(decoded)
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/member/' + user_id + '/'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    }
  })
}
