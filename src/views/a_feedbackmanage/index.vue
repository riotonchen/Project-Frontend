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
          <el-date-picker v-model="startenddate" :start-placeholder="$t('a_feebackmanager.startdate')" :end-placeholder="$t('a_feebackmanager.enddate')" :clearable="dateclean" range-separator="-" align="center" type="daterange" />
        </el-col>
      </el-row>
    </div>
    <div class="feedback_table">
      <el-table :data="feedbackdata" stripe style="width: 100%;" max-height="500" fit sortable>
        <el-table-column type="index" align="center" />
        <el-table-column :label="$t('a_feebackmanager.date')" prop="date">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="狀態" prop="status">
          <template slot-scope="scope">
            <span>{{ scope.row.status }}</span>
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
            <el-button type="primary" plain @click.native.prevent="handleUpdate(scope.$index,scope.row)">{{ $t('a_feebackmanager.detailed') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog_container">
      <el-dialog :visible.sync="a_feedback_visible" width="80vw">
        <el-form :ref="a_feedback_form" :model="a_feedback_form" label-position="left" inline class="table_fdback_view">
          <el-form-item :label="$t('a_feebackmanager.problemcontent')" prop="problemcontent">
            <el-input v-model="a_feedback_form.problemcontent" :autosize="{ minRows: 15, maxRows:15}" placeholder="" readonly resize="none" type="textarea" style="width:40vw" />
          </el-form-item>

        </el-form>

        <span slot="footer" class="invoice_dialog_footer">
          <el-button type="primary" @click="a_feedbackreply()">{{ $t('a_feebackmanager.reply') }}</el-button>
        </span>

      </el-dialog>
      <!--回覆-->
      <el-dialog :visible.sync="a_feedbackreply_visible" width="80vw">
        <el-form :ref="a_feedback_reply" :model="a_feedback_reply">
          <el-form-item :label="$t('a_feebackmanager.replycontent')" prop="content">
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

export default {
  name: 'AFeedbackmanage',
  directives: {
    waves
  },

  data() {
    return {
      startenddate: '',
      dateclean: false,
      a_feedback_form: {
        problemcontent: ''
      },
      a_feedback_reply:
      {
        content: ''
      },
      feedbackdata: [{ date: 'hufihsiogrkj', problemnumber: '12348465', problemsubject: 'ewgrb', memberaccount: 'ebwnb' }, { date: 'hufihsiogrkj', problemnumber: '12348465', problemsubject: 'ewgrb', memberaccount: 'ebwnb' }],
      select: '',
      testdata: [{ id: 1, name: '可' }, { id: 2, name: '阿' }, { id: 3, name: '溪' }],
      a_feedback_visible: false,
      a_feedbackreply_visible: false
    }
  },
  methods: {
    handleUpdate(index, row) {
      this.a_feedback_visible = true
      this.a_feedback_form.problemcontent = row.problemcontent
    },
    a_feedbackreply() {
      this.a_feedbackreply_visible = true
    },
    send_reback() {
      this.a_feedbackreply_visible = false
      this.a_feedback_visible = false
      const h = this.$createElement
      this.$notify({
        title: '回覆成功',
        message: h('b', { style: 'color: teal' }, '該問題已經回覆')
      })
    },
    a_feeback_cal() {
      this.$message({
        type: 'info',
        message: '已取消動作'
      })
      this.a_feedbackreply_visible = false
      this.a_feedback_visible = false
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
