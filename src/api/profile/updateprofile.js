import request from '@/utils/request'

export function patchuserinfo(token, toid, password, localpicture, dbpicture) {
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/member/' + user_id + '/'
  var data = {
    toid,
    password,
    localpicture,
    dbpicture
  }

  return request({

    url: requ_url,
    method: 'patch',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
