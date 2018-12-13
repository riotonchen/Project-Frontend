/* eslint-disable semi */
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
            <div class="card-panel-text">已建立優惠資訊</div>
            <count-to
              :start-val="0"
              :end-val="b_information"
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
            <div class="card-panel-text">已成功推送數量</div>
            <count-to
              :start-val="0"
              :end-val="b_information_suc"
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
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon
              icon-class="message"
              class-name="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">尚未審核數量</div>
            <count-to
              :start-val="0"
              :end-val="b_information_yet"
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
import { getentinfomations } from '@/api/infomations/getinfomations'
import { getentprofile } from '@/api/ent-profile/getentprofile'
import store from '../../../../store'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      b_information: 0,
      b_information_suc: 0,
      b_information_yet: 0
    }
  },
  created() {
    this.get_all_promotion()
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    get_all_promotion() {
      getentprofile(getToken(), store.getters.account).then(res => {
        getentinfomations(getToken(), res.data[0].store_id).then(res => {
          this.b_information = res.data.length
          const data = []
          let data_suc = []
          let data_yet = []
          for (let i = 0; i < res.data.length; i++) {
            data.push(res.data[i])
          }
          data_suc = data.filter(function(item) {
            return item.status === 1
          })
          data_yet = data.filter(function(item) {
            return item.status === 0
          })
          this.b_information_suc = data_suc.length
          this.b_information_yet = data_yet.length
        })
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
