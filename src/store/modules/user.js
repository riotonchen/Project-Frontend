import { loginByUsername, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { MessageBox } from 'element-ui'

const user = {
  state: {
    id: '',
    toid: '',
    status: '',
    account: '',
    identifier: '',
    membertype: [],
    name: '',
    localpicture: '',
    dbpicture: '',
    renew_time: '',
    token: getToken()
  },
  mutations: {
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    /* use membertype as roles*/
    SET_ROLES: (state, membertype) => {
      state.membertype = membertype
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_TOID: (state, toid) => {
      state.toid = toid
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account
    },
    SET_IDENTIFIER: (state, identifier) => {
      state.identifier = identifier
    },
    SET_MEMBERTYPE: (state, membertype) => {
      state.membertype = membertype
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_LOCALPICTURE: (state, localpicture) => {
      state.localpicture = localpicture
    },
    SET_DBPICTURE: (state, dbpicture) => {
      state.dbpicture = dbpicture
    },
    SET_RENEW_TIME: (state, renew_time) => {
      state.renew_time = renew_time
    },
    SET_STATUS: (state, status) => {
      state.status = status
    }
  },

  actions: {
    // 信箱登錄
    LoginByUsername({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(
          userInfo.username,
          userInfo.password,
          userInfo.membertype_id
        )
          .then(response => {
            const data = response.data
            commit('SET_TOKEN', data.token)
            setToken(response.data.token)
            resolve()
          })
          .catch(error => {
            if (error === 'Account does not exists or parameter error.') {
              reject(error)
              MessageBox.confirm(
                '你的帳號，密碼，或著是會員類別輸入錯誤。',
                '登入錯誤',
                {
                  confirmButtonText: '重新登入',
                  showCancelButton: false,
                  type: 'error',
                  beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                      instance.confirmButtonLoading = true
                      instance.confirmButtonText = '跳轉中'
                      setTimeout(() => {
                        done()
                        setTimeout(() => {
                          instance.confirmButtonLoading = false
                        }, 500)
                      }, 800)
                    } else {
                      done()
                    }
                  }
                }
              ).then(() => {
                location.reload()
              })
            } else {
              reject(error)
              this.$notify.error({
                title: 'ERROR',
                message:
                  '發生了一點錯誤請稍後再試試看，造成您的不便感到十分抱歉。'
              })
              setTimeout(() => {
                setTimeout(() => {
                  location.reload()
                }, 1500)
              }, 800)
            }
          })
      })
    },

    // 獲取用戶訊息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then(response => {
            if (!response.data) {
              reject('error')
            }
            const data = response.data
            if (data.membertype && data.membertype > 0 && data.membertype < 6) {
              // 驗證返回的membertype是否合法
              commit('SET_ROLES', data.membertype)
            } else {
              reject('資訊: 會員資訊取得錯誤')
            }
            const tostrmembertype = []
            tostrmembertype.push(data.membertype.toString())
            commit('SET_ID', data.id)
            commit('SET_TOID', data.toid)
            commit('SET_ACCOUNT', data.account)
            commit('SET_IDENTIFIER', data.identifier)
            commit('SET_MEMBERTYPE', tostrmembertype)
            commit('SET_NAME', data.name)
            commit('SET_LOCALPICTURE', data.localpicture)
            if (data.dbpicture === null || data.dbpicture === '') {
              commit(
                'SET_DBPICTURE',
                'https://cdn.dribbble.com/users/662463/screenshots/2944637/ostrich_rider_moncho_masse.gif'
              )
            } else {
              commit('SET_DBPICTURE', data.dbpicture)
            }
            commit('SET_RENEW_TIME', data.renew_time)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 第三方驗證登錄
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}
export default user
