<template>
  <!-- 新增修改刪除未配好，及子分類動態 -->
  <div class="category_container">
    <title>
      {{ $t('route.c_category') }}
    </title>
    <!--搜尋分類-->
    <div class="filter_container">
      <el-select v-model="c_sort_payorin" :placeholder="$t('c_category.incomespend')" filterable clearable style="width: 10vw;max-width:8rem;min-width:5rem;" @focus="get_sort()" @change="get_sort()">
        <el-option v-for="payorin in c_pay_in" :key="payorin.value" :label="payorin.label" :value="payorin.value" />
      </el-select>
      <el-select v-model="c_sort_id" :disabled="c_sort_disable" :placeholder="$t('c_category.mainsortname')" clearable filterable style="width: 25vw;max-width:7.5rem;min-width:6.5rem;" @focus="get_sortchange()" @change="get_sortchange()">
        <el-option v-for="sort in c_category_list" :key="sort.id" :label="sort.name" :value="sort.id" />
      </el-select>
      <el-date-picker v-model="startenddate" align="center" type="month" style="width: 10vw;min-width:7rem;max-width:10rem;" />

      <!--新增主分類-->
      <span slot="footer" class="invoice_dialog_footer">
        <el-button type="primary" @click.native.prevent="handle_add_mainsort()">{{ $t('c_category.addmainsort') }}</el-button>
      </span>

      <!--外層表單設計之表格-->
      <div class="category_table_container">
        <el-table v-loading.fullscreen.lock="view_loading" :data="c_category_list" element-loading-text="資料取得中，請稍後..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.9)" stripe style="width: 100%;" max-height="500" fit>
          <el-table-column type="index" align="center" />
          <el-table-column :label="$t('c_category.name')" prop="name" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('c_category.totalincome')" prop="allin" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.allin }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('c_category.totalspend')" prop="allout" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.allout }}</span>
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

        <el-form :model="c_subsort_edit" :rules="c_category_edit_rules" label-position="left" inline class="table_category">
          <el-form-item>
            <span>{{ $t('c_category.notmodify') }}</span>
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item :label="$t('c_category.mainsortname')" prop="name">
            <el-input v-model="c_category_editsort.name" :placeholder="c_category_sortname_p" name="name" clearable @focus="clean_name()" />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item>
            <span />
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

        <el-form :model="c_sort_add" :rules="c_category_add_rules" label-position="left" inline class="table_sort">

          <el-form-item :label="$t('c_category.mainsortname')" prop="name">
            <el-select v-model="c_sort_add.payorin" :placeholder="$t('c_category.incomespend')" filterable clearable style="width: 10vw;max-width:8rem;min-width:5rem;">
              <el-option v-for="payorin in c_pay_in" :key="payorin.value" :label="payorin.label" :value="payorin.value" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('c_category.mainsortname')" prop="payorin">
            <el-input v-model="c_sort_add.name" :placeholder="$t('c_category.amount')" name="name" clearable />
          </el-form-item>
        </el-form>

        <span slot="footer" class="invoice_dialog_footer">
          <el-button type="primary" @click.native.prevent="c_category_sortadd()">{{ $t('c_category.confirm') }}</el-button>
          <el-button type="info" plain @click.native.prevent="c_category_cal()">{{ $t('c_category.cancel') }}</el-button>
        </span>
      </el-dialog>

      <el-dialog :visible.sync="c_category_visible" :title="$t('c_category.subclass')" width="80vw">
        <!--搜尋子分類-->
        <div class="filter_container">
          <el-select v-model="c_subsort_id" :placeholder="$t('c_category.subclass')" clearable filterable style="width: 25vw;max-width:7.5rem;min-width:6.5rem;" @focus="get_subchange()" @change="get_subchange()">
            <el-option v-for="subsort in c_subsort_in_options" :key="subsort.id" :label="subsort.name" :value="subsort.id" />
          </el-select>

          <!--新增子分類-->
          <span slot="footer" class="invoice_dialog_footer">
            <el-button type="primary" @click.native.prevent="visible_subsort_table()">{{ $t('c_category.addsubclass') }}</el-button>
          </span>

          <!--內層表單設計之表格-->
          <div class="subsort_table_container">
            <el-table :data="c_subsort_in_item" stripe style="width: 100%;" max-height="300" fit>
              <el-table-column :label="$t('c_category.name')" prop="name" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('c_category.operation')" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" plain @click.native.prevent="handle_in_edit(scope.$index,scope.row)">{{ $t('c_category.edit') }}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>
      <!--編輯子分類名稱之表單-->
      <el-dialog :visible.sync="c_category_two_visible" :title="$t('c_category.edit')" width="80vw">

        <el-form :model="c_subsort_edit" :rules="c_category_edit_rules" label-position="left" inline class="table_category">
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
      <el-dialog :visible.sync="c_category_subsort_table_visible" :title="$t('c_category.add')" width="80vw">

        <el-form :model="c_subsort_edit" :rules="c_category_edit_rules" label-position="left" inline class="table_sort">
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
import { getsort_all, getsort_pay, getsort_in, getsortsingledata } from '@/api/sort/getsort'
import { postsort } from '@/api/sort/postsort'
import { patchsort_update, patchsort_delete } from '@/api/sort/patchsort'
import { postsubsort } from '@/api/subsort/postsubsort'
import { getsubsort, getsinglesubsort } from '@/api/subsort/getsubsort'
import { patchsubsort_update, patchsubsort_delete } from '@/api/subsort/patchsubsort'
import { getToken } from '@/utils/auth'
import { formatdate } from '@/utils/index'

export default {
  name: 'CCategoryory',
  directives: {
    waves
  },
  data() {
    const validatename = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value.length > 10) {
        callback(new Error('名稱不可以大於 10 個字'))
      } else {
        callback()
      }
    }
    const validatesubname = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value.length > 10) {
        callback(new Error('名稱不可以大於 10 個字'))
      } else {
        callback()
      }
    }
    return {
      startenddate: '',
      c_sort_payorin: null,
      c_sort_id: null,
      c_subsort_id: null,
      c_sort_row_id: null,
      c_sort_row_type: null,
      c_add_sort_payorin: null,
      c_project: '',
      c_account: '',
      c_category_name_p: '',
      c_subsort_edit: {
        id: '',
        name: '',
        subname: ''
      },
      c_sort_add: {
        name: '',
        payorin: ''
      },
      c_category_sortname_p: null,
      c_category_editsort: {
        id: null,
        name: null,
        type: null
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
      c_pay_in: [{ label: '支出', value: 0 }, { label: '收入', value: 1 }],
      c_category_list: [],
      c_category_add_rules: {
        name: [{ required: false, trigger: 'blur', validator: validatename }]
      },
      c_category_edit_rules: {
        subname: [{ required: false, trigger: 'blur', validator: validatesubname }],
        name: [{ required: false, trigger: 'blur', validator: validatename }]
      }
    }
  },
  watch: {
    c_sort_payorin: function() {
      if (this.c_sort_payorin === null || this.c_sort_payorin === '') {
        this.c_sort_disable = true
      } else {
        this.c_sort_disable = false
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
        this.get_sort()
      }, 500)
    },
    clean_name() {
      this.c_subsort_edit.name = ''
    },
    get_sort() {
      this.c_sort_id = null
      if (this.c_sort_payorin === 0) {
        getsort_pay(getToken()).then((response) => {
          this.c_category_list = response.data
        })
      } else if (this.c_sort_payorin === 1) {
        getsort_in(getToken()).then((response) => {
          this.c_category_list = response.data
        })
      } else {
        getsort_all(getToken()).then(response => {
          this.c_category_list = response.data
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    get_sortchange() {
      if (this.c_sort_id === null) {
        this.get_sort()
      } else {
        getsortsingledata(getToken(), this.c_sort_id).then((response) => {
          this.c_category_list = []
          this.c_category_list.push(response.data)
        })
      }
    },
    get_subsort() {
      getsubsort(getToken(), this.c_sort_row_id).then((response) => {
        this.c_subsort_in_item = response.data
        this.c_subsort_in_options = response.data
      })
    },
    get_subchange() {
      if (this.c_subsort_id === '') {
        this.get_subsort()
      } else {
        getsinglesubsort(getToken(), this.c_subsort_id).then((response) => {
          this.c_subsort_in_item = []
          this.c_subsort_in_item.push(response.data)
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    handle_edit_subsort(index, row) {
      this.c_category_visible = true
      this.c_sort_row_id = row.id
      this.c_sort_row_type = row.type
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
      this.c_category_editsort.id = row.id
      this.c_category_editsort.name = row.name
      this.c_category_sortname_p = row.name
    },
    visible_subsort_table() {
      this.c_category_subsort_table_visible = true
    },
    handle_add_mainsort() {
      this.c_category_sort_add_visible = true
    },

    // 待調整
    handle_filter() {

    },
    c_category_sortadd() {
      postsort(getToken(), this.c_sort_add.name, this.c_sort_add.payorin).then(() => {
        this.$message({
          type: 'success',
          message: '已新增一筆主分類'
        })
        this.c_sort_payorin = null
        this.c_sort_id = null
        this.get_sort()
      }).catch((error) => {
        console.log(error)
        this.$message({
          type: 'error',
          message: '發生一點錯誤，請稍後再做修改'
        })
      })
      this.c_category_sort_add_visible = false
    },
    c_category_subsortadd() {
      postsubsort(getToken(), this.c_subsort_edit.id, this.c_sort_row_id, this.c_subsort_edit.subname, this.c_sort_row_type).then(() => {
        this.$message({
          type: 'success',
          message: '已新增一筆子分類'
        })
        this.c_subsort_id = null
        this.get_subsort()
      }).catch((error) => {
        console.log(error)
        this.$message({
          type: 'error',
          message: '發生一點錯誤，請稍後再做修改'
        })
      })
      this.c_category_two_visible = false
      this.c_category_subsort_table_visible = false
    },
    c_category_sort_confirm() {
      const date = formatdate('yyyy-mm-dd HH:MM:ss.l')
      patchsort_update(getToken(), this.c_category_editsort.id, this.c_category_editsort.name, date).then((response) => {
        this.$message({
          type: 'success',
          message: '已完成該筆分類相關修改'
        })
        this.c_sort_payorin = null
        this.c_sort_id = null
        this.get_sort()
      }).catch((error) => {
        console.log(error)
        this.$message({
          type: 'error',
          message: '發生一點錯誤，請稍後再做修改'
        })
      })
      this.c_category_editsort_visible = false
    },
    c_category_sort_del() {
      this.$confirm('你真的要刪除該筆分類相關嗎？', '警告', {
        cancelButtonText: '取消',
        confirmButtonText: '確認',
        type: 'warning'
      }).then(() => {
        this.$confirm('請在確認一次是否要刪除該筆分類相關', '警告', {
          cancelButtonText: '取消',
          confirmButtonText: '確認',
          type: 'warning'
        }).then(() => {
          const date = formatdate('yyyy-mm-dd HH:MM:ss.l')
          patchsort_delete(getToken(), this.c_category_editsort.id, date).then(() => {
            this.$message({
              type: 'success',
              message: '刪除成功'
            })
            this.c_category_editsort_visible = false
            this.c_sort_payorin = null
            this.c_sort_id = null
            this.get_sort()
          })
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
    c_category_subsort_confirm() {
      const date = formatdate('yyyy-mm-dd HH:MM:ss.l')
      patchsubsort_update(getToken(), this.c_subsort_edit.id, this.c_subsort_edit.name, date).then(() => {
        this.$message({
          type: 'success',
          message: '已完成該筆分類相關修改'
        })
        this.get_subsort()
        this.c_category_two_visible = false
      }).catch((error) => {
        console.log(error)
        this.$message({
          type: 'error',
          message: '發生一點錯誤，請稍後再做修改'
        })
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
      this.$confirm('你真的要刪除該筆分類相關嗎？', '警告', {
        cancelButtonText: '取消',
        confirmButtonText: '確認',
        type: 'warning'
      }).then(() => {
        this.$confirm('請在確認一次是否要刪除該筆分類相關', '警告', {
          cancelButtonText: '取消',
          confirmButtonText: '確認',
          type: 'warning'
        }).then(() => {
          const date = formatdate('yyyy-mm-dd HH:MM:ss.l')
          patchsubsort_delete(getToken(), this.c_subsort_edit.id, date).then(() => {
            this.$message({
              type: 'success',
              message: '刪除成功'
            })
            this.get_subsort()
            this.c_category_two_visible = false
          }).catch((error) => {
            console.log(error)
            this.$message({
              type: 'error',
              message: '發生一點錯誤，請稍後再做修改'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消刪除'
          })
          this.c_category_two_visible = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刪除'
        })
        this.c_category_two_visible = false
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
</style>

