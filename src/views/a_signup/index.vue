<template>
  <div class="app-container">
    <title>
      {{ $t('route.a_signup') }}
    </title>
    <el-card class="a_signup_card">
      <el-form ref="signupForm" :model="signupForm" :rules="signupRules" hide-required-asterisk inline class="table_a_signup" auto-complete="on" label-position="left">

        <el-form-item>
          <span>{{ $t('a_signup.title') }}</span>
        </el-form-item>
        <el-form-item>
          <span />
        </el-form-item>

        <el-form-item :label="$t('a_signup.email')" prop="username">
          <el-input v-model="signupForm.username" :placeholder="$t('a_signup.username')" style="width:30vw" name="username" type="text" auto-complete="on" @focus="clean_name()" />
        </el-form-item>

        <el-form-item :label="$t('a_signup.password')" prop="password">
          <el-input :type="passwordType" v-model="signupForm.password" :placeholder="$t('a_signup.password')" style="width:30vw" name="password" auto-complete="on" @focus="clean_number()" />
        </el-form-item>

        <el-form-item :label="$t('a_signup.doublepswd')" prop="doublepswd">
          <el-input :type="passwordType" v-model="signupForm.doublepswd" :placeholder="$t('a_signup.doublepswd')" style="width:30vw" name="doublepswd" auto-complete="on" @focus="clean_number()" />
        </el-form-item>
      </el-form>

      <div class="a_signup_bottun">
        <el-button :loading="loadingsend" type="primary" @click.native.prevent="handleSignup">{{ $t('a_signup.signUP') }}</el-button>
      </div>

    </el-card>
  </div>
</template>

<script>
import { validateEmail } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import {
  Post_a_signup
} from '@/api/signup'

export default {
  name: 'Signup',
  components: { LangSelect },
  data() {
    const isvalidateEmail = (rule, value, callback) => {
      if (!validateEmail(value)) {
        callback(new Error('請輸入正確的 E-mail'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('密碼不可以小於 8 碼'))
      } else {
        callback()
      }
    }
    const validatedoublepswd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請輸入，不可空白'))
      } else if (value !== this.signupForm.password) {
        callback(new Error('二次密碼不一樣，請再次輸入！'))
      } else {
        callback()
      }
    }

    return {
      signupForm: {
        username: '',
        password: '',
        doublepswd: ''
      },
      signupRules: {
        username: [{ required: true, trigger: 'change', validator: isvalidateEmail }],
        password: [{ required: true, trigger: 'change', validator: validatePassword }],
        doublepswd: [{ required: true, trigger: 'change', validator: validatedoublepswd }]
      },
      passwordType: 'password',
      loadingsend: false,
      showDialog: false,
      redirect: undefined
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
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleSignup() {
      this.$refs.signupForm.validate(valid => {
        if (valid) {
          this.loadingsend = true
          Post_a_signup(this.signupForm.username, this.signupForm.password)
            .then(() => {
              const h = this.$createElement
              this.$notify({
                title: '註冊成功',
                message: h('b', { style: 'color: teal' }, '已新增一名管理員，請協助並告知管理員職責'),
                position: 'top-left'
              })
              this.loadingsend = false
              this.$router.push({ path: this.redirect || '/dashboard' })
            })
            .catch((error) => {
              console.log(error.response.data)
              if (error.response.data.error_msg === '帳號已存在！') {
                const h = this.$createElement
                this.$notify.error({
                  title: '註冊失敗',
                  message: h('b', { style: 'color: red' }, '你輸入的電子信箱已經註冊過，請確認後再次註冊！ 5秒自動幫你重新刷新頁面'),
                  position: 'top-left',
                  showClose: false
                })
                setTimeout(() => {
                  location.reload()
                }, 5000)
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
        }
      })
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" >
.table_a_signup {
  font-size: 0;
}
.table_a_signup label {
  width: 70vw;
  color: #99a9bf;
  font-size: 1.5vw;
}
.table_a_signup span {
  width: 100px;
  color: #000000;
  font-size: 2vw;
}
.table_a_signup .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 100%;
}
.a_signup_card {
  width: 60%;
  margin: 10vh 19vw;
}
.a_signup_bottun {
  float: right;
  margin-bottom: 3vh;
}
</style>

