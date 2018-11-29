import request from '@/utils/request'

export function patchfeedback(token, id, reply) {
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var admin_id = decoded.user_id
  const data = {
    id,
    reply,
    admin_id,
    status: 1
    // renew_time
  }
  var requ_url = 'https://www.177together.com/api/feedback/' + id + '/'

  return request({

    url: requ_url,
    method: 'patch',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
