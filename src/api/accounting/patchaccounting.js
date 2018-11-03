import request from '@/utils/request'

export function patchaccounting(
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
  invoicenumber,
  renew_time
) {
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var member_id = decoded.user_id
  const data = {
    token,
    id,
    type,
    purchasedate,
    amount,
    comment,
    syncstatus: 0,
    member_id,
    sort_id,
    subsort_id,
    account_id,
    project_id,
    invoicenumber,
    renew_time
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
