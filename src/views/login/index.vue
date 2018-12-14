<template>
  <div class="login-container">
    <title>
      登入
    </title>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
        <lang-select class="set-language" />
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          :placeholder="$t('login.password')"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-form-item prop="membertype_id">
        <!--
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.membertype_id" :placeholder="$t('login.membertype_id')" name="membertype_id" type="text" auto-complete="on" />
        -->
        <span class="svg-container">
          <svg-icon icon-class="star" />
        </span>
        <el-select
          v-model="loginForm.membertype_id"
          placeholder="請選擇會員類別"
          style="width:88%;"
          @keyup.enter.native="handleLogin"
        >
          <el-option
            v-for="item in membertype"
            :key="item.key"
            :label="item.label"
            :value="item.key"
          />
        </el-select>
      </el-form-item>

      <el-button
        :loading="loadingsend"
        type="primary"
        style="width:100%;margin-bottom:15px;"
        @click.native.prevent="handleLogin"
      >{{ $t('login.logIn') }}</el-button>
      <el-button
        :loading="loadinghome"
        type="primary"
        style="width:100%;margin-bottom:-200px;margin-left:0px"
        @click.native.prevent="gohome"
      >{{ $t('login.bkhome') }}</el-button>
    </el-form>

  </div>
</template>

<script>
import { validateEmail } from '@/utils/validate';
import LangSelect from '@/components/LangSelect';

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
const validateMembertype = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('請選擇會員類別'))
  } else {
    callback()
  }
}

export default {
  name: 'Login',
  components: { LangSelect },

  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        membertype_id: '2'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'change', validator: isvalidateEmail }
        ],
        password: [
          { required: true, trigger: 'change', validator: validatePassword }
        ],
        membertype_id: [
          { required: true, trigger: 'change', validator: validateMembertype }
        ]
      },
      passwordType: 'password',
      loadingsend: false,
      loadinghome: false,
      showDialog: false,
      redirect: undefined,
      membertype: [
        { label: '會員', key: '2' },
        { label: '商家', key: '5' },
        { label: '管理員', key: '1' }
      ]
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

  created() {},
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loadingsend = true
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(() => {
              this.loadingsend = false
              this.$router.push({ path: this.redirect || '/' })
              setTimeout(() => {
                location.reload()
              }, 50)
            })
            .catch(() => {
              this.loadingsend = false
            })
        } else {
          console.log('error submit!!')
          return false
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
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
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

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 10vh auto;
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
}

// http://www.color-hex.com/color/1c284c
// https://iconmonstr.com/facebook-1-svg/
// http://www.color-hex.com/color-palette/185
// https://icons8.com/icon/set/facebook-f/all
$color-white: #ffffff;
$color-nepal: #8b9dc3;
$color-chambray: #3b55a0;
.v-facebook-login {
  cursor: default; // Normalize IE 11
  min-width: 15rem;
  color: $color-white;
  box-sizing: border-box;
  border: 1px solid rgba($color-white, 0.05);
  margin: 0; // Normalize Flex-box
  padding-top: 0.5rem;
  padding-left: 1.275rem;
  padding-right: 1.275rem;
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
  justify-content: center;
  background-color: lighten($color-chambray, 1%);
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  &[disabled] {
    opacity: 0.75;
  }
  &:hover {
    background-color: lighten($color-chambray, 5%);
  }
  &:focus {
    outline-width: 0;
    box-shadow: 0 0 0 1px rgba($color-nepal, 0.5);
  }
}
.token {
  margin-right: 0.2rem;
  transform: translateX(-0.5rem);
}
.loader {
  display: block;
  border-radius: 50%;
  border-style: solid;
  border-width: 0.1rem;
  border-top-color: $color-nepal;
  border-right-color: rgba($color-white, 1);
  border-left-color: rgba($color-white, 1);
  border-bottom-color: rgba($color-white, 1);
  animation: v-facebook-login-spin 2s linear infinite;
}
.loader {
  height: 1.5rem;
  margin-right: 0.5rem;
}
.token,
.loader {
  opacity: 0.9;
  width: 1.5rem;
}
@keyframes v-facebook-login-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
