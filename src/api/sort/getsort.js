import request from '@/utils/request'

export function getsort_pay(token, member_id) {
  const data = {
    token,
    member_id
  }
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/sort/?member_id=' + user_id + '&type=False&syncstatus_not=3'
  // var requ_url = 'https://www.177together.com/api/sort/?member_id=' + user_id + '&type=0&syncstatus_not=3'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}

export function getsort_in(token, member_id) {
  const data = {
    token,
    member_id
  }
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/sort/?member_id=' + user_id + '&type=True&syncstatus_not=3'
  //  var requ_url = 'https://www.177together.com/api/sort/?member_id=' + user_id + '&type=1&syncstatus_not=3'
  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
