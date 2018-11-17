import request from '@/utils/request'

export function getsortbudget_all(token, year, month, type, sort_id) {
  const data = {
    token
  }
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/sortbudget/?member_id=' + user_id + '&syncstatus_not=3'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data,
    params: {
      year,
      month,
      type,
      sort_id
    }
  })
}

export function getsortbudget_pay(token) {
  const data = {
    token
  }
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/sortbudget/?member_id=' + user_id + '&syncstatus_not=3&type=0/'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}

export function getsortbudget_in(token) {
  const data = {
    token
  }
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/sortbudget/?member_id=' + user_id + '&syncstatus_not=3&type=1/'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}

export function getsortbudgetforadmin(token, member_id, year, month, type, sort_id) {
  const data = {
    token
  }
  var requ_url = 'https://www.177together.com/api/sortbudget/?member_id=' + member_id + '&syncstatus_not=3'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data,
    params: {
      year,
      month,
      type,
      sort_id
    }
  })
}
