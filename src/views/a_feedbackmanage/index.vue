<template>
  <div class="app-container">

    <title>
      {{ $t('route.a_feebackmanage') }}
    </title>
    <div class="filter-container">
      <el-row class="date_seletor">
        <el-col :xs="6" :sm="3" :md="2" :lg="2" :xl="1" class="selector_title">
          <span>{{ $t('a_feebackmanager.selecttime') }}</span>
        </el-col>
        <el-col :xs="24" :sm="15" :md="9" :lg="8" :xl="6">
          <!--style="width: 40vw;min-width:15rem;max-width:23rem;"-->
          <el-date-picker v-model="startenddate" :picker-options="feeddateselect" :start-placeholder="$t('a_feebackmanager.startdate')" :end-placeholder="$t('a_feebackmanager.enddate')" :clearable="dateclean" range-separator="-" align="center" type="daterange" />
        </el-col>
      </el-row>
    </div>
    <!--回饋管理表單-->
    <div class="feedback_table">
      <el-table :data="feedbackdata" stripe style="width: 100%;" max-height="500" fit sortable>
        <el-table-column type="index" align="center" />
        <el-table-column :label="$t('a_feebackmanager.date')" prop="date">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('a_feebackmanager.status')" prop="status">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status==='已回覆'?'primary':'danger'">
              <span>
                {{ scope.row.status }}
              </span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('a_feebackmanager.problemsubject')" prop="problemsubject">
          <template slot-scope="scope">
            <span>{{ scope.row.problemsubject }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('a_feebackmanager.memberaccount')" prop="memberaccount">
          <template slot-scope="scope">
            <span>{{ scope.row.memberaccount }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('a_feebackmanager.act')" align="center">
          <template slot-scope="scope">
            <el-button type="primary" plain @click.native.prevent="handleDetailed(scope.$index,scope.row)">{{ $t('a_feebackmanager.detailed') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog_container">
      <!--問題詳細內容-->
      <el-dialog :visible.sync="a_feedback_visible" width="80vw">
        <el-form :ref="a_feedback_form" :model="a_feedback_form" label-position="top" inline class="table_fdback_view">
          <el-form-item :label="$t('a_feebackmanager.problemcontent')" prop="problemcontent">
            <!--問題內容輸入框需打資料-->
            <el-input v-model="a_feedback_form.problemcontent" :autosize="{ minRows: 15, maxRows:15}" readonly resize="none" type="textarea" style="width:40vw" />
          </el-form-item>

        </el-form>

        <span slot="footer" class="invoice_dialog_footer">
          <el-button type="primary" @click="a_feedbackreply()">{{ $t('a_feebackmanager.reply') }}</el-button>
        </span>

      </el-dialog>
      <!--回覆-->
      <el-dialog :visible.sync="a_feedbackreply_visible" width="80vw">
        <el-form :ref="a_feedback_reply" :model="a_feedback_reply" label-position="top" inline class="table_fdback_view">
          <el-form-item :label="$t('a_feebackmanager.replycontent')" prop="replycontent">
            <el-input v-model="a_feedback_reply.content" :placeholder="$t('a_feebackmanager.input')" :autosize="{ minRows: 15, maxRows:15}" resize="none" type="textarea" style="width:40vw" />
          </el-form-item>

        </el-form>
        <span slot="footer" class="invoice_dialog_footer">
          <el-button type="primary" @click.native.prevent="send_reback()">{{ $t('a_feebackmanager.confirm') }}</el-button>
          <el-button type="info" plain @click.native.prevent="a_feeback_cal()">{{ $t('a_feebackmanager.cancel') }}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import waves from '@/directive/waves'
import { formatdate } from '@/utils/index'
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
        problemcontent: ''
      },
      a_feedback_reply:
      {
        replycontent: ''
      },
      feedbackdata: [{ date: '2018-11-1', status: '已回覆', problemnumber: '12348465', problemsubject: 'ewgrb', memberaccount: 'ebwnb' }, { date: '2018-11-15', status: '未回覆', problemnumber: '12348465', problemsubject: 'ewgrb', memberaccount: 'ebwnb' }],

      select: '',
      a_feedback_visible: false,
      a_feedbackreply_visible: false,
      feeddateselect: {
        shortcuts: [{
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
        }]
      }
    }
  },

  created() {
    this.getList()
  },

  methods: {
    /* 點擊詳細問題內容框按鈕*/
    handleDetailed(index, row) {
      this.a_feedback_visible = true/* 打開詳細問題內容框*/
      this.a_feedback_form.problemcontent = row.problemcontent
    },
    /* 點擊回覆框按鈕*/
    a_feedbackreply() {
      this.a_feedbackreply_visible = true/* 打開回覆框*/
    },
    send_reback() {
      this.$refs.a_feedback_reply.validate((valid) => {
        if (valid) {
          this.a_feedbackreply_visible = false/* 關掉詳細內容框*/
          this.a_feedback_visible = false/* 關掉回覆框*/
          const h = this.$createElement
          this.$notify({
            title: '回覆成功',
            message: h('b', { style: 'color: teal' }, '該問題已經回覆')
          }).catch((error) => {
            console.log(error)
            this.$message({
              type: 'error',
              message: '發生一點錯誤，請稍後送出一次'
            })
          })
        } else {
          console.log('error submit')
          return false
        }
      })
    },
    a_feeback_cal() {
      this.$message({
        type: 'info',
        message: '已取消動作'
      })
      this.a_feedbackreply_visible = false/* 關掉詳細內容框*/
      this.a_feedback_visible = false/* 關掉回覆框*/
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
</style>
