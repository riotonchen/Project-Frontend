import request from '@/utils/request'

export function getsubsort(token, sort_id) {
  const data = {
    token,
    sort_id
  }
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/subsort/?member_id=' + user_id + '&syncstatus_not=3&sort_id=' + sort_id

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
