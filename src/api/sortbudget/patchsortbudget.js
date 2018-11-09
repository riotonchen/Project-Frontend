import request from '@/utils/request'

export function patchsubsort_update(token, id, budget, year, month, renew_time) {
  const data = {
    token,
    id,
    budget,
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
    data,
    params: {
      year,
      month
    }
  })
}
