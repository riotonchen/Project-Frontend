<template>
  <div class="personal_edit_container">
    <title>
      {{ $t('route.profile_edit') }}
    </title>

    <el-card class="box-card">
      <div class="personal_edit_form">
        <el-form ref="profile_edit_form" :model="profile_edit_form" :rules="profile_edit_form_rules">
          <el-form-item label="Email：">
            <el-input v-model="profile_edit_form.account" type="text" class="useraccountin" readonly />
          </el-form-item>
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="profile_edit_form.name" placeholder="上限25個中英數字" name="name" />
          </el-form-item>
          <el-form-item label="ToID：" prop="toid">
            <el-input v-model="profile_edit_form.toid" placeholder="ToID 只限定於 8 碼" name="toid" />
          </el-form-item>
          <el-form-item label="新密碼：" prop="pswd">
            <el-input v-model="profile_edit_form.pswd" type="password" placeholder="如不修改，空白即可" name="pswd" />
          </el-form-item>
          <el-form-item label="密碼再次輸入：" prop="pswd2">
            <el-input v-model="profile_edit_form.pswd2" type="password" placeholder="如不修改，空白即可" name="pswd2" />
          </el-form-item>
          <el-form-item>
            <el-button :loading="loadingprofile_view_send" type="primary" style="width:20%;margin-top:3vh;margin-left:0px" @click.native.prevent="handleprofile_edit">
              確認
            </el-button>
            <el-button :loading="loadingprofile_view_cancal" type="info" style="width:20%;margin-top:3vh;margin-left:20px" class="personal_edit_cal" @click.native.prevent="goprofile_view">
              取消
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

  </div>
</template>
<script>
import { getUserInfo } from '@/api/login'
import { getToken } from '@/utils/auth'
import { validatetoid } from '@/utils/validate'
import { patchprofile, patchprofilepswd } from '@/api/profile/patchprofile'

export default {
  name: 'CProfileEdit',
  data() {
    const _validatetoid = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (!validatetoid(value)) {
        callback(new Error('ToID 只能有大小寫英數'))
      } else if (value.length !== 8) {
        callback(new Error('ToID 只限定於 8 碼'))
      } else {
        callback()
      }
    }
    const validatename = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value.length > 25) {
        callback(new Error('姓名不可以大於 25 個字'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value.length < 8) {
        callback(new Error('密碼不可以小於 8 碼'))
      } else {
        callback()
      }
    }
    const validatedoublepswd = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value !== this.profile_edit_form.pswd) {
        callback(new Error('二次密碼不一樣，請再次輸入！'))
      } else if (value === '' && this.profile_edit_form.pswd !== '') {
        callback(new Error('請輸入，不可空白'))
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
        account: '',
        name: '',
        toid: '',
        pswd: '',
        pswd2: ''
      },
      profile_edit_form_rules: {
        name: [{ required: false, trigger: 'blur', validator: validatename }],
        toid: [{ required: false, trigger: 'blur', validator: _validatetoid }],
        pswd: [{ required: false, trigger: 'blur', validator: validatePassword }],
        pswd2: [{ required: false, trigger: 'blur', validator: validatedoublepswd }]
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
        this.profile_edit_form.account = info.account
      })
    },
    goprofile_view() {
      this.loadingprofile_view_cancal = true
      setTimeout(() => {
        setTimeout(() => {
          this.loadingprofile_view_cancal = false
          this.$router.push({ path: this.redirect || '/profile/profile-view' })
        }, 300)
      }, 150)
    },
    handleprofile_edit() {
      this.$refs.profile_edit_form.validate(valid => {
        if (valid) {
          this.loadingprofile_view_send = true
          getUserInfo(getToken()).then(response => {
            var ori_name = response.name
            var ori_toid = response.toid
            var send_name = ''
            var send_toid = ''
            var send_pswd = ''
            if (this.profile_edit_form.name === '') {
              send_name = ori_name
            } else {
              send_name = this.profile_edit_form.name
            }
            if (this.profile_edit_form.toid === '') {
              send_toid = ori_toid
            } else {
              send_toid = this.profile_edit_form.toid
            }
            if (this.profile_edit_form.name !== '') {
              send_pswd = this.profile_edit_form.pswd
              patchprofilepswd(getToken(), send_pswd)
            }
            patchprofile(getToken(), send_name, send_toid).then(() => {
              const h = this.$createElement
              this.$notify({
                title: '送出成功',
                message: h('b', { style: 'color: teal' }, '你的個人資料已更新'),
                type: 'success'
              })
              this.loadingsend = false
              this.$router.push({ path: this.redirect || '/profile/profile-view' })
            })
              .catch((error) => {
                console.log(error.response)
                this.loadingsend = false
                if (error.response.data.toid !== '') {
                  const h = this.$createElement
                  this.$notify.error({
                    title: '送出失敗',
                    message: h('b', { style: 'color: teal' }, '你的ToID已經被使用過，請再重新輸入一次！(3秒後幫你刷空資料)')
                  })
                  console.log(this.imageUrl)
                  /*
                  setTimeout(() => {
                    location.reload()
                  }, 3000)
                  */
                } else {
                  const h = this.$createElement
                  this.$notify.error({
                    title: '註冊失敗',
                    message: h('b', { style: 'color: red' }, '發生了一點錯誤，請在試一次，如果一直發生請與我們聯繫，造成您的不良體驗，實在非常抱歉！ 5秒自動幫你跳轉'),
                    position: 'top-left',
                    showClose: false
                  })
                  setTimeout(() => {
                    location.reload()
                  }, 5000)
                }
              })
          })
        }
      })
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" >
.box-card {
  width: 85%;
  height: 82vh;
  margin: 2% auto;
  position: relative;
}
.personal_edit_form {
  margin-top: 3vh;
  width: 30vw;
  position: absolute;
}
.personal_edit_form label {
  font-size: 1vw !important;
}

.personal_edit_chk {
  padding-top: 68vh;
  position: absolute;
}
.useraccountin input {
  border: 0;
  font-family: "Microsoft JhengHei";
}
</style>
