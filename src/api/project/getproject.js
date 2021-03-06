import request from '@/utils/request'

export function getproject(token) {
  const data = {
    token
  }
  const jwtDecode = require('jwt-decode')
  const decoded = jwtDecode(token)
  const user_id = decoded.user_id
  const requ_url = 'https://www.177together.com/api/project/?member_id=' + user_id + '&syncstatus_not=3'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}

export function getproject_single(token, id) {
  const data = {
    token
  }
  const requ_url = 'https://www.177together.com/api/project/' + id + '/'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}

export function getprojectforadmin(token, member_id, id) {
  const requ_url = 'https://www.177together.com/api/project/?member_id=' + member_id + '&syncstatus_not=3'

  return request({
    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    },
    params: {
      id
    }
  })
}
