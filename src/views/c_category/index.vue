<template>
  <div class="app-container">
    <title>
      {{ $t('route.c_category') }}
    </title>
    <!--搜尋分類-->
    <div class="filter_container">
      <el-select
        v-model="c_sort_payorin"
        :placeholder="$t('c_category.incomespend')"
        filterable
        clearable
        style="width: 10vw;max-width:8rem;min-width:5rem;"
        @focus="get_category()"
        @change="get_category()"
      >
        <el-option
          v-for="payorin in c_pay_in"
          :key="payorin.value"
          :label="payorin.label"
          :value="payorin.value"
        />
      </el-select>
      <el-select
        v-model="c_sort_id"
        :disabled="c_sort_disable"
        :placeholder="$t('c_category.mainsortname')"
        clearable
        filterable
        style="width: 25vw;max-width:7.5rem;min-width:6.5rem;"
        @focus="get_category()"
        @change="get_category()"
      >
        <el-option
          v-for="sort in c_category_list_option"
          :key="sort.sort_id.id"
          :label="sort.sort_id.name"
          :value="sort.sort_id.id"
        />
      </el-select>

      <el-date-picker
        v-model="startenddate"
        :placeholder="$t('c_category.choose')"
        :clearable="datepickerclea"
        value-format="yyyy-MM"
        align="center"
        type="month"
        style="width: 10vw;min-width:9rem;max-width:12rem;"
      />

      <!--新增主分類-->
      <span
        slot="footer"
        class="invoice_dialog_footer"
      >
        <el-button
          type="primary"
          @click.native.prevent="handle_add_mainsort()"
        >{{ $t('c_category.addmainsort') }}</el-button>
      </span>

      <!--外層表單設計之表格-->
      <div class="category_table_container">
        <el-table
          v-loading.fullscreen.lock="view_loading"
          :data="c_category_list"
          :element-loading-text="$t('c_category.loadingtext')"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.9)"
          stripe
          style="width: 100%;"
          max-height="650"
          fit
        >
          <el-table-column
            type="index"
            align="center"
          />
          <el-table-column
            :label="$t('c_category.name')"
            prop="name"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.sort_id.name }}</span>
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('c_category.budgetmonth')"
            prop="budget"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.budget }}</span>
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('c_category.spendingmonth')"
            prop="amount"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.amount }}</span>
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('c_category.remainingbudget')"
            prop="balance"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.balance }}</span>
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('c_category.operation')"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="info"
                plain
                @click.native.prevent="handle_edit_sort(scope.$index,scope.row)"
              >{{ $t('c_category.edit') }}</el-button>
              <el-button
                type="primary"
                plain
                @click.native.prevent="handle_edit_subsort(scope.$index,scope.row)"
              >{{ $t('c_category.advanced') }}</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>

      <!--編輯主類別之表單-->
      <el-dialog
        :visible.sync="c_category_editsort_visible"
        :title="$t('c_category.edit')"
        width="80vw"
      >

        <el-form
          ref="c_subsort_edit"
          :model="c_category_editsort"
          :rules="c_category_editsort_rules"
          label-position="left"
          inline
          class="table_category"
        >
          <el-form-item>
            <span>{{ $t('c_category.notmodify') }}</span>
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item
            :label="$t('c_category.mainsortname')"
            prop="name"
          >
            <el-input
              v-model="c_category_editsort.name"
              :placeholder="c_category_sortname_p"
              name="name"
              clearable
              @focus="clean_editsortname()"
            />
          </el-form-item>
          <el-form-item
            label="分類預算"
            prop="budget"
          >
            <el-input
              v-model="c_category_editsort.budget"
              :placeholder="c_category_sortbudget_p"
              name="name"
              clearable
              @focus="clean_editsortbudget()"
            />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
        </el-form>

        <span
          slot="footer"
          class="invoice_dialog_footer"
        >
          <el-button
            type="danger"
            plain
            @click.native.prevent="c_category_sort_del()"
          >{{ $t('c_category.delete') }}</el-button>
          <el-button
            type="primary"
            @click.native.prevent="c_category_sort_confirm()"
          >{{ $t('c_category.confirm') }}</el-button>
          <el-button
            type="info"
            plain
            @click.native.prevent="c_category_cal()"
          >{{ $t('c_category.cancel') }}</el-button>
        </span>

      </el-dialog>
      <!--新增主類別之表單-->
      <el-dialog
        :visible.sync="c_category_sort_add_visible"
        :title="$t('c_category.add')"
        width="80vw"
      >

        <el-form
          ref="c_sort_add"
          :model="c_sort_add"
          :rules="c_sort_add_rules"
          label-position="left"
          inline
          class="table_sort"
        >
          <el-form-item
            label="目前年月"
            prop="time"
            class="sortadd_time"
          >
            <el-input
              v-model="c_sort_add.time"
              readonly
            />
          </el-form-item>

          <el-form-item
            :label="$t('c_category.mainsortname')"
            prop="payorin"
          >
            <el-select
              v-model="c_sort_add.payorin"
              :placeholder="$t('c_category.incomespend')"
              filterable
              clearable
              style="width: 10vw;max-width:8rem;min-width:5rem;"
            >
              <el-option
                v-for="payorin in c_pay_in"
                :key="payorin.value"
                :label="payorin.label"
                :value="payorin.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('c_category.mainsortname')"
            prop="name"
          >
            <el-input
              v-model="c_sort_add.name"
              :placeholder="$t('c_category.amount')"
              name="name"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="初始預算"
            prop="name"
          >
            <el-input
              v-model="c_sort_add.budget"
              :placeholder="$t('c_category.amount')"
              name="name"
              clearable
            />
          </el-form-item>
        </el-form>

        <span
          slot="footer"
          class="invoice_dialog_footer"
        >
          <el-button
            type="primary"
            @click.native.prevent="c_category_sortadd()"
          >{{ $t('c_category.confirm') }}</el-button>
          <el-button
            type="info"
            plain
            @click.native.prevent="c_category_cal()"
          >{{ $t('c_category.cancel') }}</el-button>
        </span>
      </el-dialog>

      <el-dialog
        :visible.sync="c_category_visible"
        :title="$t('c_category.subclass')"
        width="80vw"
      >
        <!--搜尋子分類-->
        <div class="filter_container">
          <el-select
            v-model="c_subsort_id"
            :placeholder="$t('c_category.subclass')"
            clearable
            filterable
            style="width: 25vw;max-width:7.5rem;min-width:6.5rem;"
            @focus="get_subchange()"
            @change="get_subchange()"
          >
            <el-option
              v-for="subsort in c_subsort_in_options"
              :key="subsort.id"
              :label="subsort.name"
              :value="subsort.id"
            />
          </el-select>

          <!--新增子分類-->
          <span
            slot="footer"
            class="invoice_dialog_footer"
          >
            <el-button
              type="primary"
              @click.native.prevent="visible_subsort_table()"
            >{{ $t('c_category.addsubclass') }}</el-button>
          </span>

          <!--內層表單設計之表格-->
          <div class="subsort_table_container">
            <el-table
              :data="c_subsort_in_item"
              stripe
              style="width: 100%;"
              max-height="300"
              fit
            >
              <el-table-column
                :label="$t('c_category.name')"
                prop="name"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column
                :label="$t('c_category.spendingmonth')"
                prop="allin"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.range_expense }}</span>
                </template>
              </el-table-column>

              <el-table-column
                :label="$t('c_category.operation')"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    plain
                    @click.native.prevent="handle_in_edit(scope.$index,scope.row)"
                  >{{ $t('c_category.edit') }}</el-button>
                </template>
              </el-table-column>

            </el-table>
          </div>
        </div>
      </el-dialog>
      <!--編輯子分類名稱之表單-->
      <el-dialog
        :visible.sync="c_category_two_visible"
        :title="$t('c_category.edit')"
        width="80vw"
      >

        <el-form
          ref="c_subsort_edit"
          :model="c_subsort_edit"
          :rules="c_category_edit_rules"
          label-position="left"
          inline
          class="table_category"
        >
          <el-form-item>
            <span>{{ $t('c_category.notmodify') }}</span>
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item
            :label="$t('c_category.subclassname')"
            prop="name"
          >
            <el-input
              v-model="c_subsort_edit.name"
              :placeholder="c_category_name_p"
              name="name"
              clearable
              @focus="clean_name()"
            />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
        </el-form>

        <span
          slot="footer"
          class="invoice_dialog_footer"
        >
          <el-button
            type="danger"
            plain
            @click.native.prevent="c_category_subsort_del()"
          >{{ $t('c_category.delete') }}</el-button>
          <el-button
            type="primary"
            @click.native.prevent="c_category_subsort_confirm()"
          >{{ $t('c_category.confirm') }}</el-button>
          <el-button
            type="info"
            plain
            @click.native.prevent="c_category_cal()"
          >{{ $t('c_category.cancel') }}</el-button>
        </span>

      </el-dialog>
      <!--新增子分類之表單-->
      <el-dialog
        :visible.sync="c_category_subsort_table_visible"
        :title="$t('c_category.add')"
        width="80vw"
      >

        <el-form
          ref="c_subsort_edit"
          :model="c_subsort_edit"
          :rules="c_category_edit_rules"
          label-position="left"
          inline
          class="table_sort"
        >
          <el-form-item
            :label="$t('c_category.subclassname')"
            prop="subname"
          >
            <el-input
              v-model="c_subsort_edit.subname"
              :placeholder="$t('c_category.amount')"
              name="subname"
              clearable
            />
          </el-form-item>
        </el-form>

        <span
          slot="footer"
          class="invoice_dialog_footer"
        >
          <el-button
            type="primary"
            @click.native.prevent="c_category_subsortadd()"
          >{{ $t('c_category.confirm') }}</el-button>
          <el-button
            type="info"
            plain
            @click.native.prevent="c_category_cal()"
          >{{ $t('c_category.cancel') }}</el-button>
        </span>

      </el-dialog>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波紋指令
import { getsortbudget_all } from '@/api/sortbudget/getsortbudget'
import { postsort } from '@/api/sort/postsort'
import { patchsort_update, patchsort_delete } from '@/api/sort/patchsort'
import { postsubsort } from '@/api/subsort/postsubsort'
import { postsortbudget } from '@/api/sortbudget/postsortbudget'
import { getsubsort, getsinglesubsort } from '@/api/subsort/getsubsort'
import {
  patchsubsort_update,
  patchsubsort_delete
} from '@/api/subsort/patchsubsort'
import { getToken } from '@/utils/auth'
import { formatdate } from '@/utils/index'

export default {
  name: 'CCategoryory',
  directives: {
    waves
  },
  data() {
    const validate_payorin = (rule, value, callback) => {
      if (value === '' || value === null) {
        return callback(new Error('不能為空'))
      } else {
        callback()
      }
    }
    const validate_subname = (rule, value, callback) => {
      if (value === '' || value === null) {
        return callback(new Error('名稱不能為空'))
      } else if (value.length > 10) {
        callback(new Error('名稱不可以大於 10 個字'))
      } else {
        callback()
      }
    }
    const validate_name = (rule, value, callback) => {
      if (value === '' || value === null) {
        return callback(new Error('名稱不能為空'))
      } else if (value.length > 10) {
        callback(new Error('名稱不可以大於 10 個字'))
      } else {
        callback()
      }
    }
    return {
      startenddate: formatdate('yyyy-mm'),
      c_sort_payorin: '',
      c_sort_id: '',
      c_subsort_id: '',
      c_sort_row_id: '',
      c_sort_row_type: '',
      c_add_sort_payorin: '',
      c_project: '',
      c_account: '',
      c_category_name_p: '',
      c_sort_edit: {
        id: '',
        name: ''
      },
      c_subsort_edit: {
        id: '',
        name: '',
        subname: ''
      },
      c_sort_add: {
        time: '',
        name: '',
        payorin: '',
        budget: ''
      },
      c_category_sortname_p: '',
      c_category_sortbudget_p: '',
      c_category_editsort: {
        id: '',
        name: '',
        type: '',
        budget: ''
      },
      c_sort_payorinitem: [],
      c_subsort_payorinitem: [],
      c_projectitem: [],
      c_accountitem: [],
      c_subsort_in_options: [],
      c_subsort_in_item: [],
      c_sort_disable: true,
      c_subsort_disable: true,
      c_category_editsort_visible: false,
      c_category_visible: false,
      c_category_two_visible: false,
      c_category_subsort_table_visible: false,
      c_category_sort_add_visible: false,
      view_loading: true,
      datepickerclea: false,
      c_pay_in: [{ label: '支出', value: 0 }, { label: '收入', value: 1 }],
      c_category_list: [],
      c_category_list_option: [],
      c_category_edit_rules: {
        subname: [
          { required: false, trigger: 'change', validator: validate_subname }
        ],
        name: [{ required: false, trigger: 'change', validator: validate_name }]
      },
      c_sort_add_rules: {
        name: [
          { required: false, trigger: 'change', validator: validate_name }
        ],
        payorin: [
          { required: false, trigger: 'change', validator: validate_payorin }
        ]
      },
      c_category_editsort_rules: {
        name: [{ required: false, trigger: 'change', validator: validate_name }]
      }
    }
  },
  watch: {
    c_sort_payorin: function(newpi, oldpi) {
      if (this.c_sort_payorin === null || this.c_sort_payorin === '') {
        this.c_sort_disable = true
        this.c_sort_id = ''
      } else if (newpi !== oldpi) {
        this.c_sort_id = ''
        this.c_sort_disable = false
      } else {
        this.c_sort_disable = false
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
      }, 1500)
    },
    clean_name() {
      this.c_subsort_edit.name = ''
    },
    clean_editsortname() {
      this.c_category_editsort.name = ''
    },
    clean_editsortbudget() {
      this.c_category_editsort.budget = ''
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
        getsortbudget_all(
          getToken(),
          this.startenddate.substring(0, 4),
          this.startenddate.substring(5, 8),
          send_payin,
          this.c_sort_id
        ).then(res => {
          this.c_category_list = res.data
        })
      } else {
        getsortbudget_all(
          getToken(),
          this.startenddate.substring(0, 4),
          this.startenddate.substring(5, 8)
        ).then(res => {
          this.c_category_list = res.data
        })
      }
      getsortbudget_all(
        getToken(),
        this.startenddate.substring(0, 4),
        this.startenddate.substring(5, 8),
        send_payin
      ).then(res => {
        this.c_category_list_option = res.data
      })
    },
    get_subsort() {
      getsubsort(getToken(), this.c_sort_row_id, this.startenddate).then(
        response => {
          this.c_subsort_in_item = response.data
          this.c_subsort_in_options = response.data
        }
      )
    },
    get_subchange() {
      if (this.c_subsort_id === '') {
        this.get_subsort()
      } else {
        getsinglesubsort(getToken(), this.c_subsort_id)
          .then(response => {
            this.c_subsort_in_item = []
            this.c_subsort_in_item.push(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    handle_edit_subsort(index, row) {
      this.c_category_visible = true
      this.c_sort_row_id = row.sort_id.id
      this.c_sort_row_type = row.sort_id.type
      this.c_subsort_id = ''
      this.get_subsort()
    },
    handle_in_edit(index, row) {
      this.c_category_two_visible = true
      this.c_subsort_edit.id = row.id
      this.c_category_name_p = row.name
      this.c_subsort_edit.name = row.name
    },
    handle_edit_sort(index, row) {
      this.c_category_editsort_visible = true
      this.c_category_editsort.id = row.sort_id.id
      this.c_category_editsort.name = row.sort_id.name
      this.c_category_sortname_p = row.sort_id.name
      this.c_category_editsort.budget = row.budget
      this.c_category_sortbudget_p = row.budget
    },
    visible_subsort_table() {
      this.c_category_subsort_table_visible = true
    },
    handle_add_mainsort() {
      this.c_category_sort_add_visible = true
      this.c_sort_add.time = this.startenddate
    },
    c_category_sortadd() {
      this.$refs.c_sort_add.validate(valid => {
        if (valid) {
          postsort(getToken(), this.c_sort_add.payorin, this.c_sort_add.name)
            .then(res => {
              this.startenddate = formatdate('yyyy-mm')
              const year = this.startenddate.substring(0, 4)
              const month = this.startenddate.substring(5, 8)
              postsortbudget(
                getToken(),
                res.data.id,
                this.c_sort_add.budget,
                year,
                month
              )
                .then(() => {
                  this.$message({
                    type: 'success',
                    message: '已新增一筆主分類'
                  })
                  this.c_sort_payorin = ''
                  this.c_sort_id = ''
                  this.get_category()
                })
                .catch(error => {
                  console.log(error)
                  this.$message({
                    type: 'error',
                    message: '發生一點錯誤，請稍後再做修改'
                  })
                })
            })
            .catch(error => {
              console.log(error)
              this.$message({
                type: 'error',
                message: '發生一點錯誤，請稍後再做修改'
              })
            })
          this.c_category_sort_add_visible = false
        } else {
          console.log('error submit')
          return false
        }
      })
    },
    c_category_subsortadd() {
      this.$refs.c_subsort_edit.validate(valid => {
        if (valid) {
          postsubsort(
            getToken(),
            this.c_category_editsort.id,
            this.c_subsort_edit.subname,
            this.c_sort_row_type
          )
            .then(() => {
              this.$message({
                type: 'success',
                message: '已新增一筆子分類'
              })
              this.c_subsort_id = null
              this.get_subsort()
            })
            .catch(error => {
              console.log(error)
              this.$message({
                type: 'error',
                message: '發生一點錯誤，請稍後再做修改'
              })
            })
          this.c_category_two_visible = false
          this.c_category_subsort_table_visible = false
        } else {
          console.log('error submit')
          return false
        }
      })
    },
    c_category_sort_confirm() {
      this.$refs.c_subsort_edit.validate(valid => {
        if (valid) {
          const date = formatdate('yyyy-mm-dd HH:MM:ss.l')
          patchsort_update(
            getToken(),
            this.c_category_editsort.id,
            this.c_category_editsort.name,
            date
          )
            .then(response => {
              this.$message({
                type: 'success',
                message: '已完成該筆分類相關修改'
              })
              this.c_sort_payorin = ''
              this.c_sort_id = ''
              this.get_category()
            })
            .catch(error => {
              console.log(error)
              this.$message({
                type: 'error',
                message: '發生一點錯誤，請稍後再做修改'
              })
            })
          this.c_category_editsort_visible = false
        } else {
          console.log('error submit')
          return false
        }
      })
    },
    c_category_sort_del() {
      this.$refs.c_subsort_edit.validate(valid => {
        if (valid) {
          this.$confirm('你真的要刪除該筆分類相關嗎？', '警告', {
            cancelButtonText: '取消',
            confirmButtonText: '確認',
            type: 'warning'
          })
            .then(() => {
              this.$confirm('請在確認一次是否要刪除該筆分類相關', '警告', {
                cancelButtonText: '取消',
                confirmButtonText: '確認',
                type: 'warning'
              })
                .then(() => {
                  const date = formatdate('yyyy-mm-dd HH:MM:ss.l')
                  patchsort_delete(
                    getToken(),
                    this.c_category_editsort.id,
                    date
                  ).then(() => {
                    this.$message({
                      type: 'success',
                      message: '刪除成功'
                    })
                    this.c_category_editsort_visible = false
                    this.c_sort_payorin = null
                    this.c_sort_id = null
                    this.get_category()
                  })
                })
                .catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消刪除'
                  })
                  this.c_category_editsort_visible = false
                })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消刪除'
              })
              this.c_category_editsort_visible = false
            })
        } else {
          console.log('error submit')
          return false
        }
      })
    },
    c_category_subsort_confirm() {
      this.$refs.c_subsort_edit.validate(valid => {
        if (valid) {
          const date = formatdate('yyyy-mm-dd HH:MM:ss.l')
          patchsubsort_update(
            getToken(),
            this.c_subsort_edit.id,
            this.c_subsort_edit.name,
            date
          )
            .then(() => {
              this.$message({
                type: 'success',
                message: '已完成該筆分類相關修改'
              })
              this.get_subsort()
              this.c_category_two_visible = false
            })
            .catch(error => {
              console.log(error)
              this.$message({
                type: 'error',
                message: '發生一點錯誤，請稍後再做修改'
              })
            })
        } else {
          console.log('error submit')
          return false
        }
      })
    },
    c_category_cal() {
      this.$message({
        type: 'info',
        message: '已取消動作'
      })
      this.c_category_two_visible = false
      this.c_category_sort_add_visible = false
      this.c_category_editsort_visible = false
      this.c_category_subsort_table_visible = false
    },
    c_category_subsort_del() {
      this.$refs.c_subsort_edit.validate(valid => {
        if (valid) {
          this.$confirm('你真的要刪除該筆分類相關嗎？', '警告', {
            cancelButtonText: '取消',
            confirmButtonText: '確認',
            type: 'warning'
          })
            .then(() => {
              this.$confirm('請在確認一次是否要刪除該筆分類相關', '警告', {
                cancelButtonText: '取消',
                confirmButtonText: '確認',
                type: 'warning'
              })
                .then(() => {
                  const date = formatdate('yyyy-mm-dd HH:MM:ss.l')
                  patchsubsort_delete(getToken(), this.c_subsort_edit.id, date)
                    .then(() => {
                      this.$message({
                        type: 'success',
                        message: '刪除成功'
                      })
                      this.get_subsort()
                      this.c_category_two_visible = false
                    })
                    .catch(error => {
                      console.log(error)
                      this.$message({
                        type: 'error',
                        message: '發生一點錯誤，請稍後再做修改'
                      })
                    })
                })
                .catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消刪除'
                  })
                  this.c_category_two_visible = false
                })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消刪除'
              })
              this.c_category_two_visible = false
            })
        } else {
          console.log('error submit')
          return false
        }
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
.table_sort .sortadd_time input {
  border: 0;
}
</style>

