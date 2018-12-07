import request from '@/utils/request'

export function getinfomations(token) {
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var member_id = decoded.user_id
  var requ_url =
    'https://www.177together.com/api/memberpromotion/?member_id=' + member_id

  return request({
    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    }
  })
}

export function getentinfomations(token, store_id) {
  var requ_url = 'https://www.177together.com/api/promotion/'

  return request({
    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    params: {
      store_id
    }
  })
}
