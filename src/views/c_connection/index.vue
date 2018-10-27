<template>
  <div class="connection_container">
    <title>
      {{ $t('router.c_connection') }}

    </title>
    <el-card class="box-card">
      <div class="connection_form">
        <el-form ref="form" :label-position="labelPosition" :model="form">
          <el-form-item :label="$t('c_connection.subject')">
            <el-input v-model="form.mail1" :placeholder="$t('c_connection.h3')" style="width:40vw" />
          </el-form-item>
          <el-form-item :label="$t('c_connection.contents')">
            <el-input v-model="form.desc" :autosize="{ minRows: 6, maxRows:1}" :placeholder="$t('c_connection.h2')" type="textarea" style="width:40vw" />

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

      }
    }
  },
  methods: {
    open() {
      this.$alert('我們將在問題送出後3~5工作天內進行回覆', {

        confirmButtonText: '確定'

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
