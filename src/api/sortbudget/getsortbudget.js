import request from '@/utils/request'

export function getsortbudget_pay(token, member_id) {
  const data = {
    token,
    member_id
  }
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/sortbudget/?member_id=' + user_id + '&type=0/'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}

export function getsortbudget_in(token, member_id) {
  const data = {
    token,
    member_id
  }
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/sortbudget/?member_id=' + user_id + '&type=1/'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
