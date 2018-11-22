<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <!--<panel-group @handleSetLineChartData="handleSetLineChartData" />-->
    <!--style="background:#fff;padding:1rem 1rem 0;margin-bottom:2rem;"-->
    <el-row>
      <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
        <el-row :gutter="40" class="panel-group">
          <el-col :xs="12" :sm="11" :lg="11" class="card-panel-col">
            <div class="card-panel">
              <!--
              <div class="card-panel-icon-wrapper icon-people">
                <svg-icon icon-class="peoples" class-name="card-panel-icon" />
              </div>
              -->
              <div class="card-panel-description" @click="showYLinecahrt()">
                <div class="card-panel-text">
                  <span>年報表<br><br>曲線圖</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="11" :lg="11" class="card-panel-col">
            <div class="card-panel">
              <!--
              <div class="card-panel-icon-wrapper icon-people">
                <svg-icon icon-class="peoples" class-name="card-panel-icon" />
              </div>
              -->
              <div class="card-panel-description" @click="showMLinecahrt()">
                <div class="card-panel-text">
                  <span>月報表<br><br>曲線圖</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40" class="panel-group">
          <el-col :xs="12" :sm="11" :lg="11" class="card-panel-col">
            <div class="card-panel">
              <!--
              <div class="card-panel-icon-wrapper icon-people">
                <svg-icon icon-class="peoples" class-name="card-panel-icon" />
              </div>
              -->
              <div class="card-panel-description">
                <div class="card-panel-text">TEST</div>
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="11" :lg="11" class="card-panel-col">
            <div class="card-panel">
              <!--
              <div class="card-panel-icon-wrapper icon-people">
                <svg-icon icon-class="peoples" class-name="card-panel-icon" />
              </div>
              -->
              <div class="card-panel-description">
                <div class="card-panel-text">TEST</div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40" class="panel-group">
          <el-col :xs="12" :sm="11" :lg="11" class="card-panel-col">
            <div class="card-panel">
              <!--
              <div class="card-panel-icon-wrapper icon-people">
                <svg-icon icon-class="peoples" class-name="card-panel-icon" />
              </div>
              -->
              <div class="card-panel-description">
                <div class="card-panel-text">TEST</div>
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="11" :lg="11" class="card-panel-col">
            <div class="card-panel">
              <!--
              <div class="card-panel-icon-wrapper icon-people">
                <svg-icon icon-class="peoples" class-name="card-panel-icon" />
              </div>
              -->
              <div class="card-panel-description">
                <div class="card-panel-text">TEST</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
        <div class="chart-wrapper">
          <transition name="el-fade-in">
            <div v-show="MLineChartshow">
              <MLineChart :chart-data="lineChartData" />
            </div>
          </transition>
          <transition name="el-fade-in">
            <div v-show="YLineChartshow">
              <YLineChart :chart-data="lineChartData" />
            </div>
          </transition>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <!--
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
      -->
    </el-row>

    <el-row>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}" style="margin-bottom:30px;">
        <transaction-table />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { getaccount_all } from '@/api/account/getaccount'
import { getToken } from '@/utils/auth'
import { formatdate_inc_time } from '@/utils/index'
// import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import MLineChart from './components/MLineChart'
import YLineChart from './components/YLineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'

/*
const lineChartData = {
  newVisitis: {
    paydata: [100, 120, 161, 134, 105, 160, 165],
    indata: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    paydata: [200, 192, 120, 144, 160, 130, 140],
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
*/
const lineChartData = {
  messages: {
    paydata: [200, 192, 120, 144, 160, 130, 140],
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
    // GithubCorner,
    PanelGroup,
    MLineChart,
    YLineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable
    // TodoList,
    // BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.messages,
      MLineChartshow: true,
      YLineChartshow: false
    }
  },
  created() {
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
