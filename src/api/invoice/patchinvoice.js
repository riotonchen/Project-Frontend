// not done

import request from '@/utils/request'

export function patchinvoice(token, id, number, randomNumber, renew_time) {
  const data = {
    token,
    id,
    number,
    randomNumber,
    syncstatus: 0,
    renew_time
  }
  console.log(typeof (data), data)
  var requ_url = 'https://www.177together.com/api/invoice/' + id + '/'

  return request({

    url: requ_url,
    method: 'patch',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
