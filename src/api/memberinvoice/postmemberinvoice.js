import request from '@/utils/request'

export function postmemberinvoice(token, number_id) {
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var member_id = decoded.user_id
  const data = {
    token,
    member_id,
    number_id,
    syncstatus: 2
  }
  var requ_url = 'https://www.177together.com/api/memberinvoice/'

  return request({

    url: requ_url,
    method: 'post',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
