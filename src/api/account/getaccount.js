import request from '@/utils/request'

export function getaccount_all(token, type_id) {
  const data = {
    token
  }
  const jwtDecode = require('jwt-decode')
  const decoded = jwtDecode(token)
  const user_id = decoded.user_id
  var requ_url = ''
  if (type_id === null || type_id === undefined) {
    requ_url = 'https://www.177together.com/api/account/?member_id=' + user_id + '&syncstatus_not=3'
  } else {
    requ_url = 'https://www.177together.com/api/account/?member_id=' + user_id + '&syncstatus_not=3&accounttype_id=' + type_id
  }
  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
export function getaccountforadmin(token, member_id, accounttype_id, id) {
  var requ_url = 'https://www.177together.com/api/account/?member_id=' + member_id + '&syncstatus_not=3'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    params: {
      accounttype_id,
      id
    }
  })
}
export function getaccountsingledata(token, account_id) {
  const data = {
    token
  }
  var requ_url = 'https://www.177together.com/api/account/' + account_id + '/'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}

export function getaccounttype(token) {
  const data = {
    token
  }
  const jwtDecode = require('jwt-decode')
  const decoded = jwtDecode(token)
  const user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/accounttype/?member_id=' + user_id + '&syncstatus_not=3'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
