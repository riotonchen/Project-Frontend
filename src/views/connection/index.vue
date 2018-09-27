<template>
  <el-form ref="form" :label-position="labelPosition" :model="form" label-width="80px">
    <el-form-item label="信箱:">
      <el-input v-model="form.mail1" />
    </el-form-item>
    <el-form-item label="問題:">
      <el-input v-model="form.desc" type="textarea" style="width: 500px" />
    </el-form-item>
    <el-form-item label="時間:" >
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker v-model="form.date1" type="date" placeholder="選擇日期" style="width: 200px;" />
        </el-form-item>
      </el-col>
      <el-col :span="2" class="line">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="選擇時間" style="width: 200px;" />
        </el-form-item>
      </el-col>
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
  rules: {

    date1: [
      { type: 'date', required: true, message: '請選擇日期', trigger: 'change' }
    ],
    date2: [
      { type: 'date', required: true, message: '請選擇时间', trigger: 'change' }
    ]

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
