<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <!--<panel-group @handleSetLineChartData="handleSetLineChartData" />-->
    <!--style="background:#fff;padding:1rem 1rem 0;margin-bottom:2rem;"-->
    <el-row :gutter="40">
      <el-col>
        <div class="chart-wrapper">
          <YLineChart :chart-data="lineChartData" />
        </div>
      </el-col>
      <el-col>
        <div class="chart-wrapper">
          <MLineChart :chart-data="lineChartData" />
        </div>
      </el-col>
    </el-row>
    <!--
    <el-row :gutter="40">
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
      >
        <div class="chart-wrapper">
          <YStackLine :chart-data="lineChartData" />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
      >
        <div class="chart-wrapper">
          <MStackLine :chart-data="lineChartData" />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
      >
        <div class="chart-wrapper">
          <YINPie :chart-data="lineChartData" />
        </div>
      </el-col>

      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
      >
        <div class="chart-wrapper">
          <YPAYPie :chart-data="lineChartData" />
        </div>
      </el-col>

    </el-row>
-->
  </div>
</template>

<script>
import { getToken } from '@/utils/auth';
import { formatdate_inc_time } from '@/utils/index';
import store from '../../../store';
import { getentinfomations } from '@/api/infomations/getinfomations';
import { getUserInfo } from '@/api/login';
import { getentprofile } from '@/api/ent-profile/getentprofile';

import PanelGroup from './components/PanelGroup';

import TransactionTable from './components/TransactionTable';

import YLineChart from './components/YLineChart';
import MLineChart from './components/MLineChart';
import YStackLine from './components/YStackLine';
import MStackLine from './components/MStackLine';
import YINPie from './components/YINPie';
import YPAYPie from './components/YPAYPie';

export default {
  name: 'DashboardMember',
  components: {
    PanelGroup,
    MLineChart,
    YLineChart,
    YStackLine,
    MStackLine,
    YINPie,
    YPAYPie,
    TransactionTable
  },
  data() {
    return {
      lineChartData: {
        ypromotion: [],
        mpromotion: []
      }
    }
  },
  created() {
    this.pushcheckstatus()
  },
  methods: {
    pushcheckstatus() {
      var jwtDecode = require('jwt-decode')
      var decoded = jwtDecode(getToken())
      var user_id = decoded.status
      if (user_id === 0) {
        this.$router.push({ path: this.redirect || '/check_status' })
      } else {
        this.get_promotion_m()
        this.get_promotion_all_y()
      }
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    get_promotion_m() {
      const startform = new Date()
      const enddateform = new Date()
      startform.setMonth(startform.getMonth() + 3)
      startform.setDate(1)
      enddateform.setMonth(enddateform.getMonth() + 4)
      enddateform.setDate(0)
      const mnows7 = formatdate_inc_time(startform, 'yyyy-mm-dd')
      const mnowe7 = formatdate_inc_time(enddateform, 'yyyy-mm-dd')
      startform.setMonth(startform.getMonth() - 1)
      startform.setDate(1)
      enddateform.setMonth(enddateform.getMonth() - 1)
      enddateform.setDate(0)
      const mnows6 = formatdate_inc_time(startform, 'yyyy-mm-dd')
      const mnowe6 = formatdate_inc_time(enddateform, 'yyyy-mm-dd')
      startform.setMonth(startform.getMonth() - 1)
      startform.setDate(1)
      enddateform.setMonth(enddateform.getMonth())
      enddateform.setDate(0)
      const mnows5 = formatdate_inc_time(startform, 'yyyy-mm-dd')
      const mnowe5 = formatdate_inc_time(enddateform, 'yyyy-mm-dd')
      startform.setMonth(startform.getMonth() - 1)
      startform.setDate(1)
      enddateform.setMonth(enddateform.getMonth())
      enddateform.setDate(0)
      const mnows4 = formatdate_inc_time(startform, 'yyyy-mm-dd')
      const mnowe4 = formatdate_inc_time(enddateform, 'yyyy-mm-dd')
      startform.setMonth(startform.getMonth() - 1)
      startform.setDate(1)
      enddateform.setMonth(enddateform.getMonth())
      enddateform.setDate(0)
      const mnows3 = formatdate_inc_time(startform, 'yyyy-mm-dd')
      const mnowe3 = formatdate_inc_time(enddateform, 'yyyy-mm-dd')
      startform.setMonth(startform.getMonth() - 1)
      startform.setDate(1)
      enddateform.setMonth(enddateform.getMonth())
      enddateform.setDate(0)
      const mnows2 = formatdate_inc_time(startform, 'yyyy-mm-dd')
      const mnowe2 = formatdate_inc_time(enddateform, 'yyyy-mm-dd')
      startform.setMonth(startform.getMonth() - 1)
      startform.setDate(1)
      enddateform.setMonth(enddateform.getMonth())
      enddateform.setDate(0)
      const mnows1 = formatdate_inc_time(startform, 'yyyy-mm-dd')
      const mnowe1 = formatdate_inc_time(enddateform, 'yyyy-mm-dd')

      getUserInfo(getToken()).then(res => {
        getentprofile(getToken(), res.data.account).then(res => {
          const store_id = res.data[0].store_id
          getentinfomations(getToken(), store_id, mnows1, mnowe1).then(res => {
            this.lineChartData.mpromotion.push(res.data.length)
            getentinfomations(getToken(), store_id, mnows2, mnowe2).then(
              res => {
                this.lineChartData.mpromotion.push(res.data.length)
                getentinfomations(getToken(), store_id, mnows3, mnowe3).then(
                  res => {
                    this.lineChartData.mpromotion.push(res.data.length)
                    getentinfomations(
                      getToken(),
                      store_id,
                      mnows4,
                      mnowe4
                    ).then(res => {
                      this.lineChartData.mpromotion.push(res.data.length)
                      getentinfomations(
                        getToken(),
                        store_id,
                        mnows5,
                        mnowe5
                      ).then(res => {
                        this.lineChartData.mpromotion.push(res.data.length)
                        getentinfomations(
                          getToken(),
                          store_id,
                          mnows6,
                          mnowe6
                        ).then(res => {
                          this.lineChartData.mpromotion.push(res.data.length)
                          getentinfomations(
                            getToken(),
                            store_id,
                            mnows7,
                            mnowe7
                          ).then(res => {
                            this.lineChartData.mpromotion.push(res.data.length)
                          })
                        })
                      })
                    })
                  }
                )
              }
            )
          })
        })
      })
    },
    get_promotion_all_y() {
      // ynows4,ynowe4 為中間值
      const startfory = new Date()
      const enddatefory = new Date()
      startfory.setYear(startfory.getFullYear() + 3)
      startfory.setMonth(0)
      startfory.setDate(1)
      enddatefory.setYear(startfory.getFullYear())
      enddatefory.setMonth(12)
      enddatefory.setDate(1)
      const ynows7 = formatdate_inc_time(startfory, 'yyyy-mm-dd')
      const ynowe7 = formatdate_inc_time(
        enddatefory.setDate(enddatefory.getDate() - 1),
        'yyyy-mm-dd'
      )
      startfory.setYear(startfory.getFullYear() - 1)
      enddatefory.setYear(startfory.getFullYear())
      const ynows6 = formatdate_inc_time(startfory, 'yyyy-mm-dd')
      const ynowe6 = formatdate_inc_time(
        enddatefory.setDate(enddatefory.getDate()),
        'yyyy-mm-dd'
      )
      startfory.setYear(startfory.getFullYear() - 1)
      enddatefory.setYear(startfory.getFullYear())
      const ynows5 = formatdate_inc_time(startfory, 'yyyy-mm-dd')
      const ynowe5 = formatdate_inc_time(
        enddatefory.setDate(enddatefory.getDate()),
        'yyyy-mm-dd'
      )
      startfory.setYear(startfory.getFullYear() - 1)
      enddatefory.setYear(startfory.getFullYear())
      const ynows4 = formatdate_inc_time(startfory, 'yyyy-mm-dd')
      const ynowe4 = formatdate_inc_time(
        enddatefory.setDate(enddatefory.getDate()),
        'yyyy-mm-dd'
      )
      startfory.setYear(startfory.getFullYear() - 1)
      enddatefory.setYear(startfory.getFullYear())
      const ynows3 = formatdate_inc_time(startfory, 'yyyy-mm-dd')
      const ynowe3 = formatdate_inc_time(
        enddatefory.setDate(enddatefory.getDate()),
        'yyyy-mm-dd'
      )
      startfory.setYear(startfory.getFullYear() - 1)
      enddatefory.setYear(startfory.getFullYear())
      const ynows2 = formatdate_inc_time(startfory, 'yyyy-mm-dd')
      const ynowe2 = formatdate_inc_time(
        enddatefory.setDate(enddatefory.getDate()),
        'yyyy-mm-dd'
      )
      startfory.setYear(startfory.getFullYear() - 1)
      enddatefory.setYear(startfory.getFullYear())
      const ynows1 = formatdate_inc_time(startfory, 'yyyy-mm-dd')
      const ynowe1 = formatdate_inc_time(
        enddatefory.setDate(enddatefory.getDate()),
        'yyyy-mm-dd'
      )

      getUserInfo(getToken()).then(res => {
        getentprofile(getToken(), res.data.account).then(res => {
          const store_id = res.data[0].store_id
          getentinfomations(getToken(), store_id, ynows1, ynowe1).then(res => {
            this.lineChartData.ypromotion.push(res.data.length)
            getentinfomations(getToken(), store_id, ynows2, ynowe2).then(
              res => {
                this.lineChartData.ypromotion.push(res.data.length)
                getentinfomations(getToken(), store_id, ynows3, ynowe3).then(
                  res => {
                    this.lineChartData.ypromotion.push(res.data.length)
                    getentinfomations(
                      getToken(),
                      store_id,
                      ynows4,
                      ynowe4
                    ).then(res => {
                      this.lineChartData.ypromotion.push(res.data.length)
                      getentinfomations(
                        getToken(),
                        store_id,
                        ynows5,
                        ynowe5
                      ).then(res => {
                        this.lineChartData.ypromotion.push(res.data.length)
                        getentinfomations(
                          getToken(),
                          store_id,
                          ynows6,
                          ynowe6
                        ).then(res => {
                          this.lineChartData.ypromotion.push(res.data.length)
                          getentinfomations(
                            getToken(),
                            store_id,
                            ynows7,
                            ynowe7
                          ).then(res => {
                            this.lineChartData.ypromotion.push(res.data.length)
                          })
                        })
                      })
                    })
                  }
                )
              }
            )
          })
        })
      })
    }
  }
}
</script>

<style lang="scss">
.chart-wrapper .chart {
  width: 100% !important;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 2rem;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 1rem 1rem 0;
    margin-bottom: 2rem;
  }
}
.panel-group {
  .card-panel-col {
    margin-bottom: 2rem;
  }
  .card-panel {
    height: 6.3125rem;
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
      padding: 1rem;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      //float: left;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        text-align: center;
        //padding-top: 0.3rem;
        padding-left: 2rem;
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 1rem;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
