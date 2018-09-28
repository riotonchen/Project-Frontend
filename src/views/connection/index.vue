<template>
  <el-form ref="form" :label-position="labelPosition" :model="form" label-width="80px">
    <el-form-item label="信箱:">
      <el-input v-model="form.mail1" />
    </el-form-item>
    <el-form-item label="問題:">
      <el-input v-model="form.desc" type="textarea" style="width: 500px" />
    </el-form-item>
    <el-form-item>
      <el-button @click="onSubmit">送出</el-button>
    </el-form-item>
  </el-form>

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
.el-input {
  width: 500px;
}
</style>
