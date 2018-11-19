import request from '@/utils/request'

export function postentprofile(email, password, name, manager, uni_num, mobile_num, phone_num, extension, address) {
  const data = {
    email,
    password,
    name,
    manager,
    uni_num,
    mobile_num,
    phone_num,
    extension,
    address
  }
  var requ_url = 'https://www.177together.com/api/enterprise/'

  return request({

    url: requ_url,
    method: 'post',
    data
  })
}
