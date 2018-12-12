import axios from 'axios'

import { Message } from 'element-ui'

import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 60000, // request timeout
  maxRedirects: 10
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      // 讓每個請求攜带token-- ['JWT-Token']為自定義key 請根據實際情況自行修改
      config.headers['JWT-Token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => response,

  error => {
    console.log('err' + error) // for debug
    // 上線時要拔掉
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 500
    })

    return Promise.reject(error)
  }
)

export default service
