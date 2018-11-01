import request from '@/utils/request'

export function postfeedback(token, title, content, time) {
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var member_id = decoded.user_id
  const data = {
    token,
    member_id,
    // 暫時送39
    admin_id: 39,

    status: 0,
    syncstatus: 2,
    title,
    content,
    time
  }
  var requ_url = 'https://www.177together.com/api/feedback/'

  return request({

    url: requ_url,
    method: 'post',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
