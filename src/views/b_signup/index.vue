<template>
  <div class="signup-container">
    <title>
      {{ $t('b_signup.signup') }}
    </title>
    <transition name="el-fade-in-linear">
      <div v-show="signupform">
        <el-form
          ref="signupForm"
          :model="signupForm"
          :rules="signupRules"
          class="signup-form"
          auto-complete="on"
          label-position="left"
        >

          <div class="title-container">
            <h3 class="title">{{ $t('b_signup.account_password') }}</h3>
            <lang-select class="set-language" />
          </div>

          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              v-model="signupForm.username"
              :placeholder="$t('b_signup.username')"
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
              v-model="signupForm.password"
              :placeholder="$t('b_signup.password')"
              name="password"
              auto-complete="on"
              @keyup.enter.native="handleSignup"
            />
            <span
              class="show-pwd"
              @click="showPwd"
            >
              <svg-icon icon-class="eye" />
            </span>
          </el-form-item>

          <el-form-item prop="doublepswd">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :type="passwordType"
              v-model="signupForm.doublepswd"
              :placeholder="$t('signup.doublepswd')"
              name="doublepswd"
              auto-complete="on"
            />
            <span
              class="show-pwd"
              @click="showPwd"
            >
              <svg-icon icon-class="eye" />
            </span>
          </el-form-item>

          <el-button
            type="primary"
            style="width:100%;margin-bottom:15px;"
            @click.native.prevent="changetoinfo()"
          >{{ $t('b_signup.nextstep') }}</el-button>
          <el-button
            :loading="loadingmem"
            type="primary"
            style="width:100%;margin-left:0px"
            @click.native.prevent="gomember"
          >{{ $t('b_signup.member_signup') }}</el-button>
          <el-button
            :loading="loadinghome"
            type="primary"
            style="width:100%;margin-left:0px;margin-top:15px;"
            @click.native.prevent="gohome"
          >{{ $t('b_signup.backtohp') }}</el-button>

        </el-form>
      </div>
    </transition>
    <transition name="el-fade-in-linear">
      <div v-show="signupform_info">
        <el-form
          ref="signupForm"
          :model="signupFormInfo"
          :rules="b_signup_form_rules"
          class="signup-form"
          auto-complete="on"
          label-position="left"
        >

          <div class="title-container">
            <h3 class="title">{{ $t('b_signup.imformation') }}</h3>
            <lang-select class="set-language" />
          </div>

          <el-form-item prop="name">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              v-model="signupFormInfo.name"
              :placeholder="$t('b_signup.name')"
              name="username"
              type="text"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="manager">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              v-model="signupFormInfo.manager"
              :placeholder="$t('b_signup.manager')"
              type="text"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="uni_num">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              v-model="signupFormInfo.uni_num"
              :placeholder="$t('b_signup.uni_num')"
              type="text"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="address">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              v-model="signupFormInfo.address"
              :placeholder="$t('b_signup.address')"
              type="text"
              auto-complete="on"
            />
          </el-form-item>

          <el-button
            type="primary"
            style="width:100%;margin-bottom:15px;"
            @click.native.prevent="changetoinfoback()"
          >{{ $t('b_signup.laststep') }}</el-button>
          <el-button
            type="primary"
            style="width:100%;margin-left:0px;"
            @click.native.prevent="changetoinfo2()"
          >{{ $t('b_signup.nextstep') }}</el-button>

        </el-form>
      </div>
    </transition>
    <transition name="el-fade-in-linear">

      <div v-show="signupform_info2">

        <el-form
          ref="signupForm"
          :model="signupFormInfo2"
          :rules="b_signup_form_rules"
          class="signup-form"
          auto-complete="on"
          label-position="left"
        >

          <div class="title-container">
            <h3 class="title">{{ $t('b_signup.connect_imformation') }}</h3>
            <lang-select class="set-language" />
          </div>

          <el-form-item prop="mobile_num">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              v-model="signupFormInfo2.mobile_num"
              :placeholder="$t('b_signup.mobile_num')"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="phone_num">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              v-model="signupFormInfo2.phone_num"
              :placeholder="$t('b_signup.phone_num')"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="extension">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              v-model="signupFormInfo2.extension"
              :placeholder="$t('b_signup.extension')"
              type="text"
              auto-complete="on"
            />
          </el-form-item>

          <el-button
            type="primary"
            style="width:100%;margin-bottom:15px;"
            @click.native.prevent="changetoinfoback2()"
          >{{ $t('b_signup.laststep') }}</el-button>
          <el-button
            type="primary"
            style="width:100%;margin-left:0px;"
            @click.native.prevent="comfirminfo()"
          >{{ $t('b_signup.confirm') }}</el-button>
        </el-form>

      </div>
    </transition>
    <div class="comfirm_dialog">
      <el-dialog
        :visible.sync="comfirminfo_visiable"
        append-to-body
        title="送出前確認資料"
        class="info_view"
        width="90%"
        top="5%"
      >
        <el-row>
          <el-col
            :xs="24"
            :sm="24"
            :md="5"
            :lg="4"
            :xl="4"
          >
            <el-input
              v-model="confirm_info_email"
              type="text"
              readonly
            />
          </el-col>
          <el-col
            :xs="24"
            :sm="24"
            :md="19"
            :lg="20"
            :xl="20"
          >
            <el-input
              v-model="confirm_email"
              type="text"
              readonly
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :xs="24"
            :sm="24"
            :md="5"
            :lg="4"
            :xl="4"
          >
            <el-input
              v-model="confirm_info_pswd1"
              type="text"
              readonly
            />
          </el-col>
          <el-col
            :xs="24"
            :sm="24"
            :md="19"
            :lg="20"
            :xl="20"
          >
            <el-input
              v-model="confirm_info_pswd2"
              type="text"
              readonly
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :xs="24"
            :sm="24"
            :md="5"
            :lg="4"
            :xl="4"
          >
            <el-input
              v-model="confirm_info_name"
              type="text"
              readonly
            />
          </el-col>
          <el-col
            :xs="24"
            :sm="24"
            :md="19"
            :lg="20"
            :xl="20"
          >
            <el-input
              v-model="confirm_name"
              type="text"
              readonly
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :xs="24"
            :sm="24"
            :md="5"
            :lg="4"
            :xl="4"
          >
            <el-input
              v-model="confirm_info_manager"
              type="text"
              readonly
            />
          </el-col>
          <el-col
            :xs="24"
            :sm="24"
            :md="19"
            :lg="20"
            :xl="20"
          >
            <el-input
              v-model="confirm_manager"
              type="text"
              readonly
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :xs="24"
            :sm="24"
            :md="5"
            :lg="4"
            :xl="4"
          >
            <el-input
              v-model="confirm_info_uni_num"
              type="text"
              readonly
            />
          </el-col>
          <el-col
            :xs="24"
            :sm="24"
            :md="19"
            :lg="20"
            :xl="20"
          >
            <el-input
              v-model="confirm_uni_num"
              type="text"
              readonly
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :xs="24"
            :sm="24"
            :md="5"
            :lg="4"
            :xl="4"
          >
            <el-input
              v-model="confirm_info_address"
              type="text"
              readonly
            />
          </el-col>
          <el-col
            :xs="24"
            :sm="24"
            :md="19"
            :lg="20"
            :xl="20"
          >
            <el-input
              v-model="confirm_address"
              type="text"
              readonly
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :xs="24"
            :sm="24"
            :md="5"
            :lg="4"
            :xl="4"
          >
            <el-input
              v-model="confirm_info_mobile_num"
              type="text"
              readonly
            />
          </el-col>
          <el-col
            :xs="24"
            :sm="24"
            :md="19"
            :lg="20"
            :xl="20"
          >
            <el-input
              v-model="confirm_mobile_num"
              type="text"
              readonly
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :xs="24"
            :sm="24"
            :md="5"
            :lg="4"
            :xl="4"
          >
            <el-input
              v-model="confirm_info_phone_num"
              type="text"
              readonly
            />
          </el-col>
          <el-col
            :xs="24"
            :sm="24"
            :md="19"
            :lg="20"
            :xl="20"
          >
            <el-input
              v-model="confirm_phone_num"
              type="text"
              readonly
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :xs="24"
            :sm="24"
            :md="5"
            :lg="4"
            :xl="4"
          >
            <el-input
              v-model="confirm_info_extension"
              type="text"
              readonly
            />
          </el-col>
          <el-col
            :xs="24"
            :sm="24"
            :md="19"
            :lg="20"
            :xl="20"
          >
            <el-input
              v-model="confirm_extension"
              type="text"
              readonly
            />
          </el-col>
        </el-row>
        <div slot="footer">
          <el-button
            type="info"
            plain
            @click.native.prevent="sendcal()"
          >{{ $t('b_signup.cancel') }}</el-button>
          <el-button
            :loading="loadingsend"
            type="primary"
            plain
            @click.native.prevent="sendout()"
          > {{ $t('b_signup.send') }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { validateEmail } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import { Postsignup } from '@/api/signup'
import { postentprofile } from '@/api/ent-profile/postentprofile'

export default {
  name: 'BSignup',
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

    const validateuninum = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('統一編號不得為空'))
      } else if (value.length !== 8) {
        callback(new Error('統一編號只限定於 8 碼'))
      } else {
        callback()
      }
    }
    const validatename = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('公司名稱不得為空'))
      } else if (value.length > 25) {
        callback(new Error('公司名稱不可以大於 25 個字'))
      } else {
        callback()
      }
    }
    const validatemobilenum = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手機號碼不得為空'))
      } else if (value.length > 20) {
        callback(new Error('手機號碼不可大於20碼'))
      } else {
        callback()
      }
    }
    const validatephonenum = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('電話號碼不得為空'))
      } else if (value.length > 30) {
        callback(new Error('電話號碼不可大於30碼'))
      } else {
        callback()
      }
    }
    const validatemanager = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('負責人名稱不得為空'))
      } else if (value.length > 25) {
        callback(new Error('負責人名稱不可以大於 25 個字'))
      } else {
        callback()
      }
    }
    const validateextension = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('分機不得為空'))
      } else if (value.length > 10) {
        callback(new Error('分機不可大於 10 碼'))
      } else {
        callback()
      }
    }
    const validateaddress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('地址不得為空'))
      } else if (value.length > 64) {
        callback(new Error('地址不可以大於64個字'))
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
      signupFormInfo: {
        name: '',
        manager: '',
        uni_num: '',
        address: ''
      },
      signupFormInfo2: {
        mobile_num: '',
        phone_num: '',
        extension: ''
      },
      confirm_info_email: '帳號',
      confirm_info_pswd1: '密碼',
      confirm_info_pswd2: '為了安全，在此不做顯示確認',
      confirm_info_name: '公司名稱',
      confirm_info_manager: '負責人名稱',
      confirm_info_uni_num: '統一編號',
      confirm_info_address: '地址',
      confirm_info_mobile_num: '手機號碼',
      confirm_info_phone_num: '電話號碼',
      confirm_info_extension: '分機號碼',
      confirm_email: '',
      confirm_name: '',
      confirm_manager: '',
      confirm_uni_num: '',
      confirm_address: '',
      confirm_mobile_num: '',
      confirm_phone_num: '',
      confirm_extension: '',
      signupRules: {
        username: [
          { required: true, trigger: 'change', validator: isvalidateEmail }
        ],
        password: [
          { required: true, trigger: 'change', validator: validatePassword }
        ],
        doublepswd: [
          { required: true, trigger: 'change', validator: validatedoublepswd }
        ]
      },
      passwordType: 'password',
      redirect: undefined,
      loadingsend: false,
      loadingmem: false,
      loadinghome: false,
      signupform: true,
      signupform_info: false,
      signupform_info2: false,
      comfirminfo_visiable: false,

      b_signup_form_rules: {
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
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    changetoinfo() {
      this.signupform = false
      this.signupform_info = true
    },
    changetoinfo2() {
      this.signupform_info = false
      this.signupform_info2 = true
    },
    changetoinfoback() {
      this.signupform = true
      this.signupform_info = false
    },
    changetoinfoback2() {
      this.signupform_info = true
      this.signupform_info2 = false
    },
    comfirminfo() {
      this.comfirminfo_visiable = true
      this.confirm_email = this.signupForm.username
      this.confirm_name = this.signupFormInfo.name
      this.confirm_manager = this.signupFormInfo.manager
      this.confirm_uni_num = this.signupFormInfo.uni_num
      this.confirm_address = this.signupFormInfo.address
      this.confirm_mobile_num = this.signupFormInfo2.mobile_num
      this.confirm_phone_num = this.signupFormInfo2.phone_num
      this.confirm_extension = this.signupFormInfo2.extension
    },
    sendcal() {
      this.comfirminfo_visiable = false
    },
    sendout() {
      this.$refs.signupForm.validate(valid => {
        if (valid) {
          this.loadingsend = true
          Postsignup(this.signupForm.username, this.signupForm.password, 5)
            .then(() => {
              postentprofile(
                this.signupForm.username,
                this.signupForm.password,
                this.signupFormInfo.name,
                this.signupFormInfo.manager,
                this.signupFormInfo.uni_num,
                this.signupFormInfo2.mobile_num,
                this.signupFormInfo2.phone_num,
                this.signupFormInfo2.extension,
                this.signupFormInfo.address
              ).then(() => {
                const h = this.$createElement
                this.$notify({
                  title: '註冊成功',
                  message: h(
                    'b',
                    { style: 'color: teal' },
                    '恭喜你註冊成功，好好享受我們的服務吧！'
                  ),
                  position: 'top-left'
                })
                this.loadingsend = false
                this.$router.push({ path: this.redirect || '/home' })
              })
            })
            .catch(error => {
              console.log(error.response.data)
              if (error.response.data.error_msg === '帳號已存在！') {
                const h = this.$createElement
                this.$notify.error({
                  title: '註冊失敗',
                  message: h(
                    'b',
                    { style: 'color: red' },
                    '你輸入的電子信箱已經註冊過，請確認後再次註冊！ 5秒自動幫你重新刷新頁面'
                  ),
                  position: 'top-left',
                  showClose: false
                })
                setTimeout(() => {
                  location.reload()
                  this.$router.push({ path: this.redirect || '/ent_signup' })
                }, 5000)
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    gomember() {
      this.loadingmem = true
      setTimeout(() => {
        setTimeout(() => {
          this.loadingmem = false
          this.$router.push({ path: this.redirect || '/member_signup' })
        }, 300)
      }, 300)
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

.info_view input {
  border: 0;
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
