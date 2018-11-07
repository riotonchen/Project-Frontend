import request from '@/utils/request'

export function getaccounting_all(token, purchasedate_gte, purchasedate_lte) {
  const data = {
    token
  }
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url
  if (purchasedate_gte !== '' && purchasedate_lte !== '') {
    requ_url = 'https://www.177together.com/api/accounting/?member_id=' + user_id + '&syncstatus_not=3&purchasedate_gte=' + purchasedate_gte + '&purchasedate_lte=' + purchasedate_lte
  } else {
    requ_url = 'https://www.177together.com/api/accounting/?member_id=' + user_id + '&syncstatus_not=3'
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
