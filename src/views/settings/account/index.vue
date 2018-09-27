<template>
  <el-radio-group v-model="labelPosition" size="small">
    <el-radio-button label="left">收入</el-radio-button>
    <el-radio-button label="right">支出</el-radio-button>
  </el-radio-group>

</template>
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="類型" width="150">
      <template slot-scope="scope">

        <span style="margin-left: 10px">{{ scope.row.account }}</span>
      </template>
    </el-table-column>
    <el-table-column label="帳戶名稱" width="150">
      <template slot-scope="scope">

        <span style="margin-left: 10px">{{ scope.row.account }}</span>
      </template>
    </el-table-column>
    <el-table-column label="初始金額" width="100">
      <template slot-scope="scope">

        <span style="margin-left: 10px">{{ scope.row.money }}</span>
      </template>
    </el-table-column>
    <el-table-column label="匯率" width="80">
      <template slot-scope="scope">

        <span style="margin-left: 10px">{{ scope.row.class }}</span>
      </template>
    </el-table-column>
    <el-table-column label="備忘" width="200">
      <template slot-scope="scope">

        <span style="margin-left: 10px">{{ scope.row.subclass }}</span>
      </template>
    </el-table-column>
    <el-table-column label="載具隱碼" width="200">
      <template slot-scope="scope">

        <span style="margin-left: 10px">{{ scope.row.subclass }}</span>
      </template>
    </el-table-column>
    <el-table-column label="">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">新增</el-button>
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">編輯</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
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
        account: '1',
        money: '1000',
        class: '1',
        subclass: '1-1',
        project: 'x',
        invoice: 'xx000011',
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
