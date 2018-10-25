<template>
  <div class="hst1">
    <div class="h1">
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
    <div class="h2">
      <el-table :data="tableData" height="350" style="width: 100%">
        <el-table-column label="帳戶" width="150">
          <template slot-scope="scope">
            <el-input v-model="input" placeholder="" />

            <span style="margin-left: 10px">{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column label="金額" width="100">
          <template slot-scope="scope">
            <el-input v-model="input" placeholder="" />
            <span style="margin-left: 10px">{{ scope.row.money }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分類" width="100">
          <template slot-scope="scope">
            <el-input v-model="input" placeholder="" />
            <span style="margin-left: 10px">{{ scope.row.class }}</span>
          </template>
        </el-table-column>
        <el-table-column label="子分類" width="100">
          <template slot-scope="scope">
            <el-input v-model="input" placeholder="" />
            <span style="margin-left: 10px">{{ scope.row.subclass }}</span>
          </template>
        </el-table-column>
        <el-table-column label="專案" width="150">
          <template slot-scope="scope">
            <el-input v-model="input" placeholder="" />
            <span style="margin-left: 10px">{{ scope.row.project }}</span>
          </template>
        </el-table-column>
        <el-table-column label="發票號碼" width="180">
          <template slot-scope="scope">
            <el-input v-model="input" placeholder="" />
            <span style="margin-left: 10px">{{ scope.row.invoice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="備註" width="180">
          <template slot-scope="scope">
            <el-input v-model="input" placeholder="" right="fixed" />
            <span style="margin-left: 10px">{{ scope.row.remarks }}</span>
          </template>
        </el-table-column>
        <el-table-column label="">
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
        type: '',
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        value6: '',
        value7: ''
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
.hst1 {
  padding-right: 2vmax;
  padding-left: 2vmax;
  padding-top: 2vmax;
  padding-bottom: 2vmax;
}
.add {
  margin-top: 5vmin;
  margin-bottom: 50vmax;
  margin-right: 5vmin;
  margin-left: 160vmin;
  position: fixed;
}
</style>
