<template>
  <div class="connection_container">
    <title>
      {{ $t('router.c_connection') }}

    </title>
    <el-card>
      <div class="connection_form">
        <el-form ref="connection_edit" :label-position="labelPosition" :rules="connection_rules" :model="connection_edit">
          <el-form-item :label="$t('c_connection.subject')" prop="subject">
            <el-input v-model="connection_edit.subject" :placeholder="$t('c_connection.h2')" style="width:40vw" name="subject" />
          </el-form-item>
          <el-form-item :label="$t('c_connection.contents')" prop="content">
            <el-input v-model="connection_edit.content" :autosize="{ minRows: 6, maxRows:1}" :placeholder="$t('c_connection.h3')" type="textarea" style="width:40vw" name="content" />

          </el-form-item>

        </el-form>
        <el-button type="primary " class="sentout" @click="open">{{ $t('c_connection.sent') }}</el-button>

      </div>
    </el-card>
  </div>

</template>
<script>
export default {
  data() {
    const valideSubjectlength = (rule, value, callback) => {
      if (value.length > 10) {
        callback(new Error('主旨最多輸入10字'))
      } else {
        callback()
      }
    }

    const valideContentlength = (rule, value, callback) => {
      if (value.length > 140) {
        callback(new Error('內容最多輸入140字'))
      } else {
        callback()
      }
    }
    return {
      form: {
        labelPosition: 'top',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''

      },

      connection_edit: {
        subject: '',
        content: ''
      },
      connection_rules: {
        subject: [{ required: false, trigger: 'change', validator: valideSubjectlength }],
        content: [{ required: false, trigger: 'change', validator: valideContentlength }]
      }
    }
  },
  methods: {
    open() {
      const h = this.$createElement

      this.$notify({
        title: '提醒',
        message: h('i', { style: 'color: teal' }, '我們將在問題送出後3~5工作天內進行回覆')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.connection_h1 {
  font-size: 1.5vw;
  margin-top: 10vh;
}
.box-card {
  width: 80%;
  height: 82vh;
  margin: 2% auto;
}
.connection_form {
  padding-top: 7vh;
  padding-left: 10vw;
}
.connection_form label {
  font-size: 1.6vw !important;
}
.sentout {
  margin-top: 4vh !important;
  margin-left: 61.5%;
}
</style>
