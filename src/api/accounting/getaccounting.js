import request from '@/utils/request'

export function getaccounting_all(token) {
  const data = {
    token
  }
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/accounting/?member_id=' + user_id + '&syncstatus_not=3'
  // var requ_url = 'https://www.177together.com/api/accounting/?member_id=' + user_id
  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
