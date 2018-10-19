import request from '@/utils/request'

export function patchsort_update(token, sort_id, name, type) {
  const data = {
    token,
    sort_id,
    name,
    type,
    syncstatus: 0
  }
  var requ_url = 'https://www.177together.com/api/sort/' + sort_id + '/'

  return request({

    url: requ_url,
    method: 'patch',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}

export function patchsort_delete(token, sort_id, name, type) {
  const data = {
    token,
    sort_id,
    name,
    type,
    syncstatus: 3
  }
  var requ_url = 'https://www.177together.com/api/sort/' + sort_id + '/'

  return request({

    url: requ_url,
    method: 'patch',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
