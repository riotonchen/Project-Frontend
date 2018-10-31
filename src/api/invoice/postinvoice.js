import request from '@/utils/request'

export function postinvoice(token, number, randomNumber, amount) {
  const data = {
    token,
    number,
    randomNumber,
    amount,
    syncstatus: 2
  }
  var requ_url = 'https://www.177together.com/api/invoice/'

  return request({

    url: requ_url,
    method: 'post',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
