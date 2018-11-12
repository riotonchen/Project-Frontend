<template>
  <div class="app-container">
    <title>
      {{ $t('route.c_connection') }}

    </title>
    <el-card class="connection_form">
      <el-form ref="connection_edit" :rules="connection_rules" :model="connection_edit" hide-required-asterisk label-position="left" inline>
        <el-form-item :label="$t('c_connection.subject')" prop="subject">
          <el-input v-model="connection_edit.subject" :placeholder="$t('c_connection.h2')" style="width:40vw" name="subject" />
        </el-form-item>
        <el-form-item :label="$t('c_connection.contents')" prop="content">
          <el-input v-model="connection_edit.content" :autosize="{ minRows: 15, maxRows:15}" :placeholder="$t('c_connection.h3')" resize="none" type="textarea" style="width:40vw" name="content" />

        </el-form-item>

      </el-form>
      <el-button type="primary " class="sentout" @click="send()">{{ $t('c_connection.sent') }}</el-button>

    </el-card>
  </div>

</template>
<script>

import { getToken } from '@/utils/auth'
import { formatdate } from '@/utils/index'
import { postfeedback } from '@/api/feedback/postfeedback'

export default {

  data() {
    const valideSubjectlength = (rule, value, callback) => {
      if (value.length > 10) {
        callback(new Error('主旨最多輸入10字'))
      } else if (value.length < 1) {
        callback(new Error('主旨不得為空'))
      } else {
        callback()
      }
    }

    const valideContentlength = (rule, value, callback) => {
      if (value.length > 140) {
        callback(new Error('內容最多輸入140字'))
      } else if (value.length < 1) {
        callback(new Error('內容不得為空'))
      } else {
        callback()
      }
    }
    return {
      connection_edit: {
        subject: '',
        content: ''
      },
      redirect: undefined,
      connection_rules: {
        subject: [{ required: false, trigger: 'change', validator: valideSubjectlength }],
        content: [{ required: false, trigger: 'change', validator: valideContentlength }]
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
    send() {
      this.$refs.connection_edit.validate((valid) => {
        if (valid) {
          const date = formatdate('yyyy-mm-dd HH:MM:ss.l')
          postfeedback(getToken(), this.connection_edit.subject, this.connection_edit.content, date).then(() => {
            const h = this.$createElement
            this.$notify({
              title: '提醒',
              message: h('i', { style: 'color: teal' }, '我們將在問題送出後3~5工作天內進行回覆')
            })
            setTimeout(() => {
              this.$router.push({ path: this.redirect || '/dashboard' })
            }, 800)
          }).catch((error) => {
            console.log(error)
            this.$message({
              type: 'error',
              message: '發生一點錯誤，請稍後送出一次'
            })
          })
        } else {
          console.log('error submit')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.connection_form {
  margin: 10vh 9vw;
  width: 80%;
}
.connection_form label {
  font-size: 1.2vw;
  color: #99a9bf;
  width: 90px;
}
.connection_form input {
  width: 50vw;
}
.connection_form textarea {
  width: 50vw;
  height: 80vh;
}
.sentout {
  float: right;
  //margin-top: 25vh;
  margin-bottom: 2vh;
  margin-right: 1vw;
}
</style>
