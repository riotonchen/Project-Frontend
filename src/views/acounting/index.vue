<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="帳戶">
        <el-select v-model="form.nmae" placeholder="請選擇帳戶">
          <el-option label="現金(TWD)" value="money" />
          <el-option label="信用卡(TWD)" value="card" />
        </el-select>
      </el-form-item>
      <el-form-item label="金額">
        <el-input v-model="form.money" style="width:280px" />
      </el-form-item>
      <el-form-item label="分類">
        <el-select v-model="form.region1" placeholder="請選擇分類">
          <el-option label="分類1" value="abc1" />
          <el-option label="分類2" value="abc2" />
        </el-select>
      </el-form-item>
      <el-form-item label="子分類">
        <el-select v-model="form.region2" placeholder="請選擇子分類">
          <el-option label="子分類1" value="abcd1" />
          <el-option label="子分類2" value="abcd2" />
        </el-select>
      </el-form-item>
      <el-form-item label="專案">
        <el-select v-model="form.row" placeholder="請選擇專案">
          <el-option label="row1" value="money" />
          <el-option label="row2" value="card" />
          <el-option label="row3" value="card" />
          <el-option label="row4" value="card" />
        </el-select>
      </el-form-item>
      <el-form-item label="發票號碼">
        <el-col :span="1">
          <el-input v-model="input6" placeholder="xx" /></el-input>
        </el-col>
        <el-col :span="1.5">
          <el-tag>-</el-tag>
        </el-col>
        <el-col :span="3">
          <el-input v-model="input7 " placeholder="00000000 " /></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="備註 ">
        <el-input v-model="form.word " type="textarea" style="width:280px" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary " @click="onSubmit ">儲存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<stytle>

</stytle>
<script>
export default {
  data() {
    return {
      form: {
        name: '',
        money: '',
        region1: '',
        region2: '',
        row: '',
        number: '',
        word: ''
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
