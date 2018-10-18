import request from '@/utils/request'

export function postproject(token, member_id, name) {
  const data = {
    token,
    member_id,
    name
  }
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/project/?member_id=' + user_id + '/'

  return request({

    url: requ_url,
    method: 'post',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
