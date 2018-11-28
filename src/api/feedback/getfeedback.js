import request from '@/utils/request'

export function getfeedback(token) {
  var requ_url = 'https://www.177together.com/api/feedback/?status=0'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    }
  })
}
