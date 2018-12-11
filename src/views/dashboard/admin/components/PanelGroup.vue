<template>
  <div>

    <el-row
      :gutter="40"
      class="panel-group"
    >
      <el-col
        :xs="24"
        :sm="6"
        :lg="6"
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
            <div class="card-panel-text">{{ $t('a_dashboard.people') }}</div>
            <count-to
              :start-val="0"
              :end-val="totalmember_num"
              :duration="3500"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="6"
        :lg="6"
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
            <div class="card-panel-text">{{ $t('a_dashboard.admin') }}</div>
            <count-to
              :start-val="0"
              :end-val="admin_num"
              :duration="3500"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="6"
        :lg="6"
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
            <div class="card-panel-text">{{ $t('a_dashboard.member') }}</div>
            <count-to
              :start-val="0"
              :end-val="member_num"
              :duration="3500"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="6"
        :lg="6"
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
            <div class="card-panel-text">{{ $t('a_dashboard.business') }}</div>
            <count-to
              :start-val="0"
              :end-val="ent_num"
              :duration="3500"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
    </el-row>
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
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon
              icon-class="message"
              class-name="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">{{ $t('a_dashboard.feedbacktotal') }}</div>
            <count-to
              :start-val="0"
              :end-val="all_feedback_num"
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
            <div class="card-panel-text">{{ $t('a_dashboard.replied') }}</div>
            <count-to
              :start-val="0"
              :end-val="done_feedback_num"
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
            <div class="card-panel-text">{{ $t('a_dashboard.noreply') }}</div>
            <count-to
              :start-val="0"
              :end-val="yet_feedback_num"
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
import { getmember, getmemberlist } from '@/api/member/getmember'
import { getfeedback } from '@/api/feedback/getfeedback'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      member_num: '',
      ent_num: '',
      admin_num: '',
      all_feedback_num: '',
      done_feedback_num: '',
      yet_feedback_num: '',
      totalmember_num: '',
      a_all_ent_data: [],
      a_all_member_data: []
    }
  },
  created() {
    this.get_member_all()
    this.get_feedback_all()
  },
  methods: {
    get_member_all() {
      getmember(getToken()).then(res => {
        const oridata_admin_info = []
        const oridata_mbr_info = []
        const oridata_ent_info = []
        const oridata = res.data
        this.totalmember_num = oridata.length
        for (let i = 0; i < oridata.length; i++) {
          getmemberlist(getToken(), oridata[i].id).then(resinfo => {
            if (resinfo.data.membertype === 5) {
              oridata_ent_info.push(resinfo.data)
            } else if (resinfo.data.membertype === 1) {
              oridata_admin_info.push(resinfo.data)
            } else {
              oridata_mbr_info.push(resinfo.data)
            }
            this.ent_num = oridata_ent_info.length
            this.admin_num = oridata_admin_info.length
            this.member_num = oridata_mbr_info.length
          })
        }
      })
    },
    get_feedback_all() {
      let doneback = []
      let yetback = []
      getfeedback(getToken()).then(res => {
        this.all_feedback_num = res.data.length
        doneback = res.data.filter(function(item, index, array) {
          return item.status === 1
        })
        yetback = res.data.filter(function(item, index, array) {
          return item.status === 0
        })
        this.done_feedback_num = doneback.length
        this.yet_feedback_num = yetback.length
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
