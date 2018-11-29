<template>
  <div class="app-container">
    <title>{{ $t('route.b_profile_edit') }}</title>
    <div class="b_b_personal_edit_form">
      <el-card>
        <el-form
          ref="profile_edit_form"
          :model="profile_edit_form"
          :rules="profile_edit_form_rules"
          label-position="left"
          inline
          class="b_personal_edit"
        >
          <el-form-item :label="$t('b_profile_edit.email')">
            <el-input
              v-model="profile_edit_form.email"
              type="textarea"
              resize="none"
              readonly
            />
          </el-form-item>
          <el-form-item
            :label="$t('b_profile_edit.name')"
            prop="name"
          >
            <el-input
              v-model="profile_edit_form.name"
              :placeholder="$t('b_profile_edit.h1')"
              name="name"
            />
          </el-form-item>
          <el-form-item
            :label="$t('b_profile_edit.manager')"
            prop="manager"
          >
            <el-input
              v-model="profile_edit_form.manager"
              :placeholder="$t('b_profile_edit.h1')"
              name
            />
          </el-form-item>
          <el-form-item
            :label="$t('b_profile_edit.uni_num')"
            prop="uni_num"
          >
            <el-input
              v-model="profile_edit_form.uni_num"
              :placeholder="$t('b_profile_edit.h2')"
              name="toid"
            />
          </el-form-item>
          <el-form-item
            :label="$t('b_profile_edit.mobile_num')"
            prop="mobile_num"
          >
            <el-input
              v-model="profile_edit_form.mobile_num"
              :placeholder="$t('b_profile_edit.h3')"
              name="mobile_num"
            />
          </el-form-item>

          <el-form-item
            :label="$t('b_profile_edit.phone_num')"
            prop="phone_num"
          >
            <el-input
              v-model="profile_edit_form.phone_num"
              :placeholder="$t('b_profile_edit.h4')"
              name="phone_num"
            />
          </el-form-item>
          <el-form-item
            :label="$t('b_profile_edit.extension')"
            prop="extension"
          >
            <el-input
              v-model="profile_edit_form.extension"
              :placeholder="$t('b_profile_edit.h5')"
              name="extension"
            />
          </el-form-item>
          <el-form-item
            :label="$t('b_profile_edit.address')"
            prop="address"
          >
            <el-input
              v-model="profile_edit_form.address"
              :placeholder="$t('b_profile_edit.h6')"
              name="address"
            />
          </el-form-item>
          <el-button
            :loading="loadingprofile_view_send"
            type="primary"
            class="btn2"
            @click.native.prevent="handleprofile_edit"
          >{{ $t('b_profile_edit.confirm') }}</el-button>
          <el-button
            :loading="loadingprofile_view_cancal"
            type="info"
            class="btn"
            @click.native.prevent="goprofile_view"
          >{{ $t('b_profile_edit.cancel') }}</el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/login'
import { getToken } from '@/utils/auth'
/* import { validateuninum } from '@/utils/validate'*/
import { patchprofile, patchprofilepswd } from '@/api/profile/patchprofile'

export default {
  name: 'CProfileEdit',
  data() {
    const validateuninum = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value.length !== 8) {
        callback(new Error('統一編號只限定於 8 碼'))
      } else {
        callback()
      }
    }
    const validatename = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value.length > 25) {
        callback(new Error('商家名稱不可以大於 25 個字'))
      } else {
        callback()
      }
    }
    const validatemobilenum = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value.length > 20) {
        callback(new Error('行動電話不可大於20碼'))
      } else {
        callback()
      }
    }
    const validatephonenum = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value.length > 30) {
        callback(new Error('公司電話不可大於30碼'))
      } else {
        callback()
      }
    }
    const validatemanager = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value.length > 25) {
        callback(new Error('負責人名稱不可以大於 25 個字'))
      } else {
        callback()
      }
    }
    const validateextension = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value.length > 10) {
        callback(new Error('分機不可大於 10 碼'))
      } else {
        callback()
      }
    }
    const validateaddress = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value.length > 64) {
        callback(new Error('地址不可以大於64個字'))
      } else {
        callback()
      }
    }

    return {
      imageUrl: '',
      labelPosition: 'right',
      loadingprofile_view_cancal: false,
      loadingprofile_view_send: false,
      profile_edit_form: {
        email: '',
        name: '',
        manager: '',

        uni_num: '',
        mobile_num: '',

        phone_num: '',
        extension: '',
        address: '',
        toid: '',
        pswd: '',
        pswd2: ''
      },
      profile_edit_form_rules: {
        name: [{ required: false, trigger: 'change', validator: validatename }],
        uni_num: [
          { required: false, trigger: 'change', validator: validateuninum }
        ],
        mobile_num: [
          { required: false, trigger: 'change', validator: validatemobilenum }
        ],
        phone_num: [
          { required: false, trigger: 'change', validator: validatephonenum }
        ],
        manager: [
          { required: false, trigger: 'change', validator: validatemanager }
        ],
        extension: [
          { required: false, trigger: 'change', validator: validateextension }
        ],
        address: [
          { required: false, trigger: 'change', validator: validateaddress }
        ]
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getinfo()
  },
  methods: {
    getinfo() {
      getUserInfo(getToken()).then(response => {
        const info = response.data
        this.profile_edit_form.name = info.account
      })
    },
    goprofile_view() {
      this.loadingprofile_view_cancal = true
      setTimeout(() => {
        setTimeout(() => {
          this.loadingprofile_view_cancal = false
          this.$router.push({
            path: this.redirect || '/profile/ent-profile-view'
          })
        }, 300)
      }, 150)
    },
    handleprofile_edit() {
      this.$refs.profile_edit_form.validate(valid => {
        if (valid) {
          this.loadingprofile_view_send = true
          getUserInfo(getToken()).then(response => {
            var ori_name = response.name
            var ori_uni_num = response.uni_num
            var send_name = ''
            var send_uni_num = ''
            var send_phone_num = ''

            if (this.profile_edit_form.name === '') {
              send_name = ori_name
            } else {
              send_name = this.profile_edit_form.name
            }
            if (this.profile_edit_form.uni_num === '') {
              send_uni_num = ori_uni_num
            } else {
              send_uni_num = this.profile_edit_form.uni_num
            }

            if (this.profile_edit_form.name !== '') {
              send_phone_num = this.profile_edit_form.phone_num
              patchprofilepswd(getToken(), send_phone_num)
            }
            patchprofile(getToken(), send_name, send_uni_num)
              .then(() => {
                const h = this.$createElement
                this.$notify({
                  title: '送出成功',
                  message: h(
                    'b',
                    { style: 'color: teal' },
                    '你的商家資料已更新'
                  ),
                  type: 'success'
                })
                this.loadingsend = false
                this.$router.push({
                  path: this.redirect || '/profile/b_profile_view'
                })
              })
              .catch(error => {
                console.log(error.response)
                this.loadingsend = false
                if (error.response.data.uni_num !== '') {
                  const h = this.$createElement
                  this.$notify.error({
                    title: '送出失敗',
                    message: h(
                      'b',
                      { style: 'color: teal' },
                      '你的統一編號已經被使用過，請再重新輸入一次！(3秒後幫你刷空資料)'
                    )
                  })
                  console.log(this.imageUrl)

                  setTimeout(() => {
                    location.reload()
                  }, 3000)
                } else {
                  const h = this.$createElement
                  this.$notify.error({
                    title: '註冊失敗',
                    message: h(
                      'b',
                      { style: 'color: red' },
                      '發生了一點錯誤，請在試一次，如果一直發生請與我們聯繫，造成您的不良體驗，實在非常抱歉！ 5秒自動幫你跳轉'
                    ),
                    position: 'top-left',
                    showClose: false
                  })
                  setTimeout(() => {
                    location.reload()
                  }, 5000)
                }
              })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
.b_b_personal_edit_form {
  width: 80%;
  margin: 2.5vh 9vw;
}
.btn {
  float: right;
  margin-bottom: 1.875rem;
  margin-right: 1.25rem;
}
.btn2 {
  float: right;
  margin-bottom: 1.875rem;
}
.b_personal_edit {
  font-size: 0;
}
.b_personal_edit label {
  width: 90px;
  color: #99a9bf;
  font-size: 1vw;
}
.b_personal_edit input {
  font-family: "Microsoft JhengHei";
  width: 130%;
}
.b_personal_edit textarea {
  font-family: "Microsoft JhengHei";
  border: 0;
  width: 130%;
  padding-top: 0.65rem;
}
.b_personal_edit .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 100%;
}
</style>
