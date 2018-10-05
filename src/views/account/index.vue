<template>
  <div class="acu1">
    <title>
      帳戶管理
    </title>
    <div>
      <el-row>
        <el-col :span="8">
          <el-radio-group v-model="labelPosition" size="small">
            <el-radio-button label="left">收入</el-radio-button>
            <el-radio-button label="right">支出</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="12">
          日期:
          <el-date-picker v-model="value6" type="daterange" range-separator="-" start-placeholder="開始日期" end-placeholder="结束日期" />
        </el-col>
      </el-row>
    </div>

    <div class="table">
      <el-table :data="tableData" style="width: 100%" height="400">
        <el-table-column label="類型" width="120" fixed>
          <template slot-scope="scope">
            <el-input v-model="input" placeholder="請輸入類型" />

            <span style="margin-left: 10px">{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="帳戶名稱" width="120">
          <template slot-scope="scope">
            <el-input v-model="input" placeholder="請輸入名稱" />
            <span style="margin-left: 10px">{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column label="初始金額" width="120">
          <template slot-scope="scope">
            <el-input v-model="input" placeholder="請輸入金額" />
            <span style="margin-left: 10px">{{ scope.row.money }}</span>
          </template>
        </el-table-column>
        <el-table-column label="匯率" width="120">
          <template slot-scope="scope">
            <el-input v-model="input" placeholder="請輸入匯率" />
            <span style="margin-left: 10px">{{ scope.row.class }}</span>
          </template>
        </el-table-column>
        <el-table-column label="備忘" width="260">
          <template slot-scope="scope">
            <el-input v-model="input" placeholder="新增備忘" />
            <span style="margin-left: 10px">{{ scope.row.subclass }}</span>
          </template>
        </el-table-column>
        <el-table-column label="載具隱碼" width="200">
          <template slot-scope="scope">
            <el-input v-model="input" placeholder="請輸入載具隱碼" />
            <span style="margin-left: 10px">{{ scope.row.subclass }}</span>
          </template>
        </el-table-column>
        <el-table-column label="" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-plus" circle />
            <el-button type="primary" icon="el-icon-edit" circle />
            <el-button type="danger" icon="el-icon-delete" circle />

          </template>

        </el-table-column>

      </el-table>
    </div>
    <div class="add">

      <el-button type="primary " @click="onSubmit ">儲存</el-button>
    </div>
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
.acu1 {
  padding-right: 2vmax;
  padding-left: 2vmax;
  padding-top: 2vmax;
  padding-bottom: 2vmax;
}
.add {
  margin-top: 10vmin;
  margin-bottom: 50vmax;
  margin-right: 5vmin;
  margin-left: 155vmin;
  position: fixed;
}
</style>
