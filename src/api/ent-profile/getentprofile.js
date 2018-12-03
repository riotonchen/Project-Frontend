import request from '@/utils/request'

export function getentprofile(token, email) {
  var requ_url = 'https://www.177together.com/api/enterprise/'

  return request({
    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    params: {
      email
    }
  })
}
