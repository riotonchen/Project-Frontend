import request from '@/utils/request'

export function getcard(token, query) {
  const data = {
    token
  }
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/card/?member_id=' + user_id + '&syncstatus_not=3'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data,
    params: query
  })
}

// for a-manage-member
export function getcardforadmin(token, member_id, id) {
  const data = {
    token
  }
  var requ_url = 'https://www.177together.com/api/card/?member_id=' + member_id + '&syncstatus_not=3'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data,
    params: {
      id
    }
  })
}
