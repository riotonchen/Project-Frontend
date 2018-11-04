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
          <template slot-scope="scope">
            <el-form label-position="left" inline class="table_expand">
              <!--
              <el-form-item label="發票隨機碼">
                <div v-if="scope.row.invoice_id==='-'">
                  <span>
                    {{ scope.row.invoice_id }}
                  </span>
                </div>
                <div v-else>
                  <span>
                    {{ scope.row.invoice_id.randomNumber }}
                  </span>
                </div>
              </el-form-item>
              -->
              <el-form-item :label="$t('c_history.note')">
                <span>{{ scope.row.comment }}</span>
              </el-form-item>
              <el-form-item :label="$t('c_history.picture')">
                <span>{{ scope.row.picture }}</span>
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
            <div v-if="scope.row.invoice_id==='-'">
              <span>
                {{ scope.row.invoice_id }}
              </span>
            </div>
            <div v-else>
              <span>
                {{ scope.row.invoice_id.number }}
              </span>
            </div>
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
      <el-dialog :visible.sync="c_history_visible" :title="$t('c_history.edit')" width="80vw" top="8vh">
        <el-form ref="c_history_edit" :model="c_history_edit" label-position="left" inline class="table_history">
          <el-form-item>
            <span>{{ $t('c_history.notmodify') }}</span>
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item :label="$t('c_history.date')" prop="date">
            <el-date-picker v-model="c_history_edit.date" :placeholder="c_history_date_p" type="date" />
          </el-form-item>
          <el-form-item :label="$t('c_history.receiptnumber')" prop="invoice">
            <el-input v-model="c_history_edit.invoice" :placeholder="c_history_invoice_p" clearable />
          </el-form-item>
          <el-form-item :label="$t('c_history.account')" prop="account">
            <el-select v-model="c_history_edit.account" :placeholder="c_history_account_p" clearable filterable @focus="get_account()" @change="get_account()">
              <el-option v-for="account in c_accountitem" :key="account.id" :label="account.name" :value="account.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="隨機碼" prop="random">
            <el-input v-model="c_history_edit.random" :placeholder="c_history_random_p" clearable />
          </el-form-item>
          <el-form-item label="專案" prop="project">
            <el-select v-model="c_history_edit.project" :placeholder="c_history_project_p" clearable filterable @focus="get_project()" @change="get_project()">
              <el-option v-for="project in c_projectitem" :key="project.id" :label="project.name" :value="project.id" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('c_history.money')" prop="amount">
            <el-input v-model="c_history_edit.amount" :placeholder="c_history_amount_p" clearable />
          </el-form-item>
          <el-form-item label="備註" prop="comment">
            <el-input v-model="c_history_edit.comment" :placeholder="c_history_comment_p" clearable />
          </el-form-item>
          <hr>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item :label="$t('c_history.incomespend')" prop="payorin">
            <el-select v-model="c_history_edit.payorin" :placeholder="$t('c_history.incomespend')" style="width: 25vw;max-width:7.5rem;min-width:6.5rem;" @change="get_confi_sort()">
              <el-option v-for="payorin in c_pay_in" :key="payorin.value" :label="payorin.label" :value="payorin.value" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('c_history.mainsort')" prop="sort">
            <el-select v-model="c_history_edit.sort" :disabled="c_sort_disable" :placeholder="$t('c_history.mainsort')" clearable filterable style="width: 25vw;max-width:7.5rem;min-width:6.5rem;" @focus="get_confi_sort()" @change="get_confi_subsort()">
              <el-option v-for="sort in c_confi_sort_payorinitem" :key="sort.id" :label="sort.name" :value="sort.id" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('c_history.subclass')" prop="subsort">
            <el-select v-model="c_history_edit.subsort" :disabled="c_confi_subsort_disable" :placeholder="$t('c_history.subclass')" clearable filterable style="width: 25vw;max-width:7.5rem;min-width:6.5rem;">
              <el-option v-for="subsort in c_confi_subsort_payorinitem" :key="subsort.id" :label="subsort.name" :value="subsort.id" />
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

import waves from '@/directive/waves' // 水波紋指令
import { getaccounting_all } from '@/api/accounting/getaccounting'
import { getsort_pay, getsort_in } from '@/api/sort/getsort'
import { getsubsort } from '@/api/subsort/getsubsort'
import { getproject } from '@/api/project/getproject'
import { getaccount_all } from '@/api/account/getaccount'
import { patchaccounting_confi, patchaccounting_del } from '@/api/accounting/patchaccounting'
import { postinvoice } from '@/api/invoice/postinvoice'
import { patchinvoice } from '@/api/invoice/patchinvoice'
import { postmemberinvoice } from '@/api/memberinvoice/postmemberinvoice'
import { getToken } from '@/utils/auth'
import { formatdate } from '@/utils/index'

export default {
  name: 'CHistory',
  directives: {
    waves
  },
  data() {
    return {
      globledate: formatdate('yyyy-mm-dd HH:MM:ss.l'),
      startenddate: '',
      c_payorin: '',
      c_sort: '',
      c_subsort: '',
      c_project: '',
      c_account: '',
      c_history_edit:
      {
        id: '',
        date: '',
        invoice: '',
        random: '',
        account: '',
        account_id: '',
        amount: '',
        payorin: '',
        sort: '',
        subsort: '',
        project: '',
        project_id: '',
        comment: ''
      },
      c_history_date_p: '',
      c_history_invoice_p: '',
      c_history_account_p: '',
      c_history_amount_p: '',
      c_history_comment_p: '',
      c_history_project_p: '',
      c_history_random_p: '',
      c_sort_payorinitem: [],
      c_subsort_payorinitem: [],
      c_projectitem: [],
      c_accountitem: [],
      c_confi_sort_payorinitem: [],
      c_confi_subsort_payorinitem: [],
      c_sort_disable: false,
      c_subsort_disable: true,
      c_confi_subsort_disable: true,
      c_history_visible: false,
      c_pay_in: [{ label: '支出', value: 0 }, { label: '收入', value: 1 }],
      c_user_history: [],
      redirect: undefined,
      sent_sort: '',
      sent_subsort: '',
      defineoriinvoice: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    },
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
    },
    'c_history_edit.payorin': {
      handler: function(newc_payorin, oldc_payorin) {
        if (oldc_payorin === 0) {
          this.c_confi_sort_disable = false
        } else if (newc_payorin !== oldc_payorin) {
          this.c_history_edit.sort = ''
          this.c_history_edit.subsort = ''
          this.get_confi_sort()
        }
      }
    },
    'c_history_edit.sort': {
      handler: function(newc_sort, oldc_sort) {
        if (oldc_sort === '') {
          this.c_confi_subsort_disable = false
        } else if (newc_sort !== oldc_sort) {
          this.c_history_edit.subsort = ''
        }
      }
    },
    'c_history_edit.subsort': {
      handler: function(newc_subsort, oldc_subsort) {
        if (oldc_subsort === '') {
          this.c_confi_subsort_disable = false
        } else if (this.c_history_edit.sort === '') {
          this.c_confi_subsort_disable = true
        }
      }
    },
    deep: true
  },
  created() {
    this.get_getaccounting_all()
  },
  methods: {
    get_getaccounting_all() {
      getaccounting_all(getToken()).then((response) => {
        this.c_user_history = []
        this.c_user_history = response.data
        console.log(response.data)
        this.c_user_history.forEach(function(element) {
          if (element.type === false) {
            element.type = '支出'
          } else {
            element.type = '收入'
          }
          if (element.invoice_id === null) {
            element.invoice_id = '-'
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
    get_confi_sort() {
      if (this.c_history_edit.payorin === 0 || this.c_history_edit.payorin === '支出') {
        getsort_pay(getToken()).then(response => {
          this.c_confi_sort_payorinitem = response.data
        }).catch((error) => {
          console.log(error)
        })
      } else {
        getsort_in(getToken()).then(response => {
          this.c_confi_sort_payorinitem = response.data
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    get_confi_subsort() {
      getsubsort(getToken(), this.c_history_edit.sort).then(response => {
        if (this.c_history_edit.sort - 1 < 0) {
          this.c_confi_subsort_disable = true
        } else if (response.data.length !== 0) {
          this.c_confi_subsort_payorinitem = response.data
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
      this.c_history_edit.id = row.id
      this.c_history_edit.date = row.purchasedate
      this.c_history_date_p = row.purchasedate
      this.c_history_edit.invoice = row.invoice_id.number
      this.c_history_invoice_p = row.invoice_id.number
      this.c_history_edit.random = row.invoice_id.randomNumber
      this.c_history_random_p = row.invoice_id.randomNumber
      this.c_history_edit.account = row.account_id.name
      this.c_history_edit.account_id = row.account_id.id
      this.c_history_account_p = row.account_id.name
      this.c_history_edit.amount = row.amount
      this.c_history_amount_p = row.amount
      this.c_history_project_p = row.project_id.name
      this.c_history_edit.project = row.project_id.name
      this.c_history_edit.project_id = row.project_id.id
      this.c_history_edit.comment = row.comment
      this.c_history_comment_p = row.comment
      this.c_history_edit.payorin = row.type
      this.c_history_visible = true
      this.sent_sort = row.sort_id.id
      this.sent_subsort = row.subsort_id.id
      this.defineoriinvoice = row.invoice_id
    },
    c_history_confirm() {
      let revalue_payorin
      if (this.c_history_edit.type === '支出' || this.c_history_edit.typw === 0) {
        revalue_payorin = 0
      } else {
        revalue_payorin = 1
      }
      if ((this.c_history_edit.invoice).length > 0 && this.defineoriinvoice === '-') {
        postinvoice(getToken()
          , this.c_history_edit.invoice
          , this.c_history_edit.random
          , this.c_history_edit.amount)
          .then((response) => {
            postmemberinvoice(getToken()
              , response.data.id)
              .then(() => {
                if (this.c_history_edit.sort !== '') {
                  this.sent_sort = this.c_history_edit.sort
                }
                if (this.c_history_edit.subsort !== '') {
                  this.sent_subsort = this.c_history_edit.subsort
                }
                patchaccounting_confi(getToken()
                  , this.c_history_edit.id
                  , this.c_history_edit.date
                  , this.c_history_edit.amount
                  , this.c_history_edit.comment
                  , revalue_payorin
                  , this.sent_sort
                  , this.sent_subsort
                  , this.c_history_edit.account_id
                  , this.c_history_edit.project_id
                  , response.data.id
                  , this.globledate).then(() => {
                  this.$message({
                    type: 'success',
                    message: '已完成該筆資料修改'
                  })
                  this.get_getaccounting_all()
                })
                  .catch((error) => {
                    console.log(error)
                    this.$message({
                      type: 'error',
                      message: '發生一點錯誤，請稍後再做修改'
                    })
                  })
              })
          })
      } else {
        patchinvoice(getToken()
          , this.defineoriinvoice.id
          , this.c_history_edit.invoice
          , this.c_history_edit.random
          , this.globledate)
          .then((response) => {
            patchaccounting_confi(getToken()
              , this.c_history_edit.id
              , this.c_history_edit.date
              , this.c_history_edit.amount
              , this.c_history_edit.comment
              , revalue_payorin
              , this.sent_sort
              , this.sent_subsort
              , this.c_history_edit.account_id
              , this.c_history_edit.project_id
              , response.data.id
              , this.globledate).then(() => {
              this.$message({
                type: 'success',
                message: '已完成該筆資料修改'
              })
              this.get_getaccounting_all()
            })
              .catch((error) => {
                console.log(error)
                this.$message({
                  type: 'error',
                  message: '發生一點錯誤，請稍後再做修改'
                })
              })
          })
      }
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
          let revalue_payorin
          if (this.c_history_edit.type === '支出' || this.c_history_edit.typw === 0) {
            revalue_payorin = 0
          } else {
            revalue_payorin = 1
          }
          patchaccounting_del(getToken()
            , this.c_history_edit.id
            , this.c_history_edit.date
            , this.c_history_edit.amount
            , this.c_history_edit.comment
            , revalue_payorin
            , this.sent_sort
            , this.sent_subsort
            , this.c_history_edit.account_id
            , this.c_history_edit.project_id
            , this.defineoriinvoice.id
            , this.globledate).then(() => {
            this.$message({
              type: 'success',
              message: '刪除成功'
            })
            this.get_getaccounting_all()
          })
            .catch((error) => {
              console.log(error)
              this.$message({
                type: 'error',
                message: '發生一點錯誤，請稍後再做修改'
              })
            })
          this.c_history_visible = false
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
</style>
