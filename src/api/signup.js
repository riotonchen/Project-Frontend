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
