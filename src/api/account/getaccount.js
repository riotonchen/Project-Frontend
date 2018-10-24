import request from '@/utils/request'

export function getaccount(token) {
  const data = {
    token
  }
  const jwtDecode = require('jwt-decode')
  const decoded = jwtDecode(token)
  const user_id = decoded.user_id
  const requ_url = 'https://www.177together.com/api/account/?member_id=' + user_id + '&syncstatus_not=3'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
