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
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'

import TransactionTable from './components/TransactionTable'

import YLineChart from './components/YLineChart'
import MLineChart from './components/MLineChart'

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
    TransactionTable
  },
  data() {
    return {
      lineChartData: lineChartData.messages
    }
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
