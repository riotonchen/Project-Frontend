<template>
  <!--修改刪除新增未寫-->
  <div class="app-container">
    <title>
      {{ $t('route.c_accountmanager') }}
    </title>
    <div class="filter_container">
      <el-select
        v-model="c_account_type"
        :placeholder="$t('c_accountmanager.accounttype')"
        filterable
        clearable
        style="width: 10vw;max-width:8rem;min-width:5rem;"
        @focus="get_account()"
        @change="get_account()"
      >
        <el-option
          v-for="type in c_account_type_options"
          :key="type.accounttype_id"
          :label="type.name"
          :value="type.accounttype_id"
        />
      </el-select>
      <el-select
        v-model="c_account_name"
        :disabled="c_account_name_visible"
        :placeholder="$t('c_accountmanager.mainsortname')"
        filterable
        style="width: 25vw;max-width:7.5rem;min-width:6.5rem;"
        @focus="get_account()"
        @change="get_account()"
      >
        <el-option
          v-for="name in c_account_name_options"
          :key="name.id"
          :label="name.name"
          :value="name.id"
        />
      </el-select>
      <el-button
        type="primary"
        @click="c_open_add_view()"
      >
        {{ $t('c_accountmanager.add') }}
      </el-button>
    </div>
    <div class="account_table_container">
      <el-table
        v-loading.fullscreen.lock="view_loading"
        :data="c_account_data"
        element-loading-text="正在幫你載入所有帳戶資料中......."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.9)"
        stripe
        style="width: 100%;"
        max-height="550"
        fit
      >
        <el-table-column
          type="index"
          align="center"
        />
        <el-table-column
          :label="$t('c_accountmanager.accountname')"
          prop="name"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('c_accountmanager.accounttype')"
          prop="accounttype_id"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.accounttype_id.name==='現金'?'primary':scope.row.accounttype_id.name==='資產'?'success':scope.row.accounttype_id.name==='儲值卡'?'warning':'danger'">
              <span>
                {{ scope.row.accounttype_id.name }}
              </span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('c_accountmanager.finallymoney')"
          prop="balance"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.balance }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('c_accountmanager.action')"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              @click.native.prevent="handle_edit(scope.$index,scope.row)"
            >{{ $t('c_card_view.edit') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog_container">
      <!--新增-->
      <el-dialog
        :visible.sync="c_category_add_visible"
        :title="$t('c_accountmanager.add')"
        width="80vw"
      >
        <el-form
          ref="c_category_add"
          :model="c_category_add"
          :rules="c_category_add_rules"
          label-position="left"
          inline
          class="table_account_add"
        >
          <el-form-item
            :label="$t('c_accountmanager.accountname')"
            prop="name"
          >
            <el-input
              v-model="c_category_add.name"
              :placeholder="$t('c_accountmanager.accountname')"
            />
          </el-form-item>
          <el-form-item
            :label="$t('c_accountmanager.accounttype')"
            prop="type"
          >
            <el-select
              v-model="c_category_add.type"
              :placeholder="$t('c_accountmanager.accounttype')"
              filterable
              clearable
              @focus="get_account()"
              @change="get_account()"
            >
              <el-option
                v-for="type in c_account_type_options"
                :key="type.accounttype_id"
                :label="type.name"
                :value="type.accounttype_id"
              />
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer">
          <el-button
            type="primary"
            @click.native.prevent="c_account_add()"
          >{{ $t('c_accountmanager.confirm') }}</el-button>
          <el-button
            type="info"
            plain
            @click.native.prevent="c_account_cal()"
          >{{ $t('c_accountmanager.cancel') }}</el-button>
        </span>

      </el-dialog>
      <!--修改-->
      <el-dialog
        :visible.sync="c_category_configure_visible"
        :title="$t('c_accountmanager.edit')"
        width="80vw"
      >
        <el-form
          ref="c_category_configure"
          :model="c_category_configure"
          :rules="c_category_configure_rules"
          label-position="left"
          inline
          class="table_account_confi"
        >
          <el-form-item
            :label="$t('c_accountmanager.accountname')"
            prop="name"
          >
            <el-input
              v-model="c_category_configure.name"
              :placeholder="c_account_add_name_p"
            />
          </el-form-item>
          <!--
          <el-form-item :label="$t('c_accountmanager.accounttype')">
            <el-select v-model="c_category_configure.type" :placeholder="$t('c_accountmanager.project')" filterable clearable>
              <el-option v-for="type in c_account_type_options" :key="type.accounttype_id" :label="type.name" :value="type.accounttype_id" />
            </el-select>
          </el-form-item>
          -->
          <el-form-item
            :label="$t('c_accountmanager.finallymoney')"
            prop="balance"
          >
            <el-input
              v-model="c_category_configure.balance"
              :placeholder="c_account_add_balance_p"
            />
          </el-form-item>
        </el-form>

        <span slot="footer">
          <el-button
            type="danger"
            plain
            @click.native.prevent="c_account_del()"
          >{{ $t('c_accountmanager.delete') }}</el-button>
          <el-button
            type="primary"
            @click.native.prevent="c_account_configure()"
          >{{ $t('c_accountmanager.confirm') }}</el-button>
          <el-button
            type="info"
            plain
            @click.native.prevent="c_account_cal()"
          >{{ $t('c_accountmanager.cancel') }}</el-button>
        </span>

      </el-dialog>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波紋指令
import { postaccount } from '@/api/account/postaccount'
import {
  getaccount_all,
  getaccounttype,
  getaccountsingledata
} from '@/api/account/getaccount'
import {
  patchaccount_modify,
  patchaccount_del
} from '@/api/account/patchaccount'
import { getToken } from '@/utils/auth'
import { formatdate } from '@/utils/index'
import { validdouble } from '@/utils/validate'

export default {
  name: 'CAccountmanager',
  directives: {
    waves
  },
  data() {
    const validatename = (rule, value, callback) => {
      if (value === '' || value === null) {
        return callback(new Error('名稱不能為空'))
      } else if (value.length > 10) {
        callback(new Error('名稱不可以大於 10 個字'))
      } else {
        callback()
      }
    }
    const validatebalance = (rule, value, callback) => {
      if (value === '' || value === null) {
        return callback(new Error('金額不能為空'))
      } else if (!validdouble(value)) {
        callback(new Error('金額只有數字(可有小數點)'))
      } else {
        callback()
      }
    }
    return {
      c_account_type: null,
      c_account_name: null,
      c_account_add_name_p: null,
      c_account_add_balance_p: null,
      c_account_data: [],
      c_account_type_options: [],
      c_account_name_options: [],
      c_category_add: {
        name: '',
        type: ''
      },
      c_category_configure: {
        id: '',
        name: '',
        type: '',
        balance: ''
      },
      c_account_name_visible: true,
      c_category_add_visible: false,
      c_category_configure_visible: false,
      view_loading: true,
      c_category_add_rules: {
        name: [{ required: true, trigger: 'change', validator: validatename }]
        // 類型不得為空
      },
      c_category_configure_rules: {
        name: [{ required: true, trigger: 'change', validator: validatename }],
        balance: [
          { required: true, trigger: 'change', validator: validatebalance }
        ]
        // 類型不得為空(先不加)
      }
    }
  },
  watch: {
    c_account_type: function(new_type, old_type) {
      if (new_type !== old_type) {
        this.c_account_name = null
        this.get_account()
      }
    }
  },
  created() {
    this.page_load()
  },
  methods: {
    page_load() {
      setTimeout(() => {
        this.view_loading = false
        this.get_account()
        this.get_accounttype()
      }, 1500)
    },
    get_account() {
      if (this.c_account_type - 1 < 0) {
        this.c_account_name_visible = true
        getaccount_all(getToken(), this.c_account_type).then(response => {
          this.c_account_data = response.data
          this.c_account_name_options = response.data
        })
      } else if (this.c_account_name === null) {
        getaccount_all(getToken(), this.c_account_type).then(response => {
          this.c_account_data = response.data
          this.c_account_name_options = response.data
          this.c_account_name_visible = false
        })
      } else {
        getaccountsingledata(getToken(), this.c_account_name).then(response => {
          this.c_account_data = []
          this.c_account_data.push(response.data)
        })
      }
    },
    get_accounttype() {
      getaccounttype(getToken()).then(response => {
        this.c_account_type_options = response.data
      })
    },
    c_open_add_view() {
      this.c_category_add_visible = true
    },
    c_account_cal() {
      this.$message({
        type: 'info',
        message: '已取消動作'
      })
      this.c_category_add_visible = false
      this.c_category_configure_visible = false
    },
    c_account_add() {
      this.$refs.c_category_add.validate(valid => {
        if (valid) {
          postaccount(
            getToken(),
            this.c_category_add.name,
            this.c_category_add.type
          )
            .then(() => {
              this.$message({
                type: 'success',
                message: '已成功新增一筆帳戶'
              })
              this.c_account_type = null
              this.c_account_name = null
              this.c_category_add_visible = false
              this.get_account()
            })
            .catch(error => {
              console.log(error)
              this.$message({
                type: 'error',
                message: '發生一點錯誤，請稍後再做新增'
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    c_account_configure() {
      this.$refs.c_category_configure.validate(valid => {
        if (valid) {
          const date = formatdate('yyyy-mm-dd HH:MM:ss.l')
          patchaccount_modify(
            getToken(),
            this.c_category_configure.id,
            this.c_category_configure.name,
            this.c_category_configure.balance,
            date
          )
            .then(() => {
              this.$message({
                type: 'success',
                message: '已成功修改一筆帳戶'
              })
              this.c_account_type = null
              this.c_account_name = null
              this.c_category_configure_visible = false
              this.get_account()
            })
            .catch(error => {
              console.log(error)
              this.$message({
                type: 'error',
                message: '發生一點錯誤，請稍後再做新增'
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    c_account_del() {
      this.$refs.c_category_configure.validate(valid => {
        if (valid) {
          this.$confirm('你真的要刪除該帳戶資料嗎？', '警告', {
            cancelButtonText: '取消',
            confirmButtonText: '確認',
            type: 'warning'
          })
            .then(() => {
              this.$confirm('請在確認一次是否要刪除該帳戶資料資料', '警告', {
                cancelButtonText: '取消',
                confirmButtonText: '確認',
                type: 'warning'
              })
                .then(() => {
                  const date = formatdate('yyyy-mm-dd HH:MM:ss.l')
                  patchaccount_del(
                    getToken(),
                    this.c_category_configure.id,
                    date
                  )
                    .then(() => {
                      this.$message({
                        type: 'success',
                        message: '刪除成功'
                      })
                      this.c_account_type = null
                      this.c_account_name = null
                      this.c_category_configure_visible = false
                      this.get_account()
                    })
                    .catch(error => {
                      console.log(error)
                      this.$message({
                        type: 'error',
                        message: '發生一點錯誤，請稍後再做修改'
                      })
                    })
                  this.c_category_configure_visible = false
                })
                .catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消刪除'
                  })
                  this.c_category_configure_visible = false
                })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消刪除'
              })
              this.c_category_configure_visible = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handle_edit(index, row) {
      this.c_category_configure_visible = true
      this.c_account_add_name_p = row.name
      this.c_account_add_balance_p = row.balance
      this.c_category_configure.id = row.id
      this.c_category_configure.name = row.name
      this.c_category_configure.balance = row.balance
      // this.c_category_configure.type = row.accounttype.id.name
    }
  }
}
</script>
<style lang="scss">
.accountma_container {
  padding: 20px;
}

.table_account_add {
  font-size: 0;
}
.table_account_add label {
  width: 100px;
  color: #99a9bf;
}
.table_account_add .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 50%;
}
.table_account_confi {
  font-size: 0;
}
.table_account_confi label {
  width: 100px;
  color: #99a9bf;
}
.table_account_confi .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 100%;
}
</style>

