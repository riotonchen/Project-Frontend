import request from '@/utils/request'

export function getmember(token) {
  var requ_url = 'https://www.177together.com/api/member/'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    }
  })
}

export function getmemberlist(token, id) {
  var requ_url = 'https://www.177together.com/api/member/' + id + '/'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    }
  })
}
