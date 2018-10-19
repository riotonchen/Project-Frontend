import request from '@/utils/request'

export function postcard(token, member_id, name, number) {
  const data = {
    token,
    member_id,
    name,
    number
  }
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/card/?member_id=' + user_id + '/'

  return request({

    url: requ_url,
    method: 'post',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
