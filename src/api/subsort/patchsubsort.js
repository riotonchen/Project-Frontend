import request from '@/utils/request'

export function patchsubsort_update(token, id, name, renew_time) {
  const data = {
    token,
    id,
    name,
    syncstatus: 0,
    renew_time
  }
  var requ_url = 'https://www.177together.com/api/sort/' + id + '/'

  return request({

    url: requ_url,
    method: 'patch',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}

export function patchsubsort_delete(token, id, renew_time) {
  const data = {
    token,
    id,
    syncstatus: 3,
    renew_time
  }
  var requ_url = 'https://www.177together.com/api/sort/' + id + '/'

  return request({

    url: requ_url,
    method: 'patch',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
