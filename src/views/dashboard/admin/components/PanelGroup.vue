<template>
  <div>

    <el-row
      :gutter="40"
      class="panel-group"
    >
      <el-col
        :xs="24"
        :sm="8"
        :lg="8"
        class="card-panel-col"
      >
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon
              icon-class="peoples"
              class-name="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">會員總人數</div>
            <count-to
              :start-val="0"
              :end-val="c_user_y_history_in"
              :duration="3500"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="8"
        :lg="8"
        class="card-panel-col"
      >
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon
              icon-class="message"
              class-name="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">普通會員人數</div>
            <count-to
              :start-val="0"
              :end-val="c_user_y_history_pay"
              :duration="3500"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="8"
        :lg="8"
        class="card-panel-col"
      >
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon
              icon-class="message"
              class-name="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">商家會員人數</div>
            <count-to
              :start-val="0"
              :end-val="c_user_y_history_balance"
              :duration="3500"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
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
      c_user_m_history: [],
      c_user_m_history_pay: [],
      c_user_m_history_in: [],
      c_user_y_history: [],
      c_user_y_history_pay: [],
      c_user_y_history_in: [],
      c_category_m_list: [],
      c_user_y_history_balance: ''
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
      getaccount_all(getToken()).then(res_month => {
        this.account_all_data = res_month.data
        this.account_all_balance = this.account_all_data.reduce(function(
          accumulator,
          currentValue
        ) {
          return accumulator + currentValue.balance
        },
        0)
      })
    },
    get_getaccounting_all() {
      const date = new Date()
      const startmonth = new Date(date.getFullYear(), date.getMonth(), 1)
      const endmonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      const startyear = new Date(date.getFullYear(), 0, 1)
      const endyear = new Date(date.getFullYear(), 12, 0)
      this.c_user_history = []
      getaccounting_all(
        getToken(),
        formatdate_inc_time(startmonth, 'yyyy-mm-dd'),
        formatdate_inc_time(endmonth, 'yyyy-mm-dd')
      ).then(res_month => {
        getaccounting_all(
          getToken(),
          formatdate_inc_time(startyear, 'yyyy-mm-dd'),
          formatdate_inc_time(endyear, 'yyyy-mm-dd')
        ).then(res_year => {
          this.c_user_y_history = res_year.data
          this.c_user_y_history.forEach(items => {
            if (items.type === false) {
              items.type = '支出'
            } else {
              items.type = '收入'
            }
            if (items.invoice_id === null || items.invoice_id === undefined) {
              items.invoice_id = '-'
            }
          })
          this.c_user_y_history_pay = this.c_user_y_history.filter(function(
            item
          ) {
            return item.type === '支出'
          })

          this.c_user_y_history_pay = this.c_user_y_history_pay.reduce(function(
            accumulator,
            currentValue
          ) {
            return accumulator + currentValue.amount
          },
          0)
          this.c_user_y_history_in = this.c_user_y_history.filter(function(
            item
          ) {
            return item.type === '收入'
          })
          this.c_user_y_history_in = this.c_user_y_history_in.reduce(function(
            accumulator,
            currentValue
          ) {
            return accumulator + currentValue.amount
          },
          0)
          this.c_user_y_history_balance =
            this.c_user_y_history_in - this.c_user_y_history_pay

          this.c_user_m_history = res_month.data
          this.c_user_m_history.forEach(items => {
            if (items.type === false) {
              items.type = '支出'
            } else {
              items.type = '收入'
            }
            if (items.invoice_id === null || items.invoice_id === undefined) {
              items.invoice_id = '-'
            }
          })
          this.c_user_m_history_pay = this.c_user_m_history.filter(function(
            item
          ) {
            return item.type === '支出'
          })

          this.c_user_m_history_pay = this.c_user_m_history_pay.reduce(function(
            accumulator,
            currentValue
          ) {
            return accumulator + currentValue.amount
          },
          0)
          this.c_user_m_history_in = this.c_user_m_history.filter(function(
            item
          ) {
            return item.type === '收入'
          })
          this.c_user_m_history_in = this.c_user_m_history_in.reduce(function(
            accumulator,
            currentValue
          ) {
            return accumulator + currentValue.amount
          },
          0)
        })
      })
    },
    get_getproject_all() {
      this.c_category_m_list = []
      const date = new Date()
      const startmonth = new Date(date.getFullYear(), date.getMonth(), 1)
      getsortbudget_all(
        getToken(),
        formatdate_inc_time(startmonth, 'yyyy'),
        formatdate_inc_time(startmonth, 'mm')
      ).then(res_month => {
        this.c_category_m_list = res_month.data
        this.c_category_m_list = this.c_category_m_list.reduce(function(
          accumulator,
          currentValue
        ) {
          return accumulator + currentValue.balance
        },
        0)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 1vh;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 6.75rem;
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
        text-align: right;
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 15px;
      }
      .card-panel-num {
        float: right;
        font-size: 20px;
      }
    }
  }
}
</style>
