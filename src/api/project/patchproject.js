import request from '@/utils/request'

export function patchproject_update(token, member_id, name, syncstatus) {
  const data = {
    token,
    member_id,
    name,
    syncstatus
  }
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/project/' + user_id + '/'

  return request({

    url: requ_url,
    method: 'patch',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}

export function patchproject_delete(token, member_id, name, syncstatus) {
  const data = {
    token,
    member_id,
    name,
    syncstatus
  }
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/project/' + user_id + '/'

  return request({

    url: requ_url,
    method: 'patch',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
