import {
  loginByUsername,
  logout,
  getUserInfo
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

const user = {
  /*
    state: {
      user: '',
      status: '',
      code: '',
      token: getToken(),
      name: '',
      avatar: '',
      introduction: '',
      roles: [],
      setting: {
        articlePlatform: []
      }
    },

    mutations: {
      SET_CODE: (state, code) => {
        state.code = code
      },
      SET_TOKEN: (state, token) => {
        state.token = token
      },
      SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
      },
      SET_SETTING: (state, setting) => {
        state.setting = setting
      },
      SET_STATUS: (state, status) => {
        state.status = status
      },
      SET_NAME: (state, name) => {
        state.name = name
      },
      SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
      },
      SET_ROLES: (state, roles) => {
        state.roles = roles
      }
    },
    */

  state: {
    user_id: '',
    toid: '',
    account: '',
    identifier: '',
    token: getToken(),
    membertype: '',
    name: '',
    password: '',
    localpicture: '',
    dbpicture: '',
    renew_time: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },
  mutations: {
    SET_user_id: (state, user_id) => {
      state.user_id = user_id
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_toid: (state, toid) => {
      state.toid = toid
    },
    SET_account: (state, account) => {
      state.account = account
    },
    SET_identifier: (state, identifier) => {
      state.identifier = identifier
    },
    SET_membertype: (state, membertype) => {
      state.membertype = membertype
    },
    SET_name: (state, name) => {
      state.name = name
    },
    SET_password: (state, password) => {
      state.password = password
    },
    SET_localpicture: (state, localpicture) => {
      state.localpicture = localpicture
    },
    SET_dbpicture: (state, dbpicture) => {
      state.dbpicture = dbpicture
    },
    SET_renew_time: (state, renew_time) => {
      state.renew_time = renew_time
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登錄
    LoginByUsername({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()
      const membertype_id = userInfo.membertype_id.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password, membertype_id).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          setToken(response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 獲取用户信息
    GetUserInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) { // 由於mockjs 不支持自定義狀態碼只能這樣hack
            reject('error')
          }
          const data = response.data

          if (data.roles && data.roles.length > 0) { // 驗證返回的roles是否是一個非空數组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }

          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
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

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 動態修改權限
    ChangeRoles({
      commit,
      dispatch
    }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 動態修改權限後 重繪側邊菜單
          resolve()
        })
      })
    }
  }
}

export default user
