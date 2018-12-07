import request from '@/utils/request'

export function postinformations(
  token,
  store_id,
  name,
  content,
  starttime,
  endtime,
  photo,
  id
) {
  const data = {
    store_id,
    name,
    content,
    status: 0,
    starttime,
    endtime,
    syncstatus: 2,
    photo
  }
  var requ_url = 'https://www.177together.com/api/promotion/'

  return request({
    url: requ_url,
    method: 'post',
    headers: {
      Authorization: 'JWT ' + token
    },
    data,
    params: {
      id
    }
  })
}
