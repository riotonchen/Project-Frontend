import request from '@/utils/request'

export function loginByUsername(username, password, membertype_id) {
  const data = {
    username: username + '\;' + membertype_id,
    password,
    membertype_id
  }
  return request({
    url: 'https://www.177together.com/api-token-jwtauth',
    method: 'post',
    data
  })
}

export function getUserInfo(token) {
  var jwtDecode = require('jwt-decode')
  var decoded = jwtDecode(token)
  // console.log(decoded) // 想要看token解密後的東西
  var user_id = decoded.user_id
  var requ_url = 'https://www.177together.com/api/member/' + user_id + '/'

  return request({

    url: requ_url,
    method: 'get',
    headers: {
      Authorization: 'JWT ' + token
    }
  })
}
