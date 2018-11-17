import request from '@/utils/request'

export function getaccounting_all(
  token,
  purchasedate_gte,
  purchasedate_lte,
  type,
  sort_id,
  subsort_id,
  project_id,
  account_id
) {
  const data = {
    token
  }
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url
  requ_url =
    'https://www.177together.com/api/accounting/?member_id=' +
    user_id +
    '&syncstatus_not=3'
  return request({
    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data,
    params: {
      purchasedate_gte,
      purchasedate_lte,
      type,
      sort_id,
      subsort_id,
      project_id,
      account_id
    }
  })
}

// test
export function getaccounting_single(token, id) {
  const data = {
    token
  }
  var requ_url = 'https://www.177together.com/api/accounting/' + id + '/'
  return request({
    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}

export function getaccountingforadmin(
  token,
  member_id,
  purchasedate_gte,
  purchasedate_lte,
  type,
  sort_id,
  subsort_id,
  project_id,
  account_id
) {
  var requ_url
  requ_url =
    'https://www.177together.com/api/accounting/?member_id=' +
    member_id +
    '&syncstatus_not=3'
  return request({
    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    params: {
      purchasedate_gte,
      purchasedate_lte,
      type,
      sort_id,
      subsort_id,
      project_id,
      account_id
    }
  })
}
