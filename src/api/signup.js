import request from '@/utils/request'

export function Postsignup(account, password, membertype) {
  const data = {
    account,
    password,
    membertype
  }
  return request({
    url: 'https://www.177together.com/api/member/',
    method: 'post',
    data
  })
}

export function Post_a_signup(account, password) {
  const data = {
    account,
    password,
    membertype: 1
  }
  return request({
    url: 'https://www.177together.com/api/member/',
    method: 'post',
    data
  })
}
