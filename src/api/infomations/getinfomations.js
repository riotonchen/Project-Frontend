import request from '@/utils/request'
import { formatdate_inc_time } from '@/utils/index'

export function getinfomations(token) {
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var member_id = decoded.user_id
  var date = new Date()

  var requ_url =
    'https://www.177together.com/api/memberpromotion/?member_id=' +
    member_id +
    '&status=1&endtime_gte=' +
    formatdate_inc_time(date, 'yyyy-mm-dd')

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
