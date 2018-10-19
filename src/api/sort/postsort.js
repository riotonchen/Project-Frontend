import request from '@/utils/request'

export function postsort(token, member_id, name, type) {
  const data = {
    token,
    member_id,
    name,
    type,
    syncstatus: 2
  }
  var requ_url = 'https://www.177together.com/api/sort/'

  return request({

    url: requ_url,
    method: 'post',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
