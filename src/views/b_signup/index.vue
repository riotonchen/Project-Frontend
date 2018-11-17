<template>
  <div class="app-container">
    <title>
      {{ $t('route.a_signup') }}
    </title>
    <el-card class="b_signup_card">
      <el-form ref="signupForm" :model="signupForm" :rules="b_signupRules" hide-required-asterisk inline class="table_b_signup" auto-complete="on" label-position="left">

        <el-form-item>
          <span>{{ $t('b_signup.title') }}</span>
        </el-form-item>
        <el-form-item>
          <span />
        </el-form-item>

        <el-form-item :label="$t('b_signup.email')" prop="username">
          <el-input v-model="signupForm.username" :placeholder="$t('a_signup.username')" style="width:30vw" name="username" type="text" auto-complete="on" @focus="clean_name()" />
        </el-form-item>

        <el-form-item :label="$t('b_signup.password')" prop="password">
          <el-input :type="passwordType" v-model="signupForm.password" :placeholder="$t('a_signup.password')" style="width:30vw" name="password" auto-complete="on" @focus="clean_number()" />
        </el-form-item>

        <el-form-item :label="$t('b_signup.doublepswd')" prop="doublepswd">
          <el-input :type="passwordType" v-model="signupForm.doublepswd" :placeholder="$t('a_signup.doublepswd')" style="width:30vw" name="doublepswd" auto-complete="on" @focus="clean_number()" />
        </el-form-item>
      </el-form>

      <el-form-item :label="$t('b_signup.name')" prop="username">
        <el-input v-model="signupForm.buiness" :placeholder="$t('b_signup.username')" style="width:30vw" name="Buiness name" type="text" auto-complete="on" @focus="clean_name()" />
      </el-form-item>

      <el-form-item :label="$t('b_signup. princiapl')" prop="princiapl">
        <el-input v-model="signupForm.princiapl" :placeholder="$t('b_signup.princiapl')" style="width:30vw" name="princiapl" type="text" auto-complete="on" @focus="clean_name()" />
      </el-form-item>

      <el-form-item :label="$t('b_signup.taxID')" prop="taxID">
        <el-input v-model="signupForm.taxID" :placeholder="$t('b_signup.taxID')" style="width:30vw" name="taxID" type="text" auto-complete="on" @focus="clean_name()" />
      </el-form-item>

      <el-form-item :label="$t('b_signup.telephone')" prop="telephone">
        <el-input v-model="signupForm.telephone" :placeholder="$t('b_signup.taxID')" style="width:30vw" name="taxID" type="text" auto-complete="on" @focus="clean_name()" />
      </el-form-item>

      <el-form-item :label="$t('b_signup.cellphone')" prop="cellphone">
        <el-input v-model="signupForm.cellphone" :placeholder="$t('b_signup.cellphone')" style="width:30vw" name="telephone" type="text" auto-complete="on" @focus="clean_name()" />
      </el-form-item>

      <el-form-item :label="$t('b_signup.extension')" prop="extension">
        <el-input v-model="signupForm.extension" :placeholder="$t('b_signup.extension')" style="width:30vw" name="telephone" type="text" auto-complete="on" @focus="clean_name()" />

        <el-form-item :label="$t('b_signup.address')" prop="address">
          <el-input v-model="signupForm.address" :placeholder="$t('b_signup.address')" style="width:30vw" name="address" type="text" auto-complete="on" @focus="clean_name()" />
        </el-form-item>

      </el-form-item>

      <div class="b_signup_bottun">
        <el-button :loading="loadingsend" type="primary" @click.native.prevent="handleSignup">{{ $t('b_signup.signUP') }}</el-button>
      </div>

    </el-card>
  </div>

</template>
<script>

import { validateEmail } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
/*
import {
  Post_a_signup
} from '@/api/signup'
*/

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
        doublepswd: '',
        buiness: ''

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
  }

}
</script>
<style lang="scss">
</style>
