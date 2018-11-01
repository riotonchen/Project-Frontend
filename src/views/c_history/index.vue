<template>

  <div class="history_container">
    <title>
      {{ $t('route.c_history') }}
    </title>

    <div class="filter_container">
      <el-row class="date_seletor">
        <el-col :xs="6" :sm="3" :md="2" :lg="2" :xl="1" class="selector_title">
          <span>{{ $t('c_history.selecttime') }}</span>
        </el-col>
        <el-col :xs="24" :sm="15" :md="9" :lg="8" :xl="6">
          <el-date-picker v-model="startenddate" :start-placeholder="$t('c_history.startdate')" :end-placeholder="$t('c_history.enddate')" range-separator="-" align="center" type="daterange" style="width: 40vw;min-width:15rem;max-width:23rem;" />
        </el-col>
      </el-row>
      <el-row class="class_seletor">
        <el-col :xs="6" :sm="3" :md="2" :lg="2" :xl="1" class="selector_title">
          <span>{{ $t('c_history.selectclass') }}</span>
        </el-col>
        <el-col :xs="24" :sm="15" :md="9" :lg="8" :xl="6">
          <el-select v-model="c_payorin" :placeholder="$t('c_history.incomespend')" filterable clearable style="width: 25vw;max-width:7.5rem;min-width:5.5rem;">
            <el-option v-for="payorin in c_pay_in" :key="payorin.value" :label="payorin.label" :value="payorin.value" />
          </el-select>
          <el-select v-model="c_sort" :disabled="c_sort_disable" :placeholder="$t('c_history.mainsort')" filterable style="width: 25vw;max-width:7.5rem;min-width:6.5rem;" @focus="get_sort()" @change="get_subsort()">
            <el-option v-for="sort in c_sort_payorinitem" :key="sort.id" :label="sort.name" :value="sort.id" />
          </el-select>
          <el-select v-model="c_subsort" :disabled="c_subsort_disable" :placeholder="$t('c_history.subclass')" filterable style="width: 25vw;max-width:7.5rem;min-width:6.5rem;">
            <el-option v-for="subsort in c_subsort_payorinitem" :key="subsort.id" :label="subsort.name" :value="subsort.id" />
          </el-select>
        </el-col>
      </el-row>
      <el-row class="project_seletor">
        <el-col :xs="6" :sm="3" :md="2" :lg="2" :xl="1" class="selector_title">
          <span>{{ $t('c_history.selectproject') }}</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="9" :lg="8" :xl="6">
          <el-select v-model="c_project" :placeholder="$t('c_history.project')" filterable style="width: 25vw;max-width:13.2rem;min-width:11.8rem;" @focus="get_project()">
            <el-option v-for="project in c_projectitem" :key="project.id" :label="project.name" :value="project.id" />
          </el-select>
        </el-col>
      </el-row>
      <el-row class="account_seletor">
        <el-col :xs="6" :sm="3" :md="2" :lg="2" :xl="1" class="selector_title">
          <span>{{ $t('c_history.selectaccount') }}</span>
        </el-col>
        <el-col :xs="24" :sm="15" :md="9" :lg="8" :xl="6">
          <el-select v-model="c_account" :placeholder="$t('c_history.account')" filterable style="width: 25vw;max-width:13.2rem;min-width:11.8rem;" @focus="get_account()">
            <el-option v-for="account in c_accountitem" :key="account.id" :label="account.name" :value="account.id" />
          </el-select>
        </el-col>
      </el-row>
    </div>

    <div class="history_table_container">
      <!--目前使用日期做排序-->
      <el-table :data="c_user_history" :default-sort="{prop: 'date', order: 'descending'}" stripe style="width: 100%;" max-height="470" fit>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table_expand">
              <el-form-item :label="$t('c_history.note')">
                <span>{{ props.row.comment }}</span>
              </el-form-item>
              <el-form-item :label="$t('c_history.picture')">
                <span>{{ props.row.picture }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column :label="$t('c_history.date')" prop="purchasedate" sortable align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.purchasedate }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('c_history.receipt')" prop="invoice_id.number" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.invoice_id.number }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('c_history.incomespend')" prop="type" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.type==='支出'?'danger':'primary'">
              <span>
                {{ scope.row.type }}
              </span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('c_history.mainsort')" prop="sort_id.name" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.sort_id.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('c_history.subclass')" prop="subsort_id.name" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.subsort_id.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('c_history.project')" prop="project_id.name" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.project_id.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('c_history.account')" prop="account_id.name" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.account_id.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('c_history.money')" prop="amount" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.amount }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('c_history.operation')" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="handle_edit(scope.$index,scope.row)">{{ $t('c_history.edit') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog_container">
      <el-dialog :visible.sync="c_history_visible" :title="$t('c_history.edit')" width="80vw">
        <el-form :model="c_history_edit" label-position="left" inline class="table_history">
          <el-form-item>
            <span>{{ $t('c_history.notmodify') }}</span>
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item :label="$t('c_history.date')">
            <el-date-picker v-model="c_history_edit.date" :placeholder="c_history_date_p" type="date" />
          </el-form-item>
          <el-form-item :label="$t('c_history.receiptnumber')">
            <el-input v-model="c_history_edit.invoice" :placeholder="c_history_invoice_p" clearable />
          </el-form-item>
          <el-form-item :label="$t('c_history.account')">
            <el-select v-model="c_history_edit.account" :placeholder="c_history_account_p" filterable style="width: 25vw;max-width:13.2rem;min-width:11.8rem;" @focus="get_account()">
              <el-option v-for="account in c_accountitem" :key="account.id" :label="account.name" :value="account.id" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('c_history.money')">
            <el-input v-model="c_history_edit.amount" :placeholder="c_history_amount_p" clearable />
          </el-form-item>
          <hr>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item :label="$t('c_history.incomespend')">
            <el-select v-model="c_history_edit.payorin" :placeholder="$t('c_history.incomespend')" filterable style="width: 25vw;max-width:7.5rem;min-width:6.5rem;">
              <el-option v-for="payorin in c_pay_in" :key="payorin.value" :label="payorin.label" :value="payorin.value" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('c_history.mainsort')">
            <el-select v-model="c_history_edit.sort" :disabled="c_sort_disable" :placeholder="$t('c_history.mainsort')" filterable style="width: 25vw;max-width:7.5rem;min-width:6.5rem;" @focus="get_sort()" @change="get_subsort()">
              <el-option v-for="sort in c_sort_payorinitem" :key="sort.id" :label="sort.name" :value="sort.id" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('c_history.subclass')">
            <el-select v-model="c_history_edit.subsort" :disabled="c_subsort_disable" :placeholder="$t('c_history.subclass')" filterable style="width: 25vw;max-width:7.5rem;min-width:6.5rem;">
              <el-option v-for="subsort in c_subsort_payorinitem" :key="subsort.id" :label="subsort.name" :value="subsort.id" />
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer" class="invoice_dialog_footer">
          <el-button type="danger" plain @click="c_history_del()">{{ $t('c_history.delete') }}</el-button>
          <el-button type="primary" @click="c_history_confirm()">{{ $t('c_history.confirm') }}</el-button>
          <el-button type="info" plain @click="c_history_cal()">{{ $t('c_history.cancel') }}</el-button>
        </span>

      </el-dialog>
    </div>
  </div>
</template>
<script>

// import { parseTime } from '@/utils'

import waves from '@/directive/waves' // 水波紋指令
import { getaccounting_all } from '@/api/accounting/getaccounting'
import { getsort_pay, getsort_in } from '@/api/sort/getsort'
import { getsubsort } from '@/api/subsort/getsubsort'
import { getproject } from '@/api/project/getproject'
import { getaccount_all } from '@/api/account/getaccount'
import { getToken } from '@/utils/auth'

export default {
  name: 'CHistory',
  directives: {
    waves
  },
  data() {
    return {
      startenddate: '',
      c_payorin: '',
      c_sort: '',
      c_subsort: '',
      c_project: '',
      c_account: '',
      c_history_edit:
      {
        date: '',
        invoice: '',
        account: '',
        amount: '',
        payorin: '',
        sort: '',
        subsort: ''
      },
      c_history_date_p: '',
      c_history_invoice_p: '',
      c_history_account_p: '',
      c_history_amount_p: '',
      c_sort_payorinitem: [],
      c_subsort_payorinitem: [],
      c_projectitem: [],
      c_accountitem: [],
      c_sort_disable: true,
      c_subsort_disable: true,
      c_history_visible: false,
      c_pay_in: [{ label: '支出', value: 0 }, { label: '收入', value: 1 }],
      c_user_history: []
    }
  },
  watch: {
    c_payorin: function(newc_payorin, oldc_payorin) {
      if (oldc_payorin === '') {
        this.c_sort_disable = false
      } else if (newc_payorin !== 1 && newc_payorin !== 0) {
        this.c_sort_disable = true
        this.c_subsort_disable = true
        this.c_sort = ''
        this.c_subsort = ''
      } else if (newc_payorin !== oldc_payorin) {
        this.c_sort = ''
        this.c_subsort = ''
        this.get_sort()
      }
    },
    c_sort: function(newc_sort, oldc_sort) {
      if (oldc_sort === '') {
        this.c_subsort_disable = false
      } else if (newc_sort !== oldc_sort) {
        this.c_subsort = ''
      }
    },
    c_subsort: function(newc_subsort, oldc_subsort) {
      if (oldc_subsort === '') {
        this.c_subsort_disable = false
      } else if (this.c_sort === '') {
        this.c_subsort_disable = true
      }
    }
  },
  created() {
    this.get_getaccounting_all()
  },
  methods: {
    get_getaccounting_all() {
      getaccounting_all(getToken()).then((response) => {
        this.c_user_history = response.data
        this.c_user_history.forEach(function(element) {
          if (element.type === false) {
            element.type = '支出'
          } else {
            element.type = '收入'
          }
        })
      })
    },
    get_sort() {
      if (this.c_payorin === 0) {
        getsort_pay(getToken()).then(response => {
          this.c_sort_payorinitem = response.data
        }).catch((error) => {
          console.log(error)
        })
      } else {
        getsort_in(getToken()).then(response => {
          this.c_sort_payorinitem = response.data
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    get_subsort() {
      getsubsort(getToken(), this.c_sort).then(response => {
        if (response.data.length !== 0) {
          this.c_subsort_payorinitem = response.data
        } else {
          this.c_subsort_disable = true
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    get_project() {
      getproject(getToken()).then(response => {
        this.c_projectitem = response.data
      }).catch((error) => {
        console.log(error)
      })
    },
    get_account() {
      getaccount_all(getToken()).then(response => {
        this.c_accountitem = response.data
      }).catch((error) => {
        console.log(error)
      })
    },
    handle_edit(index, row) {
      this.c_history_date_p = row.purchasedate
      this.c_history_invoice_p = row.invoice_id.number
      this.c_history_account_p = row.account_id.name
      this.c_history_amount_p = row.amount
      this.c_history_visible = true
    },
    handle_filter() {

    },
    c_history_confirm() {
      this.$message({
        type: 'success',
        message: '已完成該筆資料修改'
      })
      this.c_history_visible = false
    },
    c_history_cal() {
      this.$message({
        type: 'info',
        message: '已取消修改'
      })
      this.c_history_visible = false
    },
    c_history_del() {
      this.$confirm('你真的要刪除該筆資料嗎？', '警告', {
        cancelButtonText: '取消',
        confirmButtonText: '確認',
        type: 'warning'
      }).then(() => {
        this.$confirm('請在確認一次是否要刪除該筆資料', '警告', {
          cancelButtonText: '取消',
          confirmButtonText: '確認',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '刪除成功'
          })
          this.c_card_visible = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消刪除'
          })
          this.c_history_visible = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刪除'
        })
        this.c_history_visible = false
      })
    }
  }
}
</script>
<style lang="scss">
.history_container {
  padding: 20px;
}
.selector_title {
  line-height: 2.25rem;
  font-size: 0.7vw;
}

.history-container {
  padding: 20px;
}

.table_expand {
  font-size: 0;
}
.table_expand label {
  width: 90px;
  color: #99a9bf;
}
.table_expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}

.table_history {
  font-size: 0;
}
.table_history label {
  width: 100px;
  color: #99a9bf;
}
.table_history .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 50%;
}

.history_table_container {
  background-color: rgb(240, 242, 245);
}
</style>

