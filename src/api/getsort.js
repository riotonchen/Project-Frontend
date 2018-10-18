import request from '@/utils/request'

export function getsortpay(token, member_id, type) {
  const data = {
    token,
    member_id,
    type
  }
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/sort/?member_id=' + user_id + '&type=0/'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}

export function getsortin(token, member_id, type) {
  const data = {
    token,
    member_id,
    type
  }
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/sort/?member_id=' + user_id + '&type=1/'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
