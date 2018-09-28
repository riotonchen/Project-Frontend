<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="姓:">
      <el-input v-model="form.name1" />
    </el-form-item>
    <el-form-item label="名:">
      <el-input v-model="form.name2" />
    </el-form-item>
    <el-form-item label="生日:">
      <el-col :span="11">
        <el-date-picker v-model="form.date1" type="date" placeholder="選擇日期" style="width: 200px;" />
      </el-col>
    </el-form-item>
    <el-form-item label="國家:">
      <el-input v-model="form.name3" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">建立</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>

</template>
<script>
export default {
  data() {
    return {
      form: {
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
  width: 200px;
}
</style>
