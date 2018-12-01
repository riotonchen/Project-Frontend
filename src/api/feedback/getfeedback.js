import request from '@/utils/request'

export function getfeedback(token, time_gte, time_lte) {
  var requ_url = 'https://www.177together.com/api/feedback/'

  return request({
    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    params: {
      time_gte,
      time_lte
    }
  })
}
