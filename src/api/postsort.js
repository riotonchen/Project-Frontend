import request from '@/utils/request'

export function postsort(token, member_id, name, type) {
  const data = {
    token,
    member_id,
    name,
    type
  }
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/sort/?member_id=' + user_id + '&type=' + type + '/'

  return request({

    url: requ_url,
    method: 'post',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
