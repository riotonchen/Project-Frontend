<template>
  <div class="activity_history">
    <title>
      {{ $t('route.b_activity_history') }}
    </title>
    <div class="activity_history_container">
      <!--目前使用日期做排序-->
      <el-table :data="user_activity_history" :default-sort="{prop: 'date', order: 'descending'}" stripe style="width: 100%;" max-height="470" fit>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table_acthistory_view">
              <el-form-item :label="$t('activity_history.photo')">
                <span>{{ props.row.comment }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column :label="$t('activity_history.offername')" prop="name" align="center" />
        <el-table-column :label="$t('activity_history.offercontent')" prop="content" align="center" />
        <el-table-column :label="$t('activity_history.status')" prop="status" align="center" />
        <el-table-column :label="$t('activity_history.starttime')" prop="starttime" align="center" />
        <el-table-column :label="$t('activity_history.endtime')" prop="endtime" align="center" />

        <el-table-column>
          <template slot-scope="scope">
            <el-button type="primary" @click="acthistory_edit(scope.$index,scope.row)">{{ $t('activity_history.edit') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog_container">
      <el-dialog :visible.sync="activity_history_visible" :title="$t('c_history.edit')" width="80vw">
        <el-form :model="activity_history_edit" label-position="left" inline class="acthistory_dialog">
          <el-form-item>
            <span>{{ $t('activity_history.notmodify') }}</span>
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item :label="$t('activity_history.offername')">
            <el-input v-model="activity_history_edit.offername" :placeholder="activity_history_offername_p" clearable />
          </el-form-item>
          <el-form-item :label="$t('activity_history.offercontent')">
            <el-input v-model="activity_history_edit.offercontent" :placeholder="activity_history_offercontent_p" clearable />
          </el-form-item>
          <el-form-item :label="$t('activity_history.starttime')">
            <el-date-picker v-model="activity_history_edit.date1" :placeholder="activity_history_date1_p" type="date" />
          </el-form-item>
          <el-form-item :label="$t('activity_history.endtime')">
            <el-date-picker v-model="activity_history_edit.date2" :placeholder="activity_history_date2_p" type="date" />
          </el-form-item>
          <el-form-item :label="$t('activity_history.photo')">
            <el-upload :on-preview="handlePictureCardPreview" :on-remove="handleRemove" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card">
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="acthistory_Visible">
              <img :src="dialogImageUrl" width="100%" alt="">
            </el-dialog>
          </el-form-item>

        </el-form>

        <span slot="footer" class="invoice_dialog_footer">
          <el-button type="danger" plain @click="acthistory_del()">{{ $t('activity_history.delete') }}</el-button>
          <el-button type="primary" @click="acthistory_confirm()">{{ $t('activity_history.confirm') }}</el-button>
          <el-button type="info" plain @click="acthistory_cal()">{{ $t('activity_history.cancel') }}</el-button>
        </span>

      </el-dialog>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波紋指令
import { getsort_pay, getsort_in } from '@/api/sort/getsort'
import { getsubsort } from '@/api/subsort/getsubsort'
import { getproject } from '@/api/project/getproject'
import { getaccount } from '@/api/account/getaccount'
import { getToken } from '@/utils/auth'
export default {
  name: 'BActivityHistory',
  directives: {
    waves
  },
  data() {
    return {
      startenddate: '',
      dialogImageUrl: '',
      acthistory_Visible: false,
      activity_history_edit:
      {
        name: '',
        content: '',
        status: '',
        starttime: '',
        endtime: '',
        photo: ''

      },
      activity_history_date1_p: '',
      activity_history_date2_p: '',
      activity_history_offername_p: '',
      activity_history_offercontent_p: '',

      activity_history_visible: false,
      user_activity_history: [
        // test data
        {
          name: 'wbwebt',
          content: 'rwehteqn',
          status: 'geheb',
          starttime: '2018-11-01',
          endtime: '2018-11-08',
          photo: ''

        }]
    }
  },

  methods: {
    acthistory_edit() {
      this.activity_history_visible = true
    }
  }
}
</script>
<style lang='scss'>
.activity_add_container {
  padding: 20px;
}
.table-acthistory_dialog {
  font-size: 0;
}
.table-acthistory_dialog label {
  width: 100px;
  color: #99a9bf;
}
.acthistory_dialog-invoice .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 50%;
}
.table-table_acthistory_view {
  font-size: 0;
}
.table-table_acthistory_view label {
  width: 90px;
  color: #99a9bf;
}
.table-table_acthistory_view .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
