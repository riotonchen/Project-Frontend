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
              :end-val="totalmember_num"
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
              :end-val="member_num"
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
              :end-val="ent_num"
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
import CountTo from 'vue-count-to';
import { getToken } from '@/utils/auth';
import { getmember, getmemberlist } from '@/api/member/getmember';

export default {
  components: {
    CountTo
  },
  data() {
    return {
      member_num: '',
      ent_num: '',
      totalmember_num: '',
      a_all_ent_data: [],
      a_all_member_data: []
    }
  },
  created() {
    this.get_member_all()
  },
  methods: {
    get_member_num() {
      this.member_num = this.a_all_member_data.length
      this.ent_num = this.a_all_ent_data.length
      this.totalmember_num = this.member_num + this.ent_num
    },
    get_member_all() {
      getmember(getToken()).then(res => {
        const testmember = res.data
        const ori_data = []
        let testnum = testmember.length
        for (let i = 1; i <= testnum; i++) {
          getmemberlist(getToken(), i)
            .then(res_data => {
              setTimeout(() => {
                ori_data.push(res_data.data)
                this.a_all_ent_data = ori_data.filter(function(
                  item,
                  index,
                  array
                ) {
                  return item.membertype === 5
                })
              }, i * 50)
            })
            .catch(() => {
              testnum = testnum + 1
              this.get_member_all_ext(testnum)
            })
        }
      })
    },
    get_member_all_ext(testnum) {
      getmemberlist(getToken(), testnum)
        .then(res_data => {
          setTimeout(() => {
            this.a_all_ent_data.push(res_data.data)
            this.a_all_ent_data = this.a_all_ent_data.filter(function(
              item,
              index,
              array
            ) {
              return item.membertype === 5
            })
          }, testnum * 50)
        })
        .catch(() => {
          testnum = testnum + 1
          this.get_member_all_ext(testnum)
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
