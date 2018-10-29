import request from '@/utils/request'

export function postsubsort(token, id, sort_id, name, type) {
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var member_id = decoded.user_id
  const data = {
    token,
    sort_id,
    member_id,
    name,
    myorder: 0,
    type,
    syncstatus: 2
  }
  var requ_url = 'https://www.177together.com/api/subsort/' + id + '/'

  return request({

    url: requ_url,
    method: 'post',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
