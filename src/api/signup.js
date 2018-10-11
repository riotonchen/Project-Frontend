import request from '@/utils/request'

export function Signup(username, password, membertype_id) {
  const data = {
    username,
    password,
    membertype_id
  }
  return request({
    url: 'https://www.177together.com/api/member',
    method: 'post',
    data
  })
}
