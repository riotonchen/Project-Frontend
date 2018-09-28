<template>

  <el-radio-group v-model="labelPosition" size="small">
    <el-radio-button label="left">收入</el-radio-button>
    <el-radio-button label="right">支出</el-radio-button>
  </el-radio-group>

</template>
<template>
  <div class="table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="類型" width="150">
        <template slot-scope="scope">
          <el-input v-model="input" placeholder=""></el-input>

          <span style="margin-left: 10px">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="帳戶名稱" width="150">
        <template slot-scope="scope">
          <el-input v-model="input" placeholder=""></el-input>
          <span style="margin-left: 10px">{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="初始金額" width="100">
        <template slot-scope="scope">
          <el-input v-model="input" placeholder=""></el-input>
          <span style="margin-left: 10px">{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="匯率" width="80">
        <template slot-scope="scope">
          <el-input v-model="input" placeholder=""></el-input>
          <span style="margin-left: 10px">{{ scope.row.class }}</span>
        </template>
      </el-table-column>
      <el-table-column label="備忘" width="200">
        <template slot-scope="scope">
          <el-input v-model="input" placeholder=""></el-input>
          <span style="margin-left: 10px">{{ scope.row.subclass }}</span>
        </template>
      </el-table-column>
      <el-table-column label="載具隱碼" width="200">
        <template slot-scope="scope">
          <el-input v-model="input" placeholder=""></el-input>
          <span style="margin-left: 10px">{{ scope.row.subclass }}</span>
        </template>
      </el-table-column>
      <el-table-column label="">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-check" circle></el-button>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>

        </template>

      </el-table-column>

    </el-table>
  </div>

</template>

<script>
export default {
  data() {
    return {
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      tableData: [{
        account: '',
        money: '',
        class: '',
        subclass: '',
        project: '',
        invoice: '',
        remarks: ''
      }]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>
<style>
.add {
  margin-top: 500px;
  margin-bottom: 100px;
  margin-right: 50px;
  margin-left: 1000px;
}
</style>
