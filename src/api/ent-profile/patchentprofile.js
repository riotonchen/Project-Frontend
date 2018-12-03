import request from '@/utils/request'

export function patchentprofile(
  token,
  id,
  name,
  manager,
  uni_num,
  mobile_num,
  phone_num,
  extension,
  address
) {
  const data = {
    name,
    manager,
    uni_num,
    mobile_num,
    phone_num,
    extension,
    address
  }
  var requ_url = 'https://www.177together.com/api/enterprise/' + id + '/'

  return request({
    url: requ_url,
    method: 'patch',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
