import request from '@/utils/request'

export function patchinvoice(token, id, number, randomNumber, amount, renew_time) {
  const data = {
    token,
    id,
    number,
    randomNumber,
    amount,
    syncstatus: 0,
    renew_time
  }
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
