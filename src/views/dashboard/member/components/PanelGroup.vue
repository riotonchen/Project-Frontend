<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="showallbalance()">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">總資產</div>
          <count-to :start-val="0" :end-val="account_all_balance" :duration="4500" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">本月收入</div>
          <count-to :start-val="0" :end-val="c_user_history_in" :duration="4500" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">本月支出</div>
          <count-to :start-val="0" :end-val="c_user_history_pay" :duration="4500" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">本月預算餘額</div>
          <count-to :start-val="0" :end-val="c_category_list" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { getToken } from '@/utils/auth'
import { getaccount_all } from '@/api/account/getaccount'
import { getaccounting_all } from '@/api/accounting/getaccounting'
import { getsortbudget_all } from '@/api/sortbudget/getsortbudget'
import { formatdate_inc_time } from '@/utils/index'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      account_all_data: [],
      account_all_balance: [],
      c_user_history: [],
      c_user_history_pay: [],
      c_user_history_in: [],
      c_category_list: []
    }
  },
  created() {
    this.getaccount_all_data()
    this.get_getaccounting_all()
    this.get_getproject_all()
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    getaccount_all_data() {
      getaccount_all(getToken()).then((res) => {
        this.account_all_data = res.data
        this.account_all_balance = this.account_all_data.reduce(function(accumulator, currentValue) {
          return accumulator + currentValue.balance
        }, 0)
      })
    },
    get_getaccounting_all() {
      const date = new Date()
      const startdate = new Date(date.getFullYear(), date.getMonth(), 1)
      const enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      let payinval
      this.c_user_history = []
      getaccounting_all(getToken()
        , formatdate_inc_time(startdate, 'yyyy-mm-dd')
        , formatdate_inc_time(enddate, 'yyyy-mm-dd')
        , payinval, this.c_sort, this.c_subsort, this.c_project, this.c_account)
        .then((res) => {
          this.c_user_history = res.data
          this.c_user_history.forEach(items => {
            if (items.type === false) {
              items.type = '支出'
            } else {
              items.type = '收入'
            }
            if (items.invoice_id === null || items.invoice_id === undefined) {
              items.invoice_id = '-'
            }
          })
          this.c_user_history_pay = this.c_user_history.filter(function(item) {
            return item.type === '支出'
          })

          this.c_user_history_pay = this.c_user_history_pay.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue.amount
          }, 0)
          this.c_user_history_in = this.c_user_history.filter(function(item) {
            return item.type === '收入'
          })
          this.c_user_history_in = this.c_user_history_in.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue.amount
          }, 0)
        })
    },
    get_getproject_all() {
      this.c_category_list = []
      const date = new Date()
      const startdate = new Date(date.getFullYear(), date.getMonth(), 1)
      getsortbudget_all(getToken()
        , formatdate_inc_time(startdate, 'yyyy')
        , formatdate_inc_time(startdate, 'mm'))
        .then((res) => {
          this.c_category_list = res.data
          this.c_category_list = this.c_category_list.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue.balance
          }, 0)
        })
    },
    showallbalance() {
      const h = this.$createElement
      this.$notify({
        title: '通知',
        message: h('b', { style: 'color: teal' }, '總資產目前無圖表可顯示')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 5px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
