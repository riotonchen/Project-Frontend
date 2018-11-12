<template>
  <div class="app-container">
    <title>
      {{ $t('route.a_manage_business_view.businessmember') }}
    </title>
    <div class="filter-container">
      <el-select v-model="selectuni_num" :placeholder="$t('a_manage_business_view.number')" filterable>
        <el-option v-for="item in b_uni_num" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="selectname" :placeholder="$t('a_manage_business_view.name')" filterable>
        <el-option v-for="item in b_name" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="selectaccount" :placeholder="$t('a_manage_business_view.id')" filterable>
        <el-option v-for="item in b_account" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <!--外層Table-->
    <div>
      <el-table :data="a_business_table" stripe style="width: 100%;" max-height="500" fit>
        <el-table-column :label="$t('a_manage_business_view.number')" prop="businessnumber" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('a_manage_business_view.name')" prop="businessname" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('a_manage_business_view.id')" prop="businessid" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('a_manage_business_view.operating')" align="center">
          <template slot-scope="scope">
            <el-button type="info" plain @click="dialogFormVisible = true">{{ $t('a_manage_business_view.detail') }}</el-button>
            <el-button type="primary" plain @click="dialogTableVisible = true">{{ $t('a_manage_business_view.activity') }}</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div>
      <!--詳細資料-->
      <el-dialog :visible.sync="dialogFormVisible" width="80vw">
        <el-form :data="a_business_subsort" :model="a_business_view" label-position="left" inline class="dialog_container">
          <el-form-item :label="$t('a_manage_business_view.princiapl')">
            <el-input v-model="a_business_view.princiapl" type="text" readonly />
          </el-form-item>
          <el-form-item :label="$t('a_manage_business_view.number')">
            <el-input v-model="a_business_view.number" type="text" readonly />
          </el-form-item>
          <el-form-item :label="$t('a_manage_business_view.name')">
            <el-input v-model="a_business_view.name" type="text" readonly />
          </el-form-item>
          <el-form-item :label="$t('a_manage_business_view.id')">
            <el-input v-model="a_business_view.id" type="text" readonly />
          </el-form-item>
          <el-form-item :label="$t('a_manage_business_view.taxID')">
            <el-input v-model="a_business_view.taxID" type="text" readonly />
          </el-form-item>
          <el-form-item :label="$t('a_manage_business_view.telephone')">
            <el-input v-model="a_business_view.telephone" type="text" readonly />
          </el-form-item>
          <el-form-item :label="$t('a_manage_business_view.cellphone')">
            <el-input v-model="a_business_view.cellphone" type="text" readonly />
          </el-form-item>
          <el-form-item :label="$t('a_manage_business_view.extension')">
            <el-input v-model="a_business_view.extension" type="text" readonly />
          </el-form-item>
          <el-form-item :label="$t('a_manage_business_view.address')">
            <el-input v-model="a_business_view.address" type="text" readonly />
          </el-form-item>
        </el-form>
      </el-dialog>
      <!--優惠活動-->
      <el-dialog :visible.sync="dialogTableVisible" width="80vw">
        <div class="acivity_data">
          <el-table :data="a_business_activity" :default-sort="{prop: 'date', order: 'descending'}" stripe style="width: 100%;" max-height="470" fit>
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="table-expand">
                  <el-form-item :label="$t('a_manage_business_view.picture')">
                    <span>{{ props.row.picture }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column :label="$t('a_manage_business_view.preferentialname')" prop="name" align="center" />
            <el-table-column :label="$t('a_manage_business_view.preferentialcontent')" prop="content" align="center" />
            <el-table-column :label="$t('a_manage_business_view.status')" prop="status" align="center" />
            <el-table-column :label="$t('a_manage_business_view.topshelf')" prop="selltime" align="center" />
            <el-table-column :label="$t('a_manage_business_view.lowershelf')" prop="unselltime" align="center" />
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="primary" plain @click="handle_edit(scope.$index,scope.row)">{{ $t('a_manage_business_view.operating') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--編輯優惠活動-->
        <div class="dialog_avitvity">
          <el-dialog :visible.sync="a_business_visible" width="80vw" title="編輯">
            <el-form :model="a_business_activity_edit" :rules="a_business_activity_edit_rules" label-position="left" inline class="table-invoice">
              <el-form-item>
                <span>{{ $t('a_manage_business_view.notmodify') }}</span>
              </el-form-item>
              <el-form-item>
                <span />
              </el-form-item>
              <el-form-item :label="$t('a_manage_business_view.preferentialname')" prop="name">
                <el-input v-model="a_business_activity_edit.name" :placeholder="a_business_name_p" clearable />
              </el-form-item>
              <el-form-item :label="$t('a_manage_business_view.preferentialcontent')" prop="content">
                <el-input v-model="a_business_activity_edit.content" :placeholder="a_business_content_p" clearable />
              </el-form-item>
              <el-form-item :label="$t('a_manage_business_view.status')">
                <el-input v-model="a_business_activity_edit.status" :placeholder="a_business_status_p" clearable readonly />
              </el-form-item>
              <el-form-item :label="$t('a_manage_business_view.topshelf')">
                <el-input v-model="a_business_activity_edit.selltime" :placeholder="a_business_selltime_p" clearable type="date" />
              </el-form-item>
              <el-form-item :label="$t('a_manage_business_view.lowershelf')">
                <el-input v-model="a_business_activity_edit.unselltime" :placeholder="a_business_unselltime_p" clearable type="date" />
              </el-form-item>
            </el-form>

            <span slot="footer" class="invoice_dialog_footer">
              <el-button type="danger" plain @click="a_business_del()">{{ $t('a_manage_business_view.delete') }}</el-button>
              <el-button type="primary" @click="a_business_confirm()">{{ $t('a_manage_business_view.confirm') }}</el-button>
              <el-button type="info" plain @click="a_business_cal()">{{ $t('a_manage_business_view.cancel') }}</el-button>
            </span>

          </el-dialog>
        </div>

      </el-dialog>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波紋指令

export default {
  name: 'BManageBusiness',
  directives: {
    waves
  },
  data() {
    const validatename = (rule, value, callback) => {
      if (value.length > 10) {
        callback(new Error('優惠名稱不可以大於 10 個字'))
      } else {
        callback()
      }
    }
    const validatecontent = (rule, value, callback) => {
      if (value.length > 140) {
        callback(new Error('優惠內容不可以大於 140 個字'))
      } else {
        callback()
      }
    }
    return {
      selectuni_num: '',
      selectname: '',
      selectaccount: '',
      a_business_view: {
        princiapl: '',
        number: '',
        name: '',
        id: '',
        taxID: '',
        telephone: '',
        cellphone: '',
        extension: '',
        address: ''
      },
      a_business_name_p: '',
      a_business_content_P: '',
      a_business_status_p: '',
      a_business_selltime_p: '',
      a_business_unselltime_p: '',
      a_business_activity_edit: {
        content: '',
        name: '',
        status: '',
        selltime: '',
        unselltime: ''
      },
      dialogFormVisible: false,
      dialogTableVisible: false,
      a_business_visible: false,
      a_business_subsort: '',
      tableKey: 0,
      a_business_activity: [{
        name: 'missdior',
        content: '限時八折',
        status: '全新',
        selltime: '2018.09.02',
        unselltime: '2018.09.30'
      }
      ],
      a_business_table: [{
        number: '5487',
        name: '87小舖',
        id: 'iam878787'
      }
      ],
      a_business_activity_edit_rules: {
        name: [{ required: false, trigger: 'change', validator: validatename }],
        content: [{ required: false, trigger: 'change', validator: validatecontent }]
      },
      b_uni_num: [],
      b_name: [],
      b_account: []
    }
  },
  methods: {
    a_business_confirm() {
      this.$message({
        type: 'success',
        message: '已完成該筆資料修改'
      })
      this.a_business_visible = false
    },
    a_business_cal() {
      this.$message({
        type: 'info',
        message: '已取消修改'
      })
      this.a_business_visible = false
    },
    a_business_del() {
      this.$confirm('你真的要刪除該筆資料嗎？', '警告', {
        cancelButtonText: '取消',
        confirmButtonText: '確認',
        type: 'warning'
      }).then(() => {
        this.$confirm('請在確認一次是否要刪除該筆資料', '警告', {
          cancelButtonText: '取消',
          confirmButtonText: '確認',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '刪除成功'
          })
          this.a_business_visible = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消刪除'
          })
          this.a_business_visible = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刪除'
        })
        this.a_business_visible = false
      })
    }
  }
}
</script>
<style lang="scss">
.dialog_container {
  font-size: 0;
  padding-left: 9vw;
}
.dialog_container label {
  width: 110px;
  color: #99a9bf;
}
.dialog_container input {
  border: 0;
}
.dialog_container .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 50%;
}
</style>

