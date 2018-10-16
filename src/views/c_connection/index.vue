<template>
  <div class="connection_container">
    <title>
      聯絡我們
    </title>
    <el-card class="box-card">
      <div class="connection_form">
        <el-form ref="form" :label-position="labelPosition" :model="form">
          <el-form-item label="主旨:">
            <el-input v-model="form.mail1" style="width:40vw" />
          </el-form-item>
          <el-form-item label="內容:">
            <el-input v-model="form.desc" type="textarea" style="width:40vw" />
          </el-form-item>
        </el-form>
        <el-button type="primary " class="sentout" @click="onSubmit">送出</el-button>
        <p class="connection_h1">我們將在問題送出後3~5工作天內進行回覆</p>
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
    onSubmit() {
      console.log('submit!')
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
