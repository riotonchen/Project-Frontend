import request from '@/utils/request'

export function patchaccounting_confi(
  token,
  id,
  purchasedate,
  amount,
  comment,
  type,
  sort_id,
  subsort_id,
  account_id,
  project_id,
  invoice_id,
  renew_time,
) {
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var member_id = decoded.user_id
  const data = {
    token,
    id,
    purchasedate,
    amount,
    comment,
    type,
    sort_id,
    subsort_id,
    account_id,
    member_id,
    project_id,
    invoice_id,
    renew_time,
    syncstatus: 0
  }
  var requ_url = 'https://www.177together.com/api/accounting/' + id + '/'

  return request({
    url: requ_url,
    method: 'patch',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}

export function patchaccounting_del(
  token,
  id,
  purchasedate,
  amount,
  comment,
  type,
  sort_id,
  subsort_id,
  account_id,
  project_id,
  invoice_id,
  renew_time,
) {
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var member_id = decoded.user_id
  const data = {
    token,
    id,
    purchasedate,
    amount,
    comment,
    type,
    sort_id,
    subsort_id,
    account_id,
    member_id,
    project_id,
    invoice_id,
    renew_time,
    syncstatus: 3
  }
  var requ_url = 'https://www.177together.com/api/accounting/' + id + '/'

  return request({
    url: requ_url,
    method: 'patch',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
