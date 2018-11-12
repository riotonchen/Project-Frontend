<template>
  <div class="app-container">
    <title>
      {{ $t('route.c_category') }}
    </title>
    <!--搜尋分類-->
    <div class="filter_container">
      <el-select v-model="c_sort_payorin" :placeholder="$t('c_category.incomespend')" filterable clearable style="width: 10vw;max-width:8rem;min-width:5rem;" @focus="get_category()" @change="get_category()">
        <el-option v-for="payorin in c_pay_in" :key="payorin.value" :label="payorin.label" :value="payorin.value" />
      </el-select>
      <!--
      <el-select v-model="c_sort_id" :disabled="c_sort_disable" :placeholder="$t('c_category.mainsortname')" clearable filterable style="width: 25vw;max-width:7.5rem;min-width:6.5rem;"@focus="get_category()" @change="get_category()" >
        <el-option v-for="sort in c_category_list" :key="sort.sort_id.id" :label="sort.sort_id.name" :value="sort.sort_id.id" />
      </el-select>
      -->
      <el-date-picker v-model="startenddate" :placeholder="$t('c_category.choose')" :clearable="datepickerclea" value-format="yyyy-MM" align="center" type="month" style="width: 10vw;min-width:7rem;max-width:10rem;" />

      <!--新增主分類-->
      <span slot="footer" class="invoice_dialog_footer">
        <el-button type="primary" @click.native.prevent="open_add_mainsort()">{{ $t('c_category.addmainsort') }}</el-button>
      </span>

      <!--外層表單設計之表格-->
      <div class="category_table_container">
        <el-table v-loading.fullscreen.lock="view_loading" :data="c_category_list" :element-loading-text="$t('c_category.loadingtext')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.9)" stripe style="width: 100%;" max-height="500" fit>
          <el-table-column type="index" align="center" />
          <el-table-column :label="$t('c_category.name')" prop="name" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.sort_id.name }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('c_category.budgetmonth')" prop="allin" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.budget }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('c_category.spendingmonth')" prop="allout" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.amount }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('c_category.remainingbudget')" prop="balance" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.balance }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('c_category.operation')" align="center">
            <template slot-scope="scope">
              <el-button type="info" plain @click.native.prevent="handle_edit_sort(scope.$index,scope.row)">{{ $t('c_category.edit') }}</el-button>
              <el-button type="primary" plain @click.native.prevent="handle_edit_subsort(scope.$index,scope.row)">{{ $t('c_category.advanced') }}</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>

      <!--編輯主類別之表單-->
      <el-dialog :visible.sync="c_category_editsort_visible" :title="$t('c_category.edit')" width="80vw">

        <!--:rules="c_category_editsort_rules"-->
        <el-form ref="c_sort_edit" :model="c_sort_edit" label-position="left" inline class="table_category">
          <el-form-item>
            <span>{{ $t('c_category.notmodify') }}</span>
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item label="年月" prop="date">
            <el-date-picker v-model="c_sort_edit.date" :placeholder="c_category_date_p" readonly align="center" type="month" class="date" />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item :label="$t('c_category.mainsortname')" prop="name">
            <el-input v-model="c_sort_edit.name" :placeholder="c_category_sortname_p" clearable @focus="clean_add_sort()" />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item label="本月預算" prop="budget">
            <el-input v-model="c_sort_edit.budget" :placeholder="c_category_budget_p" clearable @focus="clean_add_budget()" />
          </el-form-item>
        </el-form>

        <span slot="footer" class="invoice_dialog_footer">
          <el-button type="danger" plain @click.native.prevent="c_category_sort_del()">{{ $t('c_category.delete') }}</el-button>
          <el-button type="primary" @click.native.prevent="c_category_sort_confirm()">{{ $t('c_category.confirm') }}</el-button>
          <el-button type="info" plain @click.native.prevent="c_category_cal()">{{ $t('c_category.cancel') }}</el-button>
        </span>

      </el-dialog>
      <!--新增主類別之表單-->
      <el-dialog :visible.sync="c_category_sort_add_visible" :title="$t('c_category.add')" width="80vw">

        <!--:rules="c_sort_add_rules"-->
        <el-form ref="c_sort_add" :model="c_sort_add" label-position="left" inline class="table_sort">

          <el-form-item :label="$t('c_category.mainsortname')" prop="payorin">
            <el-select v-model="c_sort_add.payorin" :placeholder="$t('c_category.incomespend')" filterable clearable style="width: 10vw;max-width:8rem;min-width:5rem;">
              <el-option v-for="payorin in c_pay_in" :key="payorin.value" :label="payorin.label" :value="payorin.value" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('c_category.mainsortname')" prop="name">
            <el-input v-model="c_sort_add.name" :placeholder="$t('c_category.amount')" name="name" clearable />
          </el-form-item>
        </el-form>

        <span slot="footer" class="invoice_dialog_footer">
          <el-button type="primary" @click.native.prevent="c_category_sortadd()">{{ $t('c_category.confirm') }}</el-button>
          <el-button type="info" plain @click.native.prevent="c_category_cal()">{{ $t('c_category.cancel') }}</el-button>
        </span>
      </el-dialog>

      <el-dialog :visible.sync="c_category_sub_visible" :title="$t('c_category.subclass')" width="80vw">
        <!--搜尋子分類-->
        <div class="filter_container">
          <el-select v-model="c_subsort_id" :placeholder="$t('c_category.subclass')" clearable filterable style="width: 25vw;max-width:7.5rem;min-width:6.5rem;" @change="get_subsort_item_single()">
            <el-option v-for="subsort in c_subsort_in_options" :key="subsort.id" :label="subsort.name" :value="subsort.id" />
          </el-select>

          <!--新增子分類-->
          <span slot="footer" class="invoice_dialog_footer">
            <el-button type="primary" @click.native.prevent="add_subsort_visible()">{{ $t('c_category.addsubclass') }}</el-button>
          </span>

          <!--內層表單設計之表格-->
          <div class="subsort_table_container">
            <el-table :data="c_subsort_in_item" stripe style="width: 100%;" max-height="300" fit>
              <el-table-column :label="$t('c_category.name')" prop="name" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column :label="$t('c_category.spendingmonth')" prop="allin" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.allin }}</span>
                </template>
              </el-table-column>

              <el-table-column :label="$t('c_category.operation')" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" plain @click.native.prevent="handle_insub_edit(scope.$index,scope.row)">{{ $t('c_category.edit') }}</el-button>
                </template>
              </el-table-column>

            </el-table>
          </div>
        </div>
      </el-dialog>
      <!--編輯子分類名稱之表單-->
      <el-dialog :visible.sync="c_category_sub_confi_visible" :title="$t('c_category.edit')" width="80vw">
        <!--:rules="c_category_edit_rules"-->
        <el-form ref="c_subsort_edit" :model="c_subsort_edit" label-position="left" inline class="table_category">
          <el-form-item>
            <span>{{ $t('c_category.notmodify') }}</span>
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item :label="$t('c_category.subclassname')" prop="name">
            <el-input v-model="c_subsort_edit.name" :placeholder="c_category_name_p" name="name" clearable @focus="clean_name()" />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
        </el-form>

        <span slot="footer" class="invoice_dialog_footer">
          <el-button type="danger" plain @click.native.prevent="c_category_subsort_del()">{{ $t('c_category.delete') }}</el-button>
          <el-button type="primary" @click.native.prevent="c_category_subsort_confirm()">{{ $t('c_category.confirm') }}</el-button>
          <el-button type="info" plain @click.native.prevent="c_category_cal()">{{ $t('c_category.cancel') }}</el-button>
        </span>

      </el-dialog>
      <!--新增子分類之表單-->
      <el-dialog :visible.sync="c_category_subsort_add_visible" :title="$t('c_category.add')" width="80vw">
        <!--:rules="c_category_edit_rules"-->
        <el-form ref="c_subsort_edit" :model="c_subsort_edit" label-position="left" inline class="table_sort">
          <el-form-item :label="$t('c_category.subclassname')" prop="subname">
            <el-input v-model="c_subsort_edit.subname" :placeholder="$t('c_category.amount')" name="subname" clearable />
          </el-form-item>
        </el-form>

        <span slot="footer" class="invoice_dialog_footer">
          <el-button type="primary" @click.native.prevent="c_category_subsortadd()">{{ $t('c_category.confirm') }}</el-button>
          <el-button type="info" plain @click.native.prevent="c_category_cal()">{{ $t('c_category.cancel') }}</el-button>
        </span>

      </el-dialog>
    </div>
  </div>
</template>
<script>

import waves from '@/directive/waves' // 水波紋指令
import { getToken } from '@/utils/auth'
import { formatdate, formatdate_inc_time } from '@/utils/index'
import { getsubsort, getsinglesubsort } from '@/api/subsort/getsubsort'
import { getsortbudget_all } from '@/api/sortbudget/getsortbudget'
import { postsort } from '@/api/sort/postsort'
import { postsubsort } from '@/api/subsort/postsubsort'
import { patchsort_update, patchsort_delete } from '@/api/sort/patchsort'
import { patchsubsort_update, patchsubsort_delete } from '@/api/subsort/patchsubsort'
export default {
  name: 'CCategoryory',
  directives: {
    waves
  },
  data() {
    return {
      startenddate: formatdate('yyyy-mm'),
      globledate: formatdate('yyyy-mm-dd HH:MM:ss.l'),
      c_sort_payorin: '',
      c_sort_id: '',
      c_subsort_id: '',
      c_project: '',
      c_account: '',
      c_category_name_p: '',
      c_sort_edit: {
        id: '',
        date: '',
        name: '',
        budget: ''
      },
      c_subsort_edit: {
        id: '',
        subname: ''
      },
      c_sort_add: {
        name: '',
        payorin: ''
      },
      c_category_sortname_p: '',
      c_category_editsort: {
        id: '',
        name: '',
        type: ''
      },
      sortbudget_id: '',
      c_subsort_in_options: [],
      c_subsort_in_item: [],
      c_sort_disable: true,
      c_subsort_disable: true,
      c_category_editsort_visible: false,
      c_category_sub_visible: false,
      c_category_sub_confi_visible: false,
      c_category_subsort_add_visible: false,
      c_category_sort_add_visible: false,
      datepickerclea: false,
      view_loading: true,
      c_pay_in: [{ label: '支出', value: 0 }, { label: '收入', value: 1 }],
      c_category_list: [],

      c_category_date_p: '',
      c_category_budget_p: ''
    }
  },
  watch: {
    c_sort_payorin: function(newc_payorin, oldc_payorin) {
      if (oldc_payorin === '') {
        this.c_sort_disable = false
      } else if (newc_payorin !== 1 && newc_payorin !== 0) {
        this.c_sort_disable = true
        this.c_sort_id = ''
      } else if (newc_payorin !== oldc_payorin) {
        this.c_sort_id = ''
        this.get_category()
      }
    },
    startenddate: function(newdate, olddate) {
      const todayplus3 = new Date()
      const todayde3 = new Date()
      const time = new Date(newdate)
      todayplus3.setTime(todayplus3.getTime() + 3600 * 1000 * 24 * 90)
      todayde3.setTime(todayde3.getTime() - 3600 * 1000 * 24 * 90)
      time.setTime(time.getTime())

      if (time > todayplus3 || time < todayde3) {
        this.startenddate = formatdate('yyyy-mm')
        this.$message({
          type: 'warning',
          message: '只能選擇前後各三個月的時間'
        })
      } else if (newdate !== olddate) {
        this.get_category()
      }
    }
  },
  created() {
    this.page_load()
  },
  methods: {
    page_load() {
      setTimeout(() => {
        this.view_loading = false
        this.get_category()
      }, 500)
    },
    clean_add_sort() {
      this.c_sort_edit.name = ''
    },
    clean_add_budget() {
      this.c_sort_edit.budget = ''
    },
    get_category() {
      this.c_category_list = []
      let send_payin
      if (this.c_sort_payorin !== '') {
        if (this.c_sort_payorin === 0) {
          send_payin = 'False'
        } else {
          send_payin = 'True'
        }
        getsortbudget_all(getToken(), this.startenddate.substring(0, 4), this.startenddate.substring(5, 8), send_payin).then((res) => {
          this.c_category_list = res.data
        })
      } else {
        getsortbudget_all(getToken(), this.startenddate.substring(0, 4), this.startenddate.substring(5, 8)).then((res) => {
          this.c_category_list = res.data
        })
      }
    },
    open_add_mainsort() {
      this.c_category_sort_add_visible = true
    },
    c_category_sortadd() {
      postsort(getToken(), this.c_sort_add.payorin, this.c_sort_add.name)
        .then(() => {
          this.$message({
            type: 'success',
            message: '新增一筆主分類成功'
          })
          this.get_category()
          this.c_category_sort_add_visible = false
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: '發生一點錯誤，請稍後再做修改'
          })
          this.get_category()
          this.c_category_sort_add_visible = false
        })
    },
    add_subsort_visible() {
      this.c_category_subsort_add_visible = true
    },
    c_category_subsortadd() {
      postsubsort(getToken(), this.c_sort_edit.id, this.c_subsort_edit.subname, this.c_category_editsort.type).then(() => {
        this.$message({
          type: 'success',
          message: '已新增一筆子分類'
        })
        this.get_subsort_item()
        this.c_category_subsort_add_visible = false
      }).catch((error) => {
        console.log(error)
        this.$message({
          type: 'error',
          message: '發生一點錯誤，請稍後再做修改'
        })
      })
      this.c_category_subsort_add_visible = false
    },
    handle_edit_sort(index, row) {
      this.c_category_editsort_visible = true
      this.sortbudget_id = row.id
      this.c_sort_edit.id = row.sort_id.id
      this.c_sort_edit.name = row.sort_id.name
      this.c_category_sortname_p = row.sort_id.name
      this.c_sort_edit.budget = row.budget
      this.c_sort_edit.budget_p = row.budget
      this.c_sort_edit.date = this.startenddate
      this.c_category_date_p = this.startenddate
    },
    handle_edit_subsort(index, row) {
      this.c_category_sub_visible = true
      this.c_sort_edit.id = row.sort_id.id
      this.c_category_editsort.type = row.sort_id.type
      this.get_subsort_item()
    },
    handle_insub_edit(index, row) {
      this.c_category_sub_confi_visible = true
      this.c_subsort_edit.id = row.id
      this.c_category_name_p = row.name
      this.c_subsort_edit.name = row.name
    },
    get_subsort_item() {
      getsubsort(getToken(), this.c_sort_edit.id)
        .then((res) => {
          this.c_subsort_in_item = res.data
          this.c_subsort_in_options = res.data
        })
    },
    get_subsort_item_single() {
      this.c_subsort_in_item = []
      if (this.c_subsort_id !== '') {
        getsinglesubsort(getToken(), this.c_subsort_id)
          .then((res) => {
            this.c_subsort_in_item.push(res.data)
          })
      } else {
        this.c_subsort_in_item = []
        this.get_subsort_item()
      }
    },
    c_category_sort_confirm() {
      patchsort_update(getToken(), this.c_sort_edit.id, this.c_sort_edit.name, this.globledate)
        .then(() => {
          this.$message({
            type: 'success',
            message: '修改一筆主分類成功'
          })
          this.get_category()
          this.c_category_editsort_visible = false
        })
        .catch((error) => {
          console.log(error)
          this.$message({
            type: 'error',
            message: '發生一點錯誤，請稍後再做修改'
          })
          this.get_category()
          this.c_category_editsort_visible = false
        })
    },
    c_category_cal() {
      this.c_category_sort_add_visible = false
      this.c_category_editsort_visible = false
      this.c_category_subsort_add_visible = false
      this.c_category_sub_confi_visible = false
    },
    c_category_sort_del() {
      this.$confirm('你真的要刪除該主分類嗎？', '警告', {
        cancelButtonText: '取消',
        confirmButtonText: '確認',
        type: 'warning'
      }).then(() => {
        this.$confirm('請在確認一次是否要刪除該主分類', '警告', {
          cancelButtonText: '取消',
          confirmButtonText: '確認',
          type: 'warning'
        }).then(() => {
          patchsort_delete(getToken()
            , this.c_sort_edit.id
            , this.globledate)
            .then(() => {
              this.$message({
                type: 'success',
                message: '刪除成功'
              })
              this.get_category()
              this.c_category_editsort_visible = false
            })
            .catch((error) => {
              console.log(error)
              this.$message({
                type: 'error',
                message: '發生一點錯誤，請稍後再做修改'
              })
            })
          this.c_category_editsort_visible = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消刪除'
          })
          this.c_category_editsort_visible = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刪除'
        })
        this.c_category_editsort_visible = false
      })
    },
    c_category_subsort_del() {
      this.$confirm('你真的要刪除該主分類嗎？', '警告', {
        cancelButtonText: '取消',
        confirmButtonText: '確認',
        type: 'warning'
      }).then(() => {
        this.$confirm('請在確認一次是否要刪除該主分類', '警告', {
          cancelButtonText: '取消',
          confirmButtonText: '確認',
          type: 'warning'
        }).then(() => {
          patchsubsort_delete(getToken()
            , this.c_subsort_edit.id
            , this.globledate)
            .then(() => {
              this.$message({
                type: 'success',
                message: '刪除成功'
              })
              this.get_category()
              this.c_category_editsort_visible = false
            })
            .catch((error) => {
              console.log(error)
              this.$message({
                type: 'error',
                message: '發生一點錯誤，請稍後再做修改'
              })
            })
          this.c_category_editsort_visible = false
        })
        /* .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消刪除'
          })
          this.c_category_editsort_visible = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刪除'
        })*/
        this.c_category_editsort_visible = false
      })
    }
  }
}
</script>
<style lang="scss">
.category_container {
  padding: 20px;
}
.selector_title {
  line-height: 2.25rem;
  font-size: 0.7vw;
}

.history-container {
  padding: 20px;
}

.table_sort {
  font-size: 0;
}
.table_sort label {
  width: 90px;
  color: #99a9bf;
}
.table_sort .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 100%;
}
.table_category {
  font-size: 0;
}
.table_category label {
  width: 90px;
  color: #99a9bf;
}
.table_category .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 50%;
}
.table_category .date input {
  border: 0;
}
</style>

