<template>
  <div class="app-container">
    <div class="filter-container">
      <title>
        {{ $t('route.a_manage_business_view.businessmember') }}
      </title>
      <el-select v-model="selectnumber" :remote-method="remoteMethod" :loading="loading" :placeholder="$t('a_manage_business_view.number')" filterable remote reserve-keyword>
        <el-option v-for="item in selnumber" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="selectname" :remote-method="remoteMethod" :loading="loading" :placeholder="$t('a_manage_business_view.name')" filterable remote reserve-keyword>
        <el-option v-for="item in selname" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="selectid" :remote-method="remoteMethod" :loading="loading" :placeholder="$t('a_manage_business_view.id')" filterable remote reserve-keyword>
        <el-option v-for="item in selid" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <!--遠程搜索-->
    </div>
    <!--外層Table-->
    <div>
      <el-table :data="a_business_table" fit>
        <el-table-column :label="$t('a_manage_business_view.number')" prop="businessnumber" class="number" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('a_manage_business_view.name')" prop="businessname" class="name" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('a_manage_business_view.id')" prop="businessid" class="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('a_manage_business_view.operating')" align="center">
          <template slot-scope="scope">
            <el-button type="info" plain @click="dialogFormVisible = true">{{ $t('a_manage_business_view.detail') }}</el-button>
            <el-button type="primary" plain @click="dialogTableVisible = true">{{ $t('a_manage_business_view.activity') }}</el-button>
            <!--@click="handleUpdate(scope.row)先拿掉-->
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div class="dialog_container">
      <!--詳細資料-->
      <el-dialog :visible.sync="dialogFormVisible" width="80vw">
        <el-form :data="a_business_subsort" label-position="left" inline class="table_dialog">
          <el-form-item :label="$t('a_manage_business_view.princiapl')" class="princiapl">
            <el-input v-model="a_business_edit.princiapl" type="text" class="princiapl" readonly />
          </el-form-item>
          <el-form-item :label="$t('a_manage_business_view.number')" class="labelnumber">
            <el-input v-model="a_business_edit.number" type="text" class="number" readonly />
          </el-form-item>
          <el-form-item :label="$t('a_manage_business_view.name')" class="labelname">
            <el-input v-model="a_business_edit.namel" type="text" class="name" readonly />
          </el-form-item>
          <el-form-item :label="$t('a_manage_business_view.id')" class="labelid">
            <el-input v-model="a_business_edit.id" type="text" class="id" readonly />
          </el-form-item>
          <el-form-item :label="$t('a_manage_business_view.taxID')" class="labeltaxID">
            <el-input v-model="a_business_edit.taxID" type="text" class="taxID" readonly />
          </el-form-item>
          <el-form-item :label="$t('a_manage_business_view.telephone')" class="labeltelephone">
            <el-input v-model="a_business_edit.telephone" type="text" class="telephone" readonly />
          </el-form-item>
          <el-form-item :label="$t('a_manage_business_view.cellphone')" class="labelcellphone">
            <el-input v-model="a_business_edit.cellphone" type="text" class="cellphone" readonly />
          </el-form-item>
          <el-form-item :label="$t('a_manage_business_view.extension')" class="labelextension">
            <el-input v-model="a_business_edit.extension" type="text" class="extension" readonly />
          </el-form-item>
          <el-form-item :label="$t('a_manage_business_view.address')" class="labeladdress">
            <el-input v-model="a_business_edit.address" type="text" class="address" readonly />
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
        <div class="dialog_acitvity">
          <el-dialog :visible.sync="a_business_visible" width="80vw" title="編輯">
            <el-form :model="a_business_edit" :rules="a_business_edit_rules" label-position="left" inline class="dialog_activity">
              <el-form-item>
                <span>{{ $t('a_manage_business_view.notmodify') }}</span>
              </el-form-item>
              <el-form-item>
                <span />
              </el-form-item>
              <el-form-item :label="$t('a_manage_business_view.preferentialname')" prop="name">
                <el-input v-model="a_business_edit.name" :placeholder="a_business_name_p" name="name" class="name" clearable />
              </el-form-item>
              <el-form-item :label="$t('a_manage_business_view.preferentialcontent')" prop="content">
                <el-input v-model="a_business_edit.content" :placeholder="a_business_content_p" name="content" class="content" clearable />
              </el-form-item>
              <el-form-item :label="$t('a_manage_business_view.status')">
                <el-input v-model="a_business_edit.status" :placeholder="a_business_status_p" class="status" clearable readonly />
              </el-form-item>
              <el-form-item :label="$t('a_manage_business_view.topshelf')">
                <el-input v-model="a_business_edit.selltime" :placeholder="a_business_selltime_p" class="sellime" clearable type="date" />
              </el-form-item>
              <el-form-item :label="$t('a_manage_business_view.lowershelf')">
                <el-input v-model="a_business_edit.unselltime" :placeholder="a_business_unselltime_p" class="unselltime" clearable type="date" />
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
import { fetchList } from '@/api/article'
import waves from '@/directive/waves' // 水波紋指令
import { } from '@/utils'

export default {
  name: 'BusinessTable',
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
      a_business_name_p: '',
      a_business_content_P: '',
      a_business_status_p: '',
      a_business_selltime_p: '',
      a_business_unselltime_p: '',
      number: '',
      id: '',
      name: '',
      content: '',
      status: '',
      selltime: '',
      unselltime: '',
      a_business_edit: {
        content: '',
        name: '',
        status: '',
        selltime: '',
        unselltime: ''
      },
      dialogFormVisible: false,
      dialogTableVisible: false,
      a_business_visible: false,
      a_business_subsort: null,
      tableKey: 0,
      /* --list: null,*/
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id',
        selnumber: [],
        selectnumber: [],
        selname: [],
        selectname: [],
        selid: [],
        selectid: [],
        list: [],
        loading: false,
        states: ['apple', 'banana', '超商']
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
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
      a_business_edit_rules: {
        name: [{ required: false, trigger: 'change', validator: validatename }],
        content: [{ required: false, trigger: 'change', validator: validatecontent }]
      },
      downloadLoading: false
    }
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item }
    })
  },
  created() {
    this.getList()
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.selnumber = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
          this.selname = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
          this.selid = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.selnumber = []
        this.selname = []
        this.selid = []
      }
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handle_edit(index, row) {
      this.a_business_name_p = row.date
      this.a_business_content_p = row.invoice
      this.a_business_status_p = row.account
      this.a_business_selltime_p = row.amount
      this.a_business_unselltime_p = row.amount
      this.a_business_visible = true
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
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
.table_dialog {
  font-size: 0;
}
.table_dialog label {
  width: 100px;
  color: #99a9bf;
}
.table_dialog .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 50%;
}
.dialog_activity {
  font-size: 0;
}
.dialog_activity label {
  width: 100px;
  color: #99a9bf;
}
.dialog_activity .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 50%;
}
