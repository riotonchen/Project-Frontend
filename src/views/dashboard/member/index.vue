<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <!--<panel-group @handleSetLineChartData="handleSetLineChartData" />-->
    <!--style="background:#fff;padding:1rem 1rem 0;margin-bottom:2rem;"-->
    <el-row :gutter="40">
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
      >
        <div class="chart-wrapper">
          <YLineChart :chart-data="lineChartData" />
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
          <MLineChart :chart-data="lineChartData" />
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

    <el-row>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 24}"
        :xl="{span: 24}"
        style="margin-bottom:30px;"
      >
        <transaction-table />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup';

import TransactionTable from './components/TransactionTable';

import YLineChart from './components/YLineChart';
import MLineChart from './components/MLineChart';
import YStackLine from './components/YStackLine';
import MStackLine from './components/MStackLine';
import YINPie from './components/YINPie';
import YPAYPie from './components/YPAYPie';
import { getaccounting_all } from '@/api/accounting/getaccounting';
import { getToken } from '@/utils/auth';
import { formatdate_inc_time } from '@/utils/index';

const lineChartData = {
  messages: {
    paydata: [130, 140, 50, 142, 70, 150, 160],
    indata: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    paydata: [80, 100, 121, 104, 105, 90, 100],
    indata: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    paydata: [130, 140, 141, 142, 145, 150, 160],
    indata: [120, 82, 91, 154, 162, 140, 130]
  }
}

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
        paydata: [],
        indata: []
      }
    }
  },
  created() {
    this.get_account_all()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    showYLinecahrt() {
      setTimeout(() => {
        this.YLineChartshow = true
      }, 300)

      this.MLineChartshow = false
    },
    showMLinecahrt() {
      setTimeout(() => {
        this.MLineChartshow = true
      }, 300)
      this.YLineChartshow = false
    },
    get_account_all() {
      // ynows4,ynowe4 為中間值
      const ypaydata = []
      const yindata = []
      const start = new Date()
      const enddate = new Date()
      start.setYear(start.getFullYear() + 3)
      start.setMonth(0)
      start.setDate(1)
      enddate.setYear(start.getFullYear())
      enddate.setMonth(12)
      enddate.setDate(1)
      const ynows7 = formatdate_inc_time(start, 'yyyy-mm-dd')
      const ynowe7 = formatdate_inc_time(
        enddate.setDate(enddate.getDate() - 1),
        'yyyy-mm-dd'
      )
      start.setYear(start.getFullYear() - 1)
      enddate.setYear(start.getFullYear())
      const ynows6 = formatdate_inc_time(start, 'yyyy-mm-dd')
      const ynowe6 = formatdate_inc_time(
        enddate.setDate(enddate.getDate()),
        'yyyy-mm-dd'
      )
      start.setYear(start.getFullYear() - 1)
      enddate.setYear(start.getFullYear())
      const ynows5 = formatdate_inc_time(start, 'yyyy-mm-dd')
      const ynowe5 = formatdate_inc_time(
        enddate.setDate(enddate.getDate()),
        'yyyy-mm-dd'
      )
      start.setYear(start.getFullYear() - 1)
      enddate.setYear(start.getFullYear())
      const ynows4 = formatdate_inc_time(start, 'yyyy-mm-dd')
      const ynowe4 = formatdate_inc_time(
        enddate.setDate(enddate.getDate()),
        'yyyy-mm-dd'
      )
      start.setYear(start.getFullYear() - 1)
      enddate.setYear(start.getFullYear())
      const ynows3 = formatdate_inc_time(start, 'yyyy-mm-dd')
      const ynowe3 = formatdate_inc_time(
        enddate.setDate(enddate.getDate()),
        'yyyy-mm-dd'
      )
      start.setYear(start.getFullYear() - 1)
      enddate.setYear(start.getFullYear())
      const ynows2 = formatdate_inc_time(start, 'yyyy-mm-dd')
      const ynowe2 = formatdate_inc_time(
        enddate.setDate(enddate.getDate()),
        'yyyy-mm-dd'
      )
      start.setYear(start.getFullYear() - 1)
      enddate.setYear(start.getFullYear())
      const ynows1 = formatdate_inc_time(start, 'yyyy-mm-dd')
      const ynowe1 = formatdate_inc_time(
        enddate.setDate(enddate.getDate()),
        'yyyy-mm-dd'
      )
      getaccounting_all(getToken(), ynows1, ynowe1).then(res => {
        let datapay = []
        let datain = []
        res.data.forEach(items => {
          if (items.type === false) {
            items.type = '支出';
          } else {
            items.type = '收入';
          }
        })
        datapay = res.data.filter(function(item, index, array) {
          return item.type === '支出';
        })
        ypaydata.push(
          datapay.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue.amount
          }, 0)
        )
        datain = res.data.filter(function(item, index, array) {
          return item.type === '收入';
        })
        yindata.push(
          datain.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue.amount
          }, 0)
        )

        getaccounting_all(getToken(), ynows1, ynowe1).then(res => {
          let datapay = []
          let datain = []
          res.data.forEach(items => {
            if (items.type === false) {
              items.type = '支出';
            } else {
              items.type = '收入';
            }
          })
          datapay = res.data.filter(function(item, index, array) {
            return item.type === '支出';
          })
          ypaydata.push(
            datapay.reduce(function(accumulator, currentValue) {
              return accumulator + currentValue.amount
            }, 0)
          )
          datain = res.data.filter(function(item, index, array) {
            return item.type === '收入';
          })
          yindata.push(
            datain.reduce(function(accumulator, currentValue) {
              return accumulator + currentValue.amount
            }, 0)
          )
          getaccounting_all(getToken(), ynows2, ynowe2).then(res => {
            let datapay = []
            let datain = []
            res.data.forEach(items => {
              if (items.type === false) {
                items.type = '支出';
              } else {
                items.type = '收入';
              }
            })
            datapay = res.data.filter(function(item, index, array) {
              return item.type === '支出';
            })
            ypaydata.push(
              datapay.reduce(function(accumulator, currentValue) {
                return accumulator + currentValue.amount
              }, 0)
            )
            datain = res.data.filter(function(item, index, array) {
              return item.type === '收入';
            })
            yindata.push(
              datain.reduce(function(accumulator, currentValue) {
                return accumulator + currentValue.amount
              }, 0)
            )
            getaccounting_all(getToken(), ynows3, ynowe3).then(res => {
              let datapay = []
              let datain = []
              res.data.forEach(items => {
                if (items.type === false) {
                  items.type = '支出';
                } else {
                  items.type = '收入';
                }
              })
              datapay = res.data.filter(function(item, index, array) {
                return item.type === '支出';
              })
              ypaydata.push(
                datapay.reduce(function(accumulator, currentValue) {
                  return accumulator + currentValue.amount
                }, 0)
              )
              datain = res.data.filter(function(item, index, array) {
                return item.type === '收入';
              })
              yindata.push(
                datain.reduce(function(accumulator, currentValue) {
                  return accumulator + currentValue.amount
                }, 0)
              )
              getaccounting_all(getToken(), ynows4, ynowe4).then(res => {
                let datapay = []
                let datain = []
                res.data.forEach(items => {
                  if (items.type === false) {
                    items.type = '支出';
                  } else {
                    items.type = '收入';
                  }
                })
                datapay = res.data.filter(function(item, index, array) {
                  return item.type === '支出';
                })
                ypaydata.push(
                  datapay.reduce(function(accumulator, currentValue) {
                    return accumulator + currentValue.amount
                  }, 0)
                )
                datain = res.data.filter(function(item, index, array) {
                  return item.type === '收入';
                })
                yindata.push(
                  datain.reduce(function(accumulator, currentValue) {
                    return accumulator + currentValue.amount
                  }, 0)
                )
                getaccounting_all(getToken(), ynows5, ynowe5).then(res => {
                  let datapay = []
                  let datain = []
                  res.data.forEach(items => {
                    if (items.type === false) {
                      items.type = '支出';
                    } else {
                      items.type = '收入';
                    }
                  })
                  datapay = res.data.filter(function(item, index, array) {
                    return item.type === '支出';
                  })
                  ypaydata.push(
                    datapay.reduce(function(accumulator, currentValue) {
                      return accumulator + currentValue.amount
                    }, 0)
                  )
                  datain = res.data.filter(function(item, index, array) {
                    return item.type === '收入';
                  })
                  yindata.push(
                    datain.reduce(function(accumulator, currentValue) {
                      return accumulator + currentValue.amount
                    }, 0)
                  )
                  getaccounting_all(getToken(), ynows6, ynowe6).then(res => {
                    let datapay = []
                    let datain = []
                    res.data.forEach(items => {
                      if (items.type === false) {
                        items.type = '支出';
                      } else {
                        items.type = '收入';
                      }
                    })
                    datapay = res.data.filter(function(item, index, array) {
                      return item.type === '支出';
                    })
                    ypaydata.push(
                      datapay.reduce(function(accumulator, currentValue) {
                        return accumulator + currentValue.amount
                      }, 0)
                    )
                    datain = res.data.filter(function(item, index, array) {
                      return item.type === '收入';
                    })
                    yindata.push(
                      datain.reduce(function(accumulator, currentValue) {
                        return accumulator + currentValue.amount
                      }, 0)
                    )
                    getaccounting_all(getToken(), ynows7, ynowe7).then(res => {
                      let datapay = []
                      let datain = []
                      res.data.forEach(items => {
                        if (items.type === false) {
                          items.type = '支出';
                        } else {
                          items.type = '收入';
                        }
                      })
                      datapay = res.data.filter(function(item, index, array) {
                        return item.type === '支出';
                      })
                      ypaydata.push(
                        datapay.reduce(function(accumulator, currentValue) {
                          return accumulator + currentValue.amount
                        }, 0)
                      )
                      datain = res.data.filter(function(item, index, array) {
                        return item.type === '收入';
                      })
                      yindata.push(
                        datain.reduce(function(accumulator, currentValue) {
                          return accumulator + currentValue.amount
                        }, 0)
                      )
                      this.lineChartData.paydata = ypaydata
                      this.lineChartData.indata = yindata
                      console.log(yindata)
                    })
                  })
                })
              })
            })
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
