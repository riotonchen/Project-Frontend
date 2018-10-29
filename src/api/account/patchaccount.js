import request from '@/utils/request'

export function patchaccount_modify(token, id, name, balance, renew_time) {
  const data = {
    token,
    id,
    name,
    balance,
    syncstatus: 0,
    renew_time
  }
  console.log(typeof (data), data)
  var requ_url = 'https://www.177together.com/api/account/' + id + '/'

  return request({

    url: requ_url,
    method: 'patch',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
export function patchaccount_del(token, id, renew_time) {
  const data = {
    token,
    id,
    syncstatus: 3,
    renew_time
  }
  var requ_url = 'https://www.177together.com/api/account/' + id + '/'

  return request({

    url: requ_url,
    method: 'patch',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
