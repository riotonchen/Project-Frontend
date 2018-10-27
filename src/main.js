import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' //  CSS重製替代方案

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // 全球css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // 國際化
import './icons' // 圖標
import './errorLog' // error log
import './permission' // 權限控制
import './mock' // simulation data
import axios from 'axios'
import * as filters from './filters' // 全局過濾器
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-TW'

// axios.defaults.withCredentials = true
Vue.prototype.$axios = axios

Vue.use(ElementUI, {
  locale
})

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui默認大小
})

// 註冊全局過濾器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
