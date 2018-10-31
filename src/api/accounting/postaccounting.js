import request from '@/utils/request'

export function postaccounting_niv(token, purchasedate, type, amount, comment, sort_id, subsort_id, account_id, project_id) {
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var member_id = decoded.user_id
  const data = {
    token,
    purchasedate,
    type,
    amount,
    comment,
    syncstatus: 2,
    member_id,
    sort_id,
    subsort_id,
    account_id,
    project_id,
    invoice_id: null
  }
  var requ_url = 'https://www.177together.com/api/accounting/'

  return request({

    url: requ_url,
    method: 'post',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}

export function postaccounting_yiv(token, purchasedate, type, amount, comment, sort_id, subsort_id, account_id, project_id, invoice_id) {
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var member_id = decoded.user_id
  const data = {
    token,
    purchasedate,
    type,
    amount,
    comment,
    syncstatus: 2,
    member_id,
    sort_id,
    subsort_id,
    account_id,
    project_id,
    invoice_id
  }
  var requ_url = 'https://www.177together.com/api/accounting/'

  return request({

    url: requ_url,
    method: 'post',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
