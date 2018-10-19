import request from '@/utils/request'

export function postproject(token, member_id, name) {
  const data = {
    token,
    member_id,
    name,
    syncstatus: 2
  }
  var requ_url = 'https://www.177together.com/api/project/'

  return request({

    url: requ_url,
    method: 'post',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
