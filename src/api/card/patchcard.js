// not done

import request from '@/utils/request'

export function patchcard(token, card_id, name, number, renew_time) {
  const data = {
    token,
    card_id,
    name,
    number,
    syncstatus: 0,
    renew_time
  }
  var requ_url = 'https://www.177together.com/api/card/' + card_id + '/'

  return request({

    url: requ_url,
    method: 'patch',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
