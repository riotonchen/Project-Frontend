import request from '@/utils/request'

export function postinformations(token, formData) {
  var requ_url = 'https://www.177together.com/api/promotion/'
  const data = {
    formData
  }

  return request({
    url: requ_url,
    method: 'post',
    headers: {
      Authorization: 'JWT ' + token,
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
