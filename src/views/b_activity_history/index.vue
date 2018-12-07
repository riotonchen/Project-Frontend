<template>
  <div class="activity_history">
    <title>
      {{ $t('route.activity_history') }}
    </title>
    <div class="activity_history_container">
      <!--目前使用日期做排序-->
      <el-table
        :data="ent_activity_history"
        :default-sort="{prop: 'status', order: 'descending'}"
        stripe
        style="width: 100%;"
        max-height="470"
        fit
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="left"
              inline
              class="table_acthistory_view"
            >
              <el-form-item :label="$t('activity_history.photo')">
                <span>{{ props.row.comment }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('activity_history.offername')"
          prop="name"
          align="center"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('activity_history.offercontent')"
          prop="content"
          align="center"
        > <template slot-scope="scope">
          <span>
            {{ scope.row.content }}
          </span>
        </template>
        </el-table-column>
        <el-table-column
          :label="$t('activity_history.status')"
          prop="status"
          align="center"
          sortable
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status==='未審核'?'danger':'primary'">
              <span>
                {{ scope.row.status }}
              </span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('activity_history.starttime')"
          prop="starttime"
          align="center"
          sortable
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.starttime }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('activity_history.endtime')"
          prop="endtime"
          align="center"
          sortable
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.endtime }}
            </span>
          </template>
        </el-table-column>

        <el-table-column align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="acthistory_edit(scope.$index,scope.row)"
            >{{ $t('activity_history.edit') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog_container">
      <el-dialog
        :visible.sync="activity_history_visible"
        :title="$t('c_history.edit')"
        width="80vw"
      >
        <el-form
          :ref="activity_history_edit"
          :model="activity_history_edit"
          :rules="activity_history_rules"
          label-position="left"
          inline
          class="acthistory_dialog"
        >
          <el-form-item>
            <span>{{ $t('activity_history.notmodify') }}</span>
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item
            :label="$t('activity_history.offername')"
            prop="offername"
          >
            <el-input
              v-model="activity_history_edit.offername"
              :placeholder="activity_history_offername_p"
              clearable
            />
          </el-form-item>
          <el-form-item
            :label="$t('activity_history.offercontent')"
            prop="offercontent"
          >
            <el-input
              v-model="activity_history_edit.offercontent"
              :placeholder="activity_history_offercontent_p"
              clearable
            />
          </el-form-item>
          <el-form-item :label="$t('activity_history.starttime')">
            <el-date-picker
              v-model="activity_history_edit.date1"
              :placeholder="activity_history_date1_p"
              type="date"
            />
          </el-form-item>
          <el-form-item :label="$t('activity_history.endtime')">
            <el-date-picker
              v-model="activity_history_edit.date2"
              :placeholder="activity_history_date2_p"
              type="date"
            />
          </el-form-item>
          <el-form-item :label="$t('activity_history.photo')">
            <el-upload
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="acthistory_Visible">
              <img
                :src="dialogImageUrl"
                width="100%"
                alt=""
              >
            </el-dialog>
          </el-form-item>

        </el-form>
        <!--
        <span
          slot="footer"
          class="invoice_dialog_footer"
        >
          <el-button
            type="primary"
            @click="acthistory_confirm()"
          >{{ $t('activity_history.confirm') }}</el-button>
          <el-button
            type="info"
            plain
            @click="acthistory_cal()"
          >{{ $t('activity_history.cancel') }}</el-button>
        </span>
-->
      </el-dialog>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波紋指令
import { getToken } from '@/utils/auth'
import { getentinfomations } from '@/api/infomations/getinfomations'
import { getUserInfo } from '@/api/login'
import { getentprofile } from '@/api/ent-profile/getentprofile'

export default {
  name: 'ActHistory',
  directives: {
    waves
  },
  data() {
    const validatename = (rule, value, callback) => {
      if (value === '' || value === null) {
        return callback(new Error('名稱不能為空'))
      } else if (value.length > 10) {
        callback(new Error('名稱不可以大於 10 個字'))
      } else {
        callback()
      }
    }
    const valideContentlength = (rule, value, callback) => {
      if (value.length > 140) {
        callback(new Error('內容最多輸入140字'))
      } else if (value.length < 1) {
        callback(new Error('內容不得為空'))
      } else {
        callback()
      }
    }
    return {
      startenddate: '',
      dialogImageUrl: '',
      acthistory_Visible: false,
      activity_history_edit: {
        name: '',
        content: '',
        status: '',
        starttime: '',
        endtime: '',
        photo: ''
      },
      activity_history_rules: {
        offername: [
          { required: false, trigger: 'change', validator: validatename }
        ],
        offercontent: [
          { required: false, trigger: 'change', validator: valideContentlength }
        ]
      },
      activity_history_date1_p: '',
      activity_history_date2_p: '',
      activity_history_offername_p: '',
      activity_history_offercontent_p: '',

      activity_history_visible: false,
      ent_activity_history: []
    }
  },
  created() {
    this.get_entinfo_all()
  },
  methods: {
    get_entinfo_all() {
      getUserInfo(getToken()).then(res => {
        getentprofile(getToken(), res.data.account).then(res => {
          getentinfomations(getToken(), res.data[0].store_id).then(res => {
            this.ent_activity_history = res.data
            this.ent_activity_history.forEach(items => {
              if (items.status === 0) {
                items.status = '未審核'
              } else {
                items.status = '已發佈'
              }
            })
          })
        })
      })
    },

    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.acthistory_Visible = true
    },
    acthistory_edit(index, row) {
      this.activity_history_offername_p = row.offername
      this.activity_history_offercontent_p = row.offercontent
      this.activity_history_date1_p = row.date1
      this.activity_history_date2_p = row.date2
      this.activity_history_visible = true
    },
    acthistory_confirm() {
      this.$refs.activity_history_edit.validate(valid => {
        if (valid) {
          this.$message({
            type: 'success',
            message: '已完成該筆資料修改'
          })
          this.activity_history_visible = false
        } else {
          console.log('error submit')
          return false
        }
      })
    },
    acthistory_cal() {
      this.$message({
        type: 'info',
        message: '已取消修改'
      })
      this.activity_history_visible = false
    }
  }
}
</script>
<style lang="scss">
.activity_history_container {
  padding: 20px;
}
.acthistory_dialog {
  font-size: 0;
}
.acthistory_dialog label {
  width: 100px;
  color: #99a9bf;
}
.acthistory_dialog .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 50%;
}
.table_acthistory_view {
  font-size: 0;
}
.table_acthistory_view label {
  width: 90px;
  color: #99a9bf;
}
.table_acthistory_view .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
