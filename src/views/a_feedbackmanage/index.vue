/* eslint-disable semi */
<template>
  <div class="app-container">

    <title>
      {{ $t('route.a_feebackmanage') }}
    </title>
    <div class="filter-container">
      <el-row class="date_seletor">
        <el-col
          :xs="6"
          :sm="3"
          :md="2"
          :lg="2"
          :xl="1"
          class="selector_title"
        >
          <span>{{ $t('a_feebackmanager.selecttime') }}</span>
        </el-col>
        <el-col
          :xs="24"
          :sm="15"
          :md="9"
          :lg="8"
          :xl="6"
        >
          <!--style="width: 40vw;min-width:15rem;max-width:23rem;"-->
          <el-date-picker
            v-model="startenddate"
            :picker-options="feeddateselect"
            :start-placeholder="$t('a_feebackmanager.startdate')"
            :end-placeholder="$t('a_feebackmanager.enddate')"
            :clearable="dateclean"
            range-separator="-"
            align="center"
            type="daterange"
            @change="get_feedback_all()"
          />
        </el-col>
      </el-row>
    </div>
    <!--回饋管理表單-->
    <div class="feedback_table">
      <el-table
        :data="feedbackdata"
        :default-sort="{prop: 'time', order: 'descending'}"
        stripe
        style="width: 100%;"
        max-height="600"
        fit
        sortable
      >
        <el-table-column
          type="index"
          align="center"
        />
        <el-table-column
          :label="$t('a_feebackmanager.date')"
          prop="time"
          sortable
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('a_feebackmanager.status')"
          prop="status"
          sortable
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status==='已回覆'?'primary':'danger'">
              <span>
                {{ scope.row.status }}
              </span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('a_feebackmanager.problemsubject')"
          prop="title"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('a_feebackmanager.memberaccount')"
          prop="member_id"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.member_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('a_feebackmanager.act')"
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.status==='已回覆'">
              <el-tag type="success">
                <span>該案件已回覆</span>
              </el-tag>
            </div>
            <div v-else>
              <el-button
                type="primary"
                plain
                @click.native.prevent="handleDetailed(scope.$index,scope.row)"
              >{{ $t('a_feebackmanager.detailed') }}</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog_container">
      <!--問題詳細內容-->
      <el-dialog
        :visible.sync="a_feedback_visible"
        width="80vw"
      >
        <el-form
          :ref="a_feedback_form"
          :model="a_feedback_form"
          label-position="top"
          inline
          class="table_fdback_view"
        >
          <el-form-item
            :label="$t('a_feebackmanager.problemcontent')"
            prop="problemcontent"
          >
            <!--問題內容檢視框-->
            <el-input
              v-model="a_feedback_form.problemcontent"
              :autosize="{ minRows: 8, maxRows:8}"
              readonly
              resize="none"
              type="textarea"
              class="feedback_view"
            />
          </el-form-item>

        </el-form>

        <span
          slot="footer"
          class="invoice_dialog_footer"
        >
          <el-button
            type="primary"
            @click="a_feedbackreply()"
          >{{ $t('a_feebackmanager.reply') }}</el-button>
        </span>

      </el-dialog>
      <!--回覆-->
      <el-dialog
        :visible.sync="a_feedbackreply_visible"
        width="80vw"
      >
        <el-form
          v-loading="replyloding"
          :ref="a_feedback_reply"
          :model="a_feedback_reply"
          element-loading-text="正在幫你寄一封信給該用戶中......"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.9)"
          label-position="top"
          inline
          class="table_fdback_view"
        >
          <el-form-item
            :label="$t('a_feebackmanager.replycontent')"
            prop="replycontent"
          >
            <el-input
              v-model="a_feedback_reply.content"
              :placeholder="$t('a_feebackmanager.input')"
              :autosize="{ minRows: 8, maxRows:8}"
              resize="none"
              type="textarea"
              style="width:40vw;font-size:2vw;"
            />
          </el-form-item>

        </el-form>
        <span
          slot="footer"
          class="invoice_dialog_footer"
        >
          <el-button
            :loading="replyloding"
            type="primary"
            @click.native.prevent="send_reback()"
          >{{ $t('a_feebackmanager.confirm') }}</el-button>
          <el-button
            :loading="replyloding"
            type="info"
            plain
            @click.native.prevent="a_feeback_cal()"
          >{{ $t('a_feebackmanager.cancel') }}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import waves from '@/directive/waves';
import { formatdate } from '@/utils/index';
import { getfeedback } from '@/api/feedback/getfeedback';
import { patchfeedback } from '@/api/feedback/patchfeedback';
import { getmemberlist } from '@/api/member/getmember';
import { getToken } from '@/utils/auth';
import { formatdate_inc_time } from '@/utils/index';

export default {
  name: 'AFeedbackmanage',
  directives: {
    waves
  },

  data() {
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
    return {
      globledate: formatdate('yyyy-mm-dd HH:MM:ss.l'),
      startenddate: [start, formatdate('yyyy-mm-dd HH:MM:ss.l')],
      dateclean: false,
      a_feedback_form: {
        id: '',
        problemcontent: ''
      },
      a_feedback_reply: {
        replycontent: ''
      },
      feedbackdata: [],

      select: '',
      a_feedback_visible: false,
      a_feedbackreply_visible: false,
      replyloding: false,
      feeddateselect: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime())
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一週',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一個月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三個月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近六個月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },

  created() {
    this.get_feedback_all()
    this.fullloading()
  },

  methods: {
    fullloading() {
      const loading = this.$loading({
        lock: true,
        text: '正在幫你載入所有意見回饋中.......',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.9)'
      })
      setTimeout(() => {
        loading.close()
      }, 2000)
    },
    get_feedback_all() {
      let startdate
      let enddate
      if (this.startenddate.length === 2) {
        startdate = formatdate_inc_time(this.startenddate[0], 'yyyy-mm-dd')
        enddate = formatdate_inc_time(this.startenddate[1], 'yyyy-mm-dd')
      } else {
        startdate = '';
        enddate = '';
      }
      getfeedback(getToken(), startdate, enddate).then(res => {
        this.feedbackdata = res.data
        this.feedbackdata.forEach(items => {
          if (items.status === 0) {
            items.status = '未回覆';
          } else {
            items.status = '已回覆';
          }
          items.time = items.time
            .toString()
            .substring(0, items.time.indexOf('T'))
          getmemberlist(getToken(), items.member_id).then(res => {
            items.member_id = res.data.account
          })
        })
      })
    },
    /* 點擊詳細問題內容框按鈕*/
    handleDetailed(index, row) {
      this.a_feedback_visible = true /* 打開詳細問題內容框*/
      this.a_feedback_form.problemcontent = row.content
      this.a_feedback_form.id = row.id
    },
    a_feedbackreply() {
      this.a_feedbackreply_visible = true /* 打開回覆框*/
    },
    /* 點擊回覆框按鈕*/
    send_reback() {
      this.replyloding = true
      setTimeout(() => {
        patchfeedback(
          getToken(),
          this.a_feedback_form.id,
          this.a_feedback_reply.content
        )
          .then(() => {
            this.replyloding = false
            this.a_feedbackreply_visible = false /* 關掉詳細內容框*/
            this.a_feedback_visible = false /* 關掉回覆框*/
            const h = this.$createElement
            this.$notify({
              title: '回覆成功',
              message: h('b', { style: 'color: teal' }, '該問題已經回覆')
            })
            this.a_feedback_reply.content = '';
            this.get_feedback_all()
          })
          .catch(error => {
            this.replyloding = false
            console.log(error)
            this.$message({
              type: 'error',
              message: '發生一點錯誤，請稍後送出一次'
            })
            this.a_feedback_reply.content = '';
            this.get_feedback_all()
          })
      }, 3500)
    },
    a_feeback_cal() {
      this.$message({
        type: 'info',
        message: '已取消動作'
      })
      this.a_feedbackreply_visible = false /* 關掉詳細內容框*/
      this.a_feedback_visible = false /* 關掉回覆框*/
    }
  }
}
</script>
<style lang='scss'>
.selector_title {
  line-height: 2.25rem;
  font-size: 0.7vw;
}
.table_fdback_view textarea {
  //border: 0;
  width: 50vw;
}
.table_fdback_view label {
  font-size: 2vw;
}
.feedback_view {
  width: 40vw;
  font-size: 2vw;
  font-family: "Microsoft JhengHei";
}

.feedback_view textarea {
  border: 0;
}
</style>
