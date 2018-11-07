<template>
  <div class="app-container">

    <title>
      {{ $t('route.a_feebackmanage') }}
    </title>
    <div class="filter-container">
      <el-select v-model="testselect" clearable filterable style="width: 25vw;max-width:7.5rem;min-width:5.5rem;" @focus="get_cardlist()" @change="get_cardlist()">
        <el-option v-for="item in testdata" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </div>
    <div class="feedback_table">
      <el-table :data="test" stripe style="width: 100%;" max-height="500" fit sortable>
        <el-table-column type="index" align="center" />
        <el-table-column :label="$t('a_feebackmanager.date')" prop="date">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('a_feebackmanager.problemnumber')" prop="problemnumber">
          <template slot-scope="scope">
            <span>{{ scope.row.problemnumber }}</span>
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
            <el-button type="primary" plain @click.native.prevent="handleUpdate(scope.row)">{{ $t('a_feebackmanager.edit') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog_container">
      <el-dialog :visible.sync="centerDialogVisible" width="80vw">
        <el-form :ref="a_feedback_form" :model="a_feedback_form" label-position="left" inline class="table-invoice">
          <el-form-item :label="$t('a_feebackmanager.problemcontent')" prop="problemcontent">
            <el-input v-model="a_feedback_form.problemcontent" :autosize="{ minRows: 15, maxRows:15}" placeholder="" readonly resize="none" type="textarea" style="width:40vw" />
          </el-form-item>

        </el-form>

        <span slot="footer" class="invoice_dialog_footer">
          <el-button type="primary" @click="send_reback()">回復</el-button>
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
      a_feedback_form: {
        problemcontent: ''
      },
      test: [{ date: 'hufihsiogrkj', problemnumber: '12348465', problemsubject: 'ewgrb', memberaccount: 'ebwnb' }, { date: 'hufihsiogrkj', problemnumber: '12348465', problemsubject: 'ewgrb', memberaccount: 'ebwnb' }],
      testselect: '',
      testdata: [{ id: 1, name: '可' }, { id: 2, name: '阿' }, { id: 3, name: '溪' }],

      dialogFormVisible: false,
      dialogStatus: '',
      centerDialogVisible: false,
      dialogPvVisible: false

    }
  },

  created() {
    this.getList()
  },

  methods: {

    handleUpdate(index, row) {
      this.centerDialogVisible = true
      this.a_feedback_form.problemcontent = row.problemcontent
      this.a_feedbackmanage_content_p = row.content
    },
    send_reback() {
      this.centerDialogVisible = false
      const h = this.$createElement
      this.$notify({
        title: '回覆成功',
        message: h('b', { style: 'color: teal' }, '該問題已經回覆')
      })
    }
  }
}
</script>
