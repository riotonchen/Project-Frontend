<template>

  <div class="app-container">
    <title>
      {{ $t('route.c_accounting') }}
    </title>
    <div class="table_container">
      <transition name="el-fade-in">
        <el-card v-loading="account_table_load" v-show="account_table" element-loading-text="該筆資料送出中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" class="account_table" shadow="always">
          <el-form ref="accounting" :model="c_accountting_add" :rules="accounting_rules" validate-on-rule-change hide-required-asterisk label-position="left" inline class="table_account_add">
            <el-form-item :label="$t('c_accounting.date')" prop="date">
              <el-date-picker v-model="c_accountting_add.date" :placeholder="$t('c_accounting.selectdate')" type="date" style="width:20vw;min-width:7.5rem;max-width:15rem;" />
            </el-form-item>
            <el-form-item :label="$t('c_accounting.invoice')" prop="invoice">
              <el-input v-model="c_accountting_add.invoice" :placeholder="$t('c_accounting.invoicenumber')" style="width:20vw;min-width:7.5rem;max-width:15rem;" />
            </el-form-item>
            <el-form-item :label="$t('c_accounting.account')" prop="account">
              <el-select v-model="c_accountting_add.account" :placeholder="$t('c_accounting.account')" clearable filterable style="width:20vw;min-width:7.5rem;max-width:15rem;" @focus="get_account()" @change="get_account()">
                <el-option v-for="name in c_account_nameitem" :key="name.id" :label="name.name" :value="name.id" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('c_accounting.randon')" prop="randon">
              <el-input v-model="c_accountting_add.randon" :disabled="c_randon_disable" :placeholder="$t('c_accounting.randon')" style="width:20vw;min-width:7.5rem;max-width:15rem;" />
            </el-form-item>
            <el-form-item :label="$t('c_accounting.payorin')" prop="payorin">
              <el-select v-model="c_accountting_add.payorin" filterable clearable style="width:20vw;min-width:7.5rem;max-width:15rem;" @focus="clean_payorin()">
                <el-option v-for="payorin in c_pay_in" :key="payorin.value" :label="payorin.label" :value="payorin.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('c_accounting.remark')" prop="comment">
              <el-input v-model="c_accountting_add.comment" :placeholder="$t('c_accounting.remark')" style="width:20vw;min-width:7.5rem;max-width:15rem;" />
            </el-form-item>
            <el-form-item :label="$t('c_accounting.class')" prop="sort">
              <el-select v-model="c_accountting_add.sort" :disabled="c_sort_disable" filterable clearable style="width:20vw;min-width:7.5rem;max-width:15rem;" @focus="get_sort()" @change="get_subsort()">
                <el-option v-for="sort in c_sort_payorinitem" :key="sort.id" :label="sort.name" :value="sort.id" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <span />
            </el-form-item>
            <el-form-item :label="$t('c_accounting.subsort')" prop="subsort">
              <el-select v-model="c_accountting_add.subsort" :disabled="c_subsort_disable" filterable clearable style="width:20vw;min-width:7.5rem;max-width:15rem;">
                <el-option v-for="subsort in c_subsort_payorinitem" :key="subsort.id" :label="subsort.name" :value="subsort.id" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <span />
            </el-form-item>
            <el-form-item :label="$t('c_accounting.project')" prop="project">
              <el-select v-model="c_accountting_add.project" filterable style="width:20vw;min-width:7.5rem;max-width:15rem;" @focus="get_project()" @change="get_project()">
                <el-option v-for="project in c_projectitem" :key="project.id" :label="project.name" :value="project.id" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <span />
            </el-form-item>
            <el-form-item :label="$t('c_accounting.money')" prop="amount">
              <el-input v-model="c_accountting_add.amount" :placeholder="$t('c_accounting.money')" style="width:20vw;min-width:7.5rem;max-width:15rem;" />
            </el-form-item>
            <el-form-item>
              <span />
            </el-form-item>
          </el-form>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" class="btn_add" @click.native.prevent="add_new_done()">{{ $t('c_accounting.finish') }}</el-button>
              <el-button type="info" plain class="btn_add" @click.native.prevent="add_new()">{{ $t('c_accounting.add') }}</el-button>
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
import { getaccount_all, getaccountsingledata } from '@/api/account/getaccount'
import { postaccounting_niv, postaccounting_yiv } from '@/api/accounting/postaccounting'
import { postinvoice } from '@/api/invoice/postinvoice'
import { postmemberinvoice } from '@/api/memberinvoice/postmemberinvoice'
import { patchaccount_modify } from '@/api/account/patchaccount'
import { formatdate_inc_time } from '@/utils/index'
import { validinvoice, validnum4, validdouble } from '@/utils/validate'
import { formatdate } from '@/utils/index'

export default {
  name: 'CAccounting',

  data() {
    const valid_date = (rule, value, callback) => {
      if (value === '' || value === null) {
        return callback(new Error('日期不能為空'))
      } else {
        callback()
      }
    }
    const valid_invoice = (rule, value, callback) => {
      if (value.length < 1) {
        callback()
      } else if (!validinvoice(value)) {
        return callback(new Error('發票格式為AA00000000'))
      } else {
        callback()
      }
    }
    const valid_randon = (rule, value, callback) => {
      if (value.length < 1 && (this.c_accountting_add.invoice).length > 1) {
        return callback(new Error('隨機碼不能為空'))
      } else if (!validnum4(value) && (this.c_accountting_add.invoice).length > 1) {
        return callback(new Error('隨機碼只有數字4位'))
      } else {
        callback()
      }
    }
    const valid_account = (rule, value, callback) => {
      if (value === '' || value === null) {
        return callback(new Error('帳戶不能為空'))
      } else {
        callback()
      }
    }
    const valid_payorin = (rule, value, callback) => {
      if (value === '' || value === null) {
        return callback(new Error('收支出不能為空'))
      } else {
        callback()
      }
    }
    const valid_sort = (rule, value, callback) => {
      if (value === '' || value === null) {
        return callback(new Error('主分類不能為空'))
      } else {
        callback()
      }
    }
    const valid_subsort = (rule, value, callback) => {
      if (value === '' || value === null) {
        return callback(new Error('子分類不能為空'))
      } else {
        callback()
      }
    }
    const valid_project = (rule, value, callback) => {
      if (value === '' || value === null) {
        return callback(new Error('專案不能為空'))
      } else {
        callback()
      }
    }
    const valid_amount = (rule, value, callback) => {
      if (!validdouble(value)) {
        return callback(new Error('金額只有數字(可有小數點)'))
      } else {
        callback()
      }
    }
    const valid_comment = (rule, value, callback) => {
      if (value.length > 64) {
        return callback(new Error('最多只能輸入64個字'))
      } else {
        callback()
      }
    }
    return {
      globledate: formatdate('yyyy-mm-dd HH:MM:ss.l'),
      accounting_rules: {
        date: [{ required: true, trigger: 'change', validator: valid_date }],
        invoice: [{ required: false, trigger: 'change', validator: valid_invoice }],
        randon: [{ required: false, trigger: 'change', validator: valid_randon }],
        account: [{ required: true, trigger: 'change', validator: valid_account }],
        payorin: [{ required: true, trigger: 'change', validator: valid_payorin }],
        sort: [{ required: true, trigger: 'change', validator: valid_sort }],
        subsort: [{ required: true, trigger: 'change', validator: valid_subsort }],
        project: [{ required: true, trigger: 'change', validator: valid_project }],
        amount: [{ required: true, trigger: 'change', validator: valid_amount }],
        comment: [{ required: false, trigger: 'change', validator: valid_comment }]
      },
      c_accountting_add: {
        date: formatdate('yyyy-mm-dd'),
        invoice: '',
        randon: '',
        account: '',
        payorin: 0,
        sort: '',
        subsort: '',
        project: '',
        amount: '',
        comment: ''
      },
      account_table: true,
      c_pay_in: [{ label: '支出', value: 0 }, { label: '收入', value: 1 }],
      c_test_payin: [],
      c_sort_payorinitem: [],
      c_subsort_payorinitem: [],
      c_projectitem: [],
      c_account_nameitem: [],
      c_account_ori_amount: '',
      c_sort_disable: false,
      c_subsort_disable: true,
      c_randon_disable: true,
      account_table_load: false,
      redirect: undefined

    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    },
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
    clean_payorin() {
      this.c_accountting_add.payorin = ''
    },
    get_project() {
      getproject(getToken())
        .then((response) => {
          this.c_projectitem = response.data
        })
        .catch((error) => {
          console.log(error)
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
      this.$refs.accounting.validate(valid => {
        if (valid) {
          setTimeout(() => {
            this.$router.push({ path: this.redirect || '/history' })
          }, 2000)
        }
      })
    },
    add_new() {
      this.$refs.accounting.validate(valid => {
        if (valid) {
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
                  getaccountsingledata(getToken(), this.c_accountting_add.account)
                    .then((response) => {
                      this.c_account_ori_amount = response.data.balance
                      let send_amount
                      if (this.c_accountting_add.payorin === 0) {
                        send_amount = Number(this.c_account_ori_amount) - Number(this.c_accountting_add.amount)
                      } else {
                        send_amount = Number(this.c_account_ori_amount) + Number(this.c_accountting_add.amount)
                      }
                      patchaccount_modify(getToken()
                        , this.c_accountting_add.account
                        , response.data.name
                        , send_amount
                        , this.globledate)
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
                        })
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
                          getaccountsingledata(getToken(), this.c_accountting_add.account)
                            .then((response) => {
                              this.c_account_ori_amount = response.data.balance
                              let send_amount
                              if (this.c_accountting_add.payorin === 0) {
                                send_amount = Number(this.c_account_ori_amount) - Number(this.c_accountting_add.amount)
                              } else {
                                send_amount = Number(this.c_account_ori_amount) + Number(this.c_accountting_add.amount)
                              }
                              patchaccount_modify(getToken()
                                , this.c_accountting_add.account
                                , response.data.name
                                , send_amount
                                , this.globledate)
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
                                })
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
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.table_container {
  width: 80%;
  margin: 10vh 10vw;
}
.btn_add {
  float: right;
  margin-right: 1%;
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
</style>

