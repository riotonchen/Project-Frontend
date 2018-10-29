import request from '@/utils/request'

export function postaccount(token, name, accounttype_id) {
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var member_id = decoded.user_id
  const data = {
    token,
    member_id,
    name,
    myorder: 0,
    FX: '1:1',
    syncstatus: 2,
    accounttype_id
  }
  var requ_url = 'https://www.177together.com/api/account/'

  return request({

    url: requ_url,
    method: 'post',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
