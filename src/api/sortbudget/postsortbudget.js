import request from '@/utils/request'

export function postsortbudget(token, sort_id, budget, year, month) {
  const data = {
    sort_id,
    budget,
    year,
    month
  }
  var requ_url = 'https://www.177together.com/api/sortbudget/'

  return request({
    url: requ_url,
    method: 'post',
    headers: {
      Authorization: 'JWT ' + token
    },
    data
  })
}
