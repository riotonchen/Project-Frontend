import request from '@/utils/request'
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
    username,
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
  return request({
    url: 'https://www.177together.com/api/member/3/',
    method: 'get',
    params: {
      token
    }
  })
}
