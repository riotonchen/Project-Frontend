<template>

  <div class="history_container">
    <title>
      {{ $t('route.c_history') }}
    </title>

    <div class="filter_container">
      <el-row class="date_seletor">
        <el-col :xs="6" :sm="3" :md="2" :lg="2" :xl="1" class="selector_title">
          <span>用時間篩選</span>
        </el-col>
        <el-col :xs="24" :sm="15" :md="9" :lg="8" :xl="6">
          <el-date-picker v-model="startenddate" :start-placeholder="$t('c_history.startdate')" :end-placeholder="$t('c_history.enddate')" range-separator="-" align="center" type="daterange" style="width: 40vw;min-width:15rem;max-width:23rem;" />
        </el-col>
      </el-row>
      <el-row class="class_seletor">
        <el-col :xs="6" :sm="3" :md="2" :lg="2" :xl="1" class="selector_title">
          <span>用類別篩選</span>
        </el-col>
        <el-col :xs="24" :sm="15" :md="9" :lg="8" :xl="6">
          <el-select v-model="c_payorin" filterable clearable placeholder="收支出" style="width: 25vw;max-width:7.5rem;min-width:5.5rem;">
            <el-option v-for="payorin in c_pay_in" :key="payorin.value" :label="payorin.label" :value="payorin.value" />
          </el-select>
          <el-select v-model="c_sort" :disabled="c_sort_disable" filterable placeholder="主類別" style="width: 25vw;max-width:7.5rem;min-width:6.5rem;" @focus="get_sort()" @change="get_subsort()">
            <el-option v-for="sort in c_sort_payorinitem" :key="sort.id" :label="sort.name" :value="sort.id" />
          </el-select>
          <el-select v-model="c_subsort" :disabled="c_subsort_disable" filterable placeholder="子類別" style="width: 25vw;max-width:7.5rem;min-width:6.5rem;">
            <el-option v-for="subsort in c_subsort_payorinitem" :key="subsort.id" :label="subsort.name" :value="subsort.id" />
          </el-select>
        </el-col>
      </el-row>
      <el-row class="project_seletor">
        <el-col :xs="6" :sm="3" :md="2" :lg="2" :xl="1" class="selector_title">
          <span>用專案篩選</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="9" :lg="8" :xl="6">
          <el-select v-model="c_project" filterable placeholder="專案" style="width: 25vw;max-width:13.2rem;min-width:11.8rem;" @focus="get_project()">
            <el-option v-for="project in c_projectitem" :key="project.id" :label="project.name" :value="project.id" />
          </el-select>
        </el-col>
      </el-row>
      <el-row class="account_seletor">
        <el-col :xs="6" :sm="3" :md="2" :lg="2" :xl="1" class="selector_title">
          <span>用帳戶篩選</span>
        </el-col>
        <el-col :xs="24" :sm="15" :md="9" :lg="8" :xl="6">
          <el-select v-model="c_account" filterable placeholder="帳戶" style="width: 25vw;max-width:13.2rem;min-width:11.8rem;" @focus="get_account()">
            <el-option v-for="account in c_accountitem" :key="account.id" :label="account.name" :value="account.id" />
          </el-select>
        </el-col>
      </el-row>
    </div>

    <div class="history_table_container">
      <!--目前使用日期做排序-->
      <el-table :data="c_user_history" :default-sort="{prop: 'date', order: 'descending'}" stripe style="width: 100%;" max-height="470" fit>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="備註">
                <span>{{ props.row.comment }}</span>
              </el-form-item>
              <el-form-item label="商品圖樣">
                <span>{{ props.row.picture }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期" sortable align="center" />
        <el-table-column prop="invoice" label="發票" align="center" />
        <el-table-column prop="payorin" label="收支出" align="center" />
        <el-table-column prop="sort" label="分類" align="center" />
        <el-table-column prop="subsort" label="子分類" align="center" />
        <el-table-column prop="project" label="專案" align="center" />
        <el-table-column prop="account" label="帳戶" align="center" />
        <el-table-column prop="amount" label="金額" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="handle_edit(scope.$index,scope.row)">編輯</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog_container">
      <el-dialog :visible.sync="c_history_visible" width="80vw" title="編輯">
        <el-form :model="c_history_edit" label-position="left" inline class="table-invoice">
          <el-form-item>
            <span>以下如不修改保持空白即可</span>
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker v-model="c_history_edit.date" :placeholder="c_history_date_p" type="date" />
          </el-form-item>
          <el-form-item label="發票號碼">
            <el-input v-model="c_history_edit.invoice" :placeholder="c_history_invoice_p" clearable />
          </el-form-item>
          <el-form-item label="帳戶">
            <el-select v-model="c_history_edit.account" :placeholder="c_history_account_p" filterable style="width: 25vw;max-width:13.2rem;min-width:11.8rem;" @focus="get_account()">
              <el-option v-for="account in c_accountitem" :key="account.id" :label="account.name" :value="account.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="金額">
            <el-input v-model="c_history_edit.amount" :placeholder="c_history_amount_p" clearable />
          </el-form-item>
          <hr>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item label="收支出">
            <el-select v-model="c_history_edit.payorin" filterable placeholder="收支出" style="width: 25vw;max-width:7.5rem;min-width:6.5rem;">
              <el-option v-for="payorin in c_pay_in" :key="payorin.value" :label="payorin.label" :value="payorin.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="主類別">
            <el-select v-model="c_history_edit.sort" :disabled="c_sort_disable" filterable placeholder="主類別" style="width: 25vw;max-width:7.5rem;min-width:6.5rem;" @focus="get_sort()" @change="get_subsort()">
              <el-option v-for="sort in c_sort_payorinitem" :key="sort.id" :label="sort.name" :value="sort.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="子類別">
            <el-select v-model="c_history_edit.subsort" :disabled="c_subsort_disable" filterable placeholder="子類別" style="width: 25vw;max-width:7.5rem;min-width:6.5rem;">
              <el-option v-for="subsort in c_subsort_payorinitem" :key="subsort.id" :label="subsort.name" :value="subsort.id" />
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer" class="invoice_dialog_footer">
          <el-button type="danger" plain @click="c_history_del()">刪除</el-button>
          <el-button type="primary" @click="c_history_confirm()">確定</el-button>
          <el-button type="info" plain @click="c_history_cal()">取消</el-button>
        </span>

      </el-dialog>
    </div>
  </div>
</template>
<script>

// import { parseTime } from '@/utils'

import waves from '@/directive/waves' // 水波紋指令
import { getsort_pay, getsort_in } from '@/api/sort/getsort'
import { getsubsort } from '@/api/subsort/getsubsort'
import { getproject } from '@/api/project/getproject'
import { getaccount } from '@/api/account/getaccount'
import { getToken } from '@/utils/auth'

export default {
  name: 'CHistory',
  directives: {
    waves
  },
  data() {
    return {
      startenddate: '',
      c_payorin: '',
      c_sort: '',
      c_subsort: '',
      c_project: '',
      c_account: '',
      c_history_edit:
      {
        date: '',
        invoice: '',
        account: '',
        amount: '',
        payorin: '',
        sort: '',
        subsort: ''
      },
      c_history_date_p: '',
      c_history_invoice_p: '',
      c_history_account_p: '',
      c_history_amount_p: '',
      c_sort_payorinitem: [],
      c_subsort_payorinitem: [],
      c_projectitem: [],
      c_accountitem: [],
      c_sort_disable: true,
      c_subsort_disable: true,
      c_history_visible: false,
      c_pay_in: [{ label: '支出', value: 0 }, { label: '收入', value: 1 }],
      c_user_history: [
        // test data
        {
          date: '2016-05-22',
          invoice: 'EV-89658002',
          payorin: '支出',
          sort: '吃吃吃',
          subsort: '早餐',
          project: '團遊',
          account: '現金',
          amount: '500',
          comment: '幹，nfjqbcbhjgzd554654',
          picture: '我是圖片'
        }, {
          date: '2016-09-02',
          invoice: 'EV-89658002',
          payorin: '支出',
          sort: '出去玩',
          subsort: '劍湖山',
          project: '單身旅行',
          account: '耶耶耶耶耶',
          amount: '5867600',
          comment: '幹，huihqfqkhfowi',
          picture: '我是圖片'
        }, {
          date: '2016-07-02',
          invoice: 'EV-89658002',
          payorin: '支出',
          sort: '吃吃吃',
          subsort: '早餐',
          project: '不要不要',
          account: '美國運東',
          amount: '50887660',
          comment: '幹，164165feqfbh',
          picture: '我是圖片'
        }, {
          date: '2016-05-05',
          invoice: 'EV-89658002',
          payorin: '支出',
          sort: '阿咧咧',
          subsort: '出去玩',
          project: '團遊',
          account: '老子沒錢',
          amount: '9000',
          comment: 'dqwfegeqqwd ',
          picture: '我是圖片'
        }, {
          date: '2086-05-02',
          invoice: 'EV-89658002',
          payorin: '支出',
          sort: '喝寶寶',
          subsort: '爽拉拉拉',
          project: '與左右手的旅行',
          account: '玉山信用卡',
          amount: '8156610',
          comment: 'dnwiuqg56461',
          picture: '我是圖片'
        }]
    }
  },
  watch: {
    c_payorin: function(newc_payorin, oldc_payorin) {
      if (oldc_payorin === '') {
        this.c_sort_disable = false
      } else if (newc_payorin !== oldc_payorin) {
        this.c_sort = ''
        this.c_subsort = ''
        this.get_sort()
      }
    },
    c_sort: function(newc_sort, oldc_sort) {
      if (oldc_sort === '') {
        this.c_subsort_disable = false
      } else if (newc_sort !== oldc_sort) {
        this.c_subsort = ''
        this.get_subsort()
      }
    },
    c_subsort: function(newc_subsort, oldc_subsort) {
      if (oldc_subsort === '') {
        this.c_subsort_disable = false
      } else if (this.c_sort === '') {
        this.c_subsort_disable = true
      }
    }
  },
  methods: {
    // test table
    formatter(row, column) {
      return row.address
    },
    get_sort() {
      if (this.c_payorin === 0) {
        getsort_pay(getToken()).then(response => {
          this.c_sort_payorinitem = response.data
        }).catch((error) => {
          console.log(error)
        })
      } else {
        getsort_in(getToken()).then(response => {
          this.c_sort_payorinitem = response.data
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    get_subsort() {
      getsubsort(getToken(), this.c_sort).then(response => {
        if (response.data.length !== 0) {
          this.c_subsort_payorinitem = response.data
        } else {
          this.c_subsort_disable = true
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    get_project() {
      getproject(getToken()).then(response => {
        this.c_projectitem = response.data
      }).catch((error) => {
        console.log(error)
      })
    },
    get_account() {
      getaccount(getToken()).then(response => {
        this.c_accountitem = response.data
      }).catch((error) => {
        console.log(error)
      })
    },
    handle_edit(index, row) {
      this.c_history_date_p = row.date
      this.c_history_invoice_p = row.invoice
      this.c_history_account_p = row.account
      this.c_history_amount_p = row.amount
      this.c_history_visible = true
    },
    handle_filter() {

    },
    c_history_confirm() {
      this.$message({
        type: 'success',
        message: '已完成該筆資料修改'
      })
      this.c_history_visible = false
    },
    c_history_cal() {
      this.$message({
        type: 'info',
        message: '已取消修改'
      })
      this.c_history_visible = false
    },
    c_history_del() {
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
          this.c_card_visible = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消刪除'
          })
          this.c_history_visible = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刪除'
        })
        this.c_history_visible = false
      })
    }
    /*
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

    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },

    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },

    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '創建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
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
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
      */
  }
}
</script>
<style lang="scss">
.history_container {
  padding: 20px;
}
.selector_title {
  line-height: 2.25rem;
  font-size: 0.7vw;
}

.history-container {
  padding: 20px;
}

.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}

.table-invoice {
  font-size: 0;
}
.table-invoice label {
  width: 90px;
  color: #99a9bf;
}
.table-invoice .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 50%;
}
</style>

