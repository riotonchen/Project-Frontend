<template>

  <div class="accounting_container">
    <title>
      {{ $t('route.c_accounting') }}
    </title>
    <div class="table_container">
      <transition name="el-fade-in">
        <el-card v-loading="account_table_load" v-show="account_table_1" element-loading-text="該筆資料送出中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" class="account_table" shadow="always">
          <el-form ref="accounting" :model="c_accountting_add" label-position="left" inline class="table_account_add">
            <el-form-item label="發票日期" prop="date">
              <el-date-picker v-model="c_accountting_add.date" type="date" placeholder="請選擇日期" style="width:20vw;min-width:7.5rem;max-width:15rem;" />
            </el-form-item>
            <el-form-item label="發票號碼" prop="invoice">
              <el-input v-model="c_accountting_add.invoice" placeholder="發票號碼(非必填)" style="width:20vw;min-width:7.5rem;max-width:15rem;" />
            </el-form-item>
            <el-form-item label="隨機碼" prop="randon">
              <el-input v-model="c_accountting_add.randon" :disabled="c_randon_disable" placeholder="隨機碼(非必填)" style="width:20vw;min-width:7.5rem;max-width:15rem;" />
            </el-form-item>
            <el-form-item>
              <span />
            </el-form-item>
            <el-form-item label="帳戶" prop="account">
              <el-select v-model="c_accountting_add.account" placeholder="帳戶" clearable filterable style="width:20vw;min-width:7.5rem;max-width:15rem;" @focus="get_account()" @change="get_account()">
                <el-option v-for="name in c_account_nameitem" :key="name.id" :label="name.name" :value="name.id" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <span />
            </el-form-item>
            <el-form-item label="收支出" prop="payorin">
              <el-select v-model="c_accountting_add.payorin" filterable clearable style="width:20vw;min-width:7.5rem;max-width:15rem;">
                <el-option v-for="payorin in c_pay_in" :key="payorin.value" :label="payorin.label" :value="payorin.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="主分類" prop="sort">
              <el-select v-model="c_accountting_add.sort" :disabled="c_sort_disable" filterable clearable style="width:20vw;min-width:7.5rem;max-width:15rem;" @focus="get_sort()" @change="get_subsort()">
                <el-option v-for="sort in c_sort_payorinitem" :key="sort.id" :label="sort.name" :value="sort.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="子分類" prop="subsort">
              <el-select v-model="c_accountting_add.subsort" :disabled="c_subsort_disable" filterable clearable style="width:20vw;min-width:7.5rem;max-width:15rem;">
                <el-option v-for="subsort in c_subsort_payorinitem" :key="subsort.id" :label="subsort.name" :value="subsort.id" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <span />
            </el-form-item>
            <el-form-item label="專案" prop="project">
              <el-select v-model="c_accountting_add.project" filterable style="width:20vw;min-width:7.5rem;max-width:15rem;" @focus="get_project()" @change="get_project()">
                <el-option v-for="project in c_projectitem" :key="project.id" :label="project.name" :value="project.id" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <span />
            </el-form-item>
            <el-form-item label="金額" prop="amount">
              <el-input v-model="c_accountting_add.amount" placeholder="金額" style="width:20vw;min-width:7.5rem;max-width:15rem;" />
            </el-form-item>
            <el-form-item>
              <span />
            </el-form-item>
            <el-form-item label="備註" prop="comment">
              <el-input v-model="c_accountting_add.comment" placeholder="備註" style="width:20vw;min-width:7.5rem;max-width:15rem;" />
            </el-form-item>
          </el-form>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" class="btn_add" @click.native.prevent="add_new_done()">完成新增</el-button>
              <el-button type="info" plain class="btn_add" @click.native.prevent="add_new()">再新增一筆</el-button>
            </el-col>
          </el-row>
        </el-card>
      </transition>
    </div>
  </div>
</template>
<script>

import { getToken } from '@/utils/auth'
import { getproject } from '@/api/project/getproject'
import { getsort_pay, getsort_in } from '@/api/sort/getsort'
import { getsubsort } from '@/api/subsort/getsubsort'
import { getaccount_all } from '@/api/account/getaccount'
import { postaccounting_niv, postaccounting_yiv } from '@/api/accounting/postaccounting'
import { postinvoice } from '@/api/invoice/postinvoice'
import { postmemberinvoice } from '@/api/memberinvoice/postmemberinvoice'
import { formatdate_inc_time } from '@/utils/index'

export default {
  name: 'CAccounting',

  data() {
    return {
      c_accountting_add: {
        date: null,
        invoice: '',
        randon: '',
        account: null,
        payorin: '',
        sort: '',
        subsort: '',
        project: null,
        amount: null,
        comment: null
      },
      account_table_1: true,
      c_pay_in: [{ label: '支出', value: 0 }, { label: '收入', value: 1 }],
      c_test_payin: [],
      c_sort_payorinitem: [],
      c_subsort_payorinitem: [],
      c_projectitem: [],
      c_account_nameitem: [],
      c_sort_disable: true,
      c_subsort_disable: true,
      c_randon_disable: true,
      account_table_load: false
    }
  },
  watch: {
    'c_accountting_add.payorin': {
      handler: function(new_payorin, old_payorin) {
        if (old_payorin === '') {
          this.c_sort_disable = false
        } else if (new_payorin !== 1 && new_payorin !== 0) {
          this.c_sort_disable = true
          this.c_subsort_disable = true
          this.c_accountting_add.sort = ''
          this.c_accountting_add.subsort = ''
        } else if (new_payorin !== old_payorin) {
          this.c_accountting_add.sort = ''
          this.c_accountting_add.subsort = ''
          this.get_sort()
        }
      }
    },
    'c_accountting_add.sort': {
      handler: function(new_sort, old_sort) {
        if (old_sort === '') {
          this.c_subsort_disable = false
        } else if (new_sort !== old_sort) {
          this.c_accountting_add.subsort = ''
        }
      }
    },
    'c_accountting_add.subsort': {
      handler: function(new_subsort, old_subsort) {
        if (old_subsort === '') {
          this.c_subsort_disable = false
        } else if (this.c_accountting_add.sort === '') {
          this.c_subsort_disable = true
        }
      }
    },
    'c_accountting_add.invoice': {
      handler: function(new_inv, old_inv) {
        if (new_inv.length > 0) {
          this.c_randon_disable = false
        } else {
          this.c_randon_disable = true
        }
      }
    },
    deep: true
  },
  methods: {
    get_project() {
      getproject(getToken())
        .then((response) => {
          this.c_projectitem = response.data
        })
        .catch(() => {
          this.$notify({
            title: '錯誤',
            message: '專案列表取得失敗，請稍後再試',
            type: 'error'
          })
        })
    },
    get_sort() {
      if (this.c_accountting_add.payorin === 0) {
        getsort_pay(getToken()).then((response) => {
          this.c_sort_payorinitem = response.data
        })
      } else {
        getsort_in(getToken()).then((response) => {
          this.c_sort_payorinitem = response.data
        })
      }
    },
    get_subsort() {
      getsubsort(getToken(), this.c_accountting_add.sort).then(response => {
        if (response.data.length !== 0) {
          this.c_subsort_payorinitem = response.data
        } else {
          this.c_subsort_disable = true
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    get_account() {
      getaccount_all(getToken())
        .then((response) => {
          this.c_account_nameitem = response.data
        })
    },
    clean_form(refname) {
      this.$refs[refname].resetFields()
    },
    add_new_done() {
      this.add_new()
      setTimeout(() => {
        this.$router.push({ path: this.redirect || '/history' })
      }, 2000)
    },
    add_new() {
      this.account_table_load = true
      if ((this.c_accountting_add.invoice).length < 1) {
        setTimeout(() => {
          postaccounting_niv(getToken()
            , formatdate_inc_time(this.c_accountting_add.date, 'yyyy-mm-dd')
            , this.c_accountting_add.payorin
            , this.c_accountting_add.amount
            , this.c_accountting_add.comment
            , this.c_accountting_add.sort
            , this.c_accountting_add.subsort
            , this.c_accountting_add.account
            , this.c_accountting_add.project)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '該筆帳務已記錄成功',
                type: 'success',
                duration: 3500,
                showClose: false
              })
              this.account_table_load = false
              this.clean_form('accounting')
            })
            .catch(() => {
              this.$notify.error({
                title: '失敗',
                message: '該筆帳務記錄失敗，請稍後在試一次',
                duration: 3500,
                showClose: false
              })
              this.account_table_load = false
            })
        }, 1000)
      } else {
        setTimeout(() => {
          postinvoice(getToken()
            , this.c_accountting_add.invoice
            , this.c_accountting_add.randon
            , this.c_accountting_add.amount)
            .then((response) => {
              postmemberinvoice(getToken(), response.data.id)
                .then(() => {
                  postaccounting_yiv(getToken()
                    , formatdate_inc_time(this.c_accountting_add.date, 'yyyy-mm-dd')
                    , this.c_accountting_add.payorin
                    , this.c_accountting_add.amount
                    , this.c_accountting_add.comment
                    , this.c_accountting_add.sort
                    , this.c_accountting_add.subsort
                    , this.c_accountting_add.account
                    , this.c_accountting_add.project
                    , response.data.id)
                    .then(() => {
                      this.$notify({
                        title: '成功',
                        message: '該筆帳務已記錄成功',
                        type: 'success',
                        duration: 3500,
                        showClose: false
                      })
                      this.account_table_load = false
                      this.clean_form('accounting')
                    })
                    .catch(() => {
                      this.$notify.error({
                        title: '失敗',
                        message: '該筆帳務記錄失敗，請稍後在試一次',
                        duration: 3500,
                        showClose: false
                      })
                      this.account_table_load = false
                    })
                })
                .catch(() => {
                  this.$notify.error({
                    title: '失敗',
                    message: '該筆帳務記錄失敗，請稍後在試一次',
                    duration: 3500,
                    showClose: false
                  })
                  this.account_table_load = false
                })
            })
            .catch(() => {
              this.$notify.error({
                title: '失敗',
                message: '該筆帳務記錄失敗，請稍後在試一次',
                duration: 3500,
                showClose: false
              })
              this.account_table_load = false
            })
        }, 1000)
      }
    }
  }
}
</script>
<style lang="scss">
.table_container {
  width: 90vw;
  padding-top: 4vh;
  padding-left: 8.5vw;
}
.account_table {
  float: left;
  display: flex;
}
.btn_add {
  float: right;
  margin: 10px;
}
.table_account_add {
  font-size: 0;
  padding-top: 2vh;
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
</style>

