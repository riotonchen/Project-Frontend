import request from '@/utils/request'

export function getsubsort(token, sort_id) {
  const data = {
    token,
    sort_id
  }
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/subsort/?member_id=' + user_id + '&syncstatus_not=3&sort_id=' + sort_id

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}

export function getsinglesubsort(token, subsort_id) {
  const data = {
    token
  }
  var requ_url = 'https://www.177together.com/api/subsort/' + subsort_id + '/'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}

export function getsubsortforadmin(token, member_id, sort_id) {
  var requ_url = 'https://www.177together.com/api/subsort/?member_id=' + member_id + '&syncstatus_not=3'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    params: {
      sort_id
    }
  })
}
