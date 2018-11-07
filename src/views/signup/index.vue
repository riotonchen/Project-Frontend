<template>
  <div class="signup-container">
    <title>
      註冊
    </title>
    <el-form ref="signupForm" :model="signupForm" :rules="signupRules" class="signup-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">{{ $t('signup.title') }}</h3>
        <lang-select class="set-language" />
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="signupForm.username" :placeholder="$t('signup.username')" name="username" type="text" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :type="passwordType" v-model="signupForm.password" :placeholder="$t('signup.password')" name="password" auto-complete="on" @keyup.enter.native="handleSignup" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-form-item prop="doublepswd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :type="passwordType" v-model="signupForm.doublepswd" :placeholder="$t('signup.doublepswd')" name="doublepswd" auto-complete="on" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-form-item prop="membertype_id">
        <span class="svg-container">
          <svg-icon icon-class="star" />
        </span>
        <el-select v-model="signupForm.membertype_id" clearable placeholder="請選擇會員類別" style="width:88%;">
          <el-option v-for="item in membertype" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
      </el-form-item>

      <el-button :loading="loadingsend" type="primary" style="width:100%;margin-bottom:15px;" @click.native.prevent="handleSignup">{{ $t('signup.signUP') }}</el-button>
      <el-button :loading="loadinghome" type="primary" style="width:100%;margin-left:0px" @click.native.prevent="gohome">回首頁</el-button>

    </el-form>
  </div>
</template>

<script>
import { validateEmail } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import {
  Postsignup
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
    const validateMembertype = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請選擇會員類別'))
      } else {
        callback()
      }
    }

    return {
      signupForm: {
        username: '',
        password: '',
        doublepswd: '',
        membertype_id: '2'
      },
      signupRules: {
        username: [{ required: true, trigger: 'change', validator: isvalidateEmail }],
        password: [{ required: true, trigger: 'change', validator: validatePassword }],
        doublepswd: [{ required: true, trigger: 'change', validator: validatedoublepswd }],
        membertype_id: [{ required: true, trigger: 'change', validator: validateMembertype }]
      },
      passwordType: 'password',
      loadingsend: false,
      loadinghome: false,
      showDialog: false,
      redirect: undefined,
      membertype: [{ label: '會員', key: '2' }, { label: '商家', key: '5' }]
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
          Postsignup(this.signupForm.username, this.signupForm.password, this.signupForm.membertype_id)
            .then(() => {
              // send ent-profile
              // https://www.177together.com/api/enterprise/
              /*
              if (this.signupForm.membertype_id === 5) {
                // send ent-profile code
                // 147 change to ent
                Postsignup(this.signupForm.username, this.signupForm.password, this.signupForm.membertype_id)
                  .then(() => {
                    const h = this.$createElement
                    this.$notify({
                      title: '註冊成功',
                      message: h('b', { style: 'color: teal' }, '恭喜你註冊成功，好好享受我們的服務吧！'),
                      position: 'top-left'
                    })
                    this.loadingsend = false
                    this.$router.push({ path: this.redirect || '/home' })
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
              */

              const h = this.$createElement
              this.$notify({
                title: '註冊成功',
                message: h('b', { style: 'color: teal' }, '恭喜你註冊成功，好好享受我們的服務吧！'),
                position: 'top-left'
              })
              this.loadingsend = false
              this.$router.push({ path: this.redirect || '/home' })
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
    },
    gohome() {
      this.loadinghome = true
      setTimeout(() => {
        setTimeout(() => {
          this.loadinghome = false
          this.$router.push({ path: this.redirect || '/home' })
        }, 300)
      }, 300)
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
/* 修復input 背景不協調 和光標變色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .signup-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.signup-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-select {
    display: inline-block;
    height: 47px;
    width: 25rem;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.signup-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .signup-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 7vh auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
