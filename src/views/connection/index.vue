<template>
  <div class="con1">
    <title>
      聯絡我們
    </title>
    <el-form ref="form" :label-position="labelPosition" :model="form" label-width="80px">
      <el-form-item label="主旨:">
        <el-input v-model="form.mail1" />
      </el-form-item>
      <el-form-item label="內容:">
        <el-input v-model="form.desc" type="textarea" style="width: 500px" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary " @click="onSubmit">送出</el-button>
      </el-form-item>
      <span class="h1">我們將在問題送出後3~5工作天內進行回覆</span>
    </el-form>
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
<style>
.con1 {
  padding-right: 2vmax;
  padding-left: 2vmax;
  padding-top: 2vmax;
  padding-button: 2vmax;
}
.el-input {
  width: 500px;
}
.h1 {
  font-size: 5px;
  font-color: #909399;
  margin-top: 500px;
  margin-bottom: 100px;
  margin-right: 50px;
  margin-left: 80px;
}
</style>
