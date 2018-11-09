import request from '@/utils/request'

export function postentprofile(email, password) {
  const data = {
    email,
    password,
    name: null
  }
  var requ_url = 'https://www.177together.com/api/enterprise/'

  return request({

    url: requ_url,
    method: 'post',
    data
  })
}
