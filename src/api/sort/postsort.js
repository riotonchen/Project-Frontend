import request from '@/utils/request'

export function postsort(token, name, type) {
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var member_id = decoded.user_id
  const data = {
    token,
    member_id,
    name,
    type,
    myorder: 0,
    syncstatus: 2
  }
  var requ_url = 'https://www.177together.com/api/sort/'

  return request({

    url: requ_url,
    method: 'post',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
