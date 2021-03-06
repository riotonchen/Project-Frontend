import request from '@/utils/request'

export function patchcard_modify(token, id, name, number, renew_time) {
  const data = {
    token,
    id,
    name,
    number,
    syncstatus: 0,
    renew_time
  }
  console.log(typeof (data), data)
  var requ_url = 'https://www.177together.com/api/card/' + id + '/'

  return request({

    url: requ_url,
    method: 'patch',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
export function patchcard_del(token, id, renew_time) {
  const data = {
    token,
    id,
    syncstatus: 3,
    renew_time
  }
  var requ_url = 'https://www.177together.com/api/card/' + id + '/'

  return request({

    url: requ_url,
    method: 'patch',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
