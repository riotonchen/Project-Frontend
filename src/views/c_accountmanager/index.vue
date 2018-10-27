<template>
  <div class="app-container">
    <title>
      {{ $t('route.c_accountmanager') }}
    </title>
    <div class="filter-container">
      <el-select v-model="listQuery.id" placeholder="帳戶名稱" clearable filterable style="width: 25vw;max-width:7.5rem;min-width:5.5rem;" @focus="get_accountlist()" @change="get_accountlist()">
        <el-option v-for="account in c_accountitem" :key="account.id" :label="account.name" :value="account.id" />
      </el-select>
    </div>
    <div class="history_table_container">
      <el-table :data="c_user_account" stripe style="width: 100%;" max-height="470" fit sortable>
        <el-table-column prop="id" label="編號" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="帳戶名稱" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="餘額" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.balance }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="handle_edit(scope.$index,scope.row)">編輯</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog_container">
      <el-dialog :visible.sync="c_account_visible" width="80vw" title="編輯">
        <el-form :model="c_account_edit" label-position="left" inline class="table-account">
          <el-form-item>
            <span>以下如不修改保持空白即可</span>
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item label="帳戶名稱">
            <el-input v-model="c_account_edit.name" :placeholder="c_account_name_p" clearable />
          </el-form-item>
        </el-form>

        <span slot="footer" class="invoice_dialog_footer">
          <el-button type="danger" plain @click="c_account_del()">刪除</el-button>
          <el-button type="primary" @click="c_account_confirm()">確定</el-button>
          <el-button type="info" plain @click="c_account_cal()">取消</el-button>
        </span>

      </el-dialog>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波紋指令
import { getaccount } from '@/api/account/getaccount'
import { getToken } from '@/utils/auth'

export default {
  name: 'CAccountmanager',
  directives: {
    waves
  },
  data() {
    /*
    const validatename = (rule, value, callback) => {
      if (value.lengh > 10) {
        callback(new Error('中英上限10個字'))
      } else {
        callback()
      }
    }
    const validatemoney = (rule, value, callback) => {
      if (!validatemoney(value)) {
        callback(new Error('請輸入正確金額'))
      } else {
        callback()
      }
    }
    return {
      accountform: {
        accountname: '',
        startmoney: ''
      },
      accountRules: {
        accountname: [{ tigger: 'blur', validator: validatename }],
        startmoney: [{ tigger: 'blur', validator: validatemoney }]
      }
    }
    */
    return {
      listQuery: {
        id: undefined
      },
      c_account_name_p: '',
      c_account_number_p: '',
      c_accountitem: [],
      c_user_account: null,
      c_account_edit: {
        name: '',
        number: ''
      },
      c_account_visible: false
    }
  },
  created() {
    this.get_accountlist()
    this.get_account()
    this.get_nowtime()
  },
  methods: {
    handle_edit(index, row) {
      this.c_account_name_p = row.name
      this.c_account_number_p = row.number
      this.c_account_visible = true
    },
    get_accountlist() {
      getaccount(getToken()).then(response => {
        this.c_accountlist = response.data
        this.get_account()
      }).catch((error) => {
        console.log(error)
      })
    },
    get_account() {
      getaccount(getToken(), this.listQuery).then(response => {
        this.c_accountitem = response.data
        this.c_user_account = response.data
      }).catch((error) => {
        console.log(error)
      })
    },
    c_account_confirm() {
      this.$message({
        type: 'success',
        message: '已完成該帳戶資料資料修改'
      })
      this.c_account_visible = false
    },
    c_account_cal() {
      this.$message({
        type: 'info',
        message: '已取消修改'
      })
      this.c_account_visible = false
    },
    c_account_del() {
      this.$confirm('你真的要刪除該帳戶資料資料嗎？', '警告', {
        cancelButtonText: '取消',
        confirmButtonText: '確認',
        type: 'warning'
      }).then(() => {
        this.$confirm('請在確認一次是否要刪除該帳戶資料資料', '警告', {
          cancelButtonText: '取消',
          confirmButtonText: '確認',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '刪除成功'
          })
          this.c_account_visible = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消刪除'
          })
          this.c_account_visible = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刪除'
        })
        this.c_account_visible = false
      })
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>
<style lang="scss">
.table-account {
  font-size: 0;
}
.table-account label {
  width: 90px;
  color: #99a9bf;
}
.table-account .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 100%;
}
</style>

