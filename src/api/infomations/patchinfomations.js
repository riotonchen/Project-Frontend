import request from '@/utils/request'

export function patchinfomations(token, id) {
  const data = {
    status: 1
  }
  var requ_url = 'https://www.177together.com/api/promotion/' + id + '/'

  return request({
    url: requ_url,
    method: 'patch',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
