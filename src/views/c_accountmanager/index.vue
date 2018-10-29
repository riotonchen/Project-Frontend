<template>
  <!--修改刪除新增未寫-->
  <div class="app-container">
    <title>
      {{ $t('route.c_accountmanager') }}
    </title>
    <div class="filter-container">
      <el-select v-model="c_account_options" :placeholder="$t('c_accountmanager.accountname')" clearable filterable style="width: 25vw;max-width:10rem;min-width:8.5rem;" @focus="get_account()" @change="get_accountsingledata()">
        <el-option v-for="account in c_accountitem" :key="account.id" :label="account.name" :value="account.id" />
      </el-select>
      <el-button type="primary" @click.native.prevent="c_account_add()">{{ $t('c_accountmanager.add') }}</el-button>
    </div>
    <div class="history_table_container">
      <el-table :data="c_account_list" stripe style="width: 100%;" max-height="500" fit sortable>
        <el-table-column type="index" align="center" />
        <el-table-column :label="$t('c_accountmanager.accountname')" prop="name" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('c_accountmanager.accounttype')" prop="accounttype_id" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.accounttype_id.name==='現金'?'primary':scope.row.accounttype_id.name==='資產'?'success':scope.row.accounttype_id.name==='儲值卡'?'warning':'danger'">
              <span>{{ scope.row.accounttype_id.name }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('c_accountmanager.finallymoney')" prop="number" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.balance }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('c_accountmanager.operating')" align="center">
          <template slot-scope="scope">
            <el-button type="primary" plain @click.native.prevent="handle_edit(scope.$index,scope.row)">{{ $t('c_accountmanager.edit') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog_container">
      <el-dialog :visible.sync="c_account_visible" :title="$t('c_accountmanager.operating')" width="80vw">
        <el-form :model="c_account_edit" label-position="left" inline class="table_account">
          <el-form-item>
            <span>{{ $t('c_accountmanager.blank') }}</span>
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item :label="$t('c_accountmanager.accountname')">
            <el-input v-model="c_account_edit.name" :placeholder="c_account_name_p" clearable @focus="clean_name()" />
          </el-form-item>
          <el-form-item :label="$t('c_accountmanager.finallymoney')">
            <el-input v-model="c_account_edit.balance" :placeholder="c_account_balance_p" clearable @focus="clean_balance()" />
          </el-form-item>
        </el-form>

        <span slot="footer">
          <el-button type="danger" plain @click.native.prevent="c_account_del()">{{ $t('c_accountmanager.delete') }}</el-button>
          <el-button type="primary" @click.native.prevent="c_account_confirm()">{{ $t('c_accountmanager.confirm') }}</el-button>
          <el-button type="info" plain @click.native.prevent="c_account_cal()">{{ $t('c_accountmanager.cancel') }}</el-button>
        </span>

      </el-dialog>
      <el-dialog :visible.sync="c_account_add_visible" :title="$t('c_accountmanager.add')" width="80vw">
        <el-form :model="c_account_addn" label-position="left" inline class="table_account_add">
          <el-form-item :label="$t('c_accountmanager.accountname')">
            <el-input v-model="c_account_addn.name" clearable />
          </el-form-item>
          <el-form-item :label="$t('c_accountmanager.accounttype')">
            <el-select v-model="c_account_addn.type" clearable filterable>
              <el-option v-for="type in c_accounttypeitem" :key="type.accounttype_id" :label="type.name" :value="type.accounttype_id" />
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer">
          <el-button type="primary" @click.native.prevent="c_account_add_confirm()">{{ $t('c_accountmanager.confirm') }}</el-button>
          <el-button type="info" plain @click.native.prevent="c_account_cal()">{{ $t('c_accountmanager.cancel') }}</el-button>
        </span>

      </el-dialog>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波紋指令
import { postaccount } from '@/api/account/postaccount'
import { getaccount, getaccounttype, getaccountsingledata } from '@/api/account/getaccount'
import { patchaccount_modify, patchaccount_del } from '@/api/account/patchaccount'
import { getToken } from '@/utils/auth'
import { formatdate } from '@/utils/index'

export default {
  name: 'CAccountmanager',
  directives: {
    waves
  },
  data() {
    return {
      c_account_options: null,
      c_account_name_p: null,
      c_account_balance_p: null,
      c_accountitem: [],
      c_account_list: [],
      c_accounttypeitem: [],
      c_account_addn: {
        name: null,
        type: null
      },
      c_account_edit: {
        id: null,
        name: null,
        balance: null,
        accounttypr_id: null
      },
      c_account_visible: false,
      c_account_add_visible: false
    }
  },
  created() {
    this.get_accountlist()
    this.get_accounttype()
  },
  methods: {
    clean_name() {
      this.c_account_edit.name = ''
    },
    clean_balance() {
      this.c_account_edit.balance = ''
    },
    handle_edit(index, row) {
      this.c_account_edit.id = row.id
      this.c_account_name_p = row.name
      this.c_account_balance_p = row.balance
      this.c_account_edit.name = row.name
      this.c_account_edit.balance = row.balance
      this.c_account_visible = true
    },
    get_accountlist() {
      getaccount(getToken()).then(response => {
        this.c_accountitem = response.data
        this.get_account()
      }).catch((error) => {
        console.log(error)
      })
    },
    get_account() {
      getaccount(getToken()).then(response => {
        this.c_account_list = response.data
      }).catch((error) => {
        console.log(error)
      })
    },
    get_accountsingledata() {
      if (this.c_account_options === '') {
        this.get_account()
      } else {
        getaccountsingledata(getToken(), this.c_account_options).then((response) => {
          this.c_account_list = []
          this.c_account_list.push(response.data)
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    c_account_add() {
      this.c_account_add_visible = true
    },
    c_account_add_confirm() {
      postaccount(getToken(), this.c_account_addn.name, this.c_account_addn.type).then(() => {
        this.$message({
          type: 'success',
          message: '帳戶新增成功'
        })
        this.get_account()
      }).catch((error) => {
        console.log(error)
        this.$message({
          type: 'error',
          message: '發生一點錯誤，請稍後再做新增'
        })
      })
      this.c_account_add_visible = false
    },
    get_accounttype() {
      getaccounttype(getToken()).then((response) => {
        console.log(response.data.name)
        this.c_accounttypeitem = response.data
      })
    },
    c_account_confirm() {
      const date = formatdate('yyyy-mm-dd HH:MM:ss.l')
      patchaccount_modify(getToken(), this.c_account_edit.id, this.c_account_edit.name, this.c_account_edit.balance, date)
        .then(() => {
          this.$message({
            type: 'success',
            message: '帳戶相關更新成功'
          })
          this.get_account()
        })
        .catch((error) => {
          console.log(error)
          this.$message({
            type: 'error',
            message: '發生一點錯誤，請稍後再做修改'
          })
        })
      this.c_account_visible = false
    },
    c_account_cal() {
      this.$message({
        type: 'info',
        message: '已取消修改'
      })
      this.c_account_visible = false
      this.c_account_add_visible = false
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
          const date = formatdate('yyyy-mm-dd HH:MM:ss.l')
          patchaccount_del(getToken(), this.c_account_edit.id, date).then(() => {
            this.$message({
              type: 'success',
              message: '刪除成功'
            })
          }).catch((error) => {
            console.log(error)
            this.$message({
              type: 'error',
              message: '發生一點錯誤，請稍後再做修改'
            })
          })
          this.get_account()
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
    }
  }
}
</script>
<style lang="scss">
.table_account {
  font-size: 0;
}
.table_account label {
  width: 90px;
  color: #99a9bf;
}
.table_account .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 100%;
}

.table_account_add {
  font-size: 0;
}
.table_account_add label {
  width: 90px;
  color: #99a9bf;
}
.table_account_add .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 50%;
}
</style>

