<template>
  <!-- 動態篩選未完成 -->
  <div class="category_container">
    <title>
      {{ $t('route.c_categorymanager') }}
    </title>

    <div class="filter_container">
      <el-select v-model="c_payorin" filterable clearable placeholder="收支出" style="width: 25vw;max-width:7.5rem;min-width:5.5rem;">
        <el-option v-for="payorin in c_pay_in" :key="payorin.value" :label="payorin.label" :value="payorin.value" />
      </el-select>
      <el-select v-model="c_sort" :disabled="c_sort_disable" filterable placeholder="主類別" style="width: 25vw;max-width:7.5rem;min-width:6.5rem;" @focus="get_sort()" @change="get_subsort()">
        <el-option v-for="sort in c_sort_payorinitem" :key="sort.id" :label="sort.name" :value="sort.id" />
      </el-select>
    </div>

    <div class="category_table_container">
      <el-table :data="c_user_category" stripe style="width: 100%;" max-height="470" fit>
        <el-table-column prop="name" label="名稱" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="allin" label="總收入" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.allin }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="allout" label="總支出" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.allout }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="handle_edit(scope.$index,scope.row)">進階</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog_container">
      <el-dialog :visible.sync="c_category_visible" width="80vw" title="子分類">
        <div class="filter_container">
          <el-select v-model="c_subsort" filterable placeholder="子類別" style="width: 25vw;max-width:7.5rem;min-width:6.5rem;">
            <el-option v-for="subsort in c_subsort_in_item" :key="subsort.id" :label="subsort.name" :value="subsort.id" />
          </el-select>
        </div>
        <div class="subsort_table_container">
          <el-table :data="c_user_subsort" stripe style="width: 100%;" max-height="300" fit>
            <el-table-column prop="name" label="名稱" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="primary" @click="handle_in_edit(scope.$index,scope.row)">編輯</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="invoice_dialog_footer">
          <el-button type="primary" plain @click="handle_add_subsort()">新增子分類</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="c_category_two_visible" width="80vw" title="編輯">

        <el-form :model="c_category_edit" label-position="left" inline class="table-category">
          <el-form-item>
            <span>以下如不修改保持空白即可</span>
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item label="子類別名稱">
            <el-input v-model="c_category_edit.name" :placeholder="c_category_name_p" clearable />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
        </el-form>

        <span slot="footer" class="invoice_dialog_footer">
          <el-button type="danger" plain @click="c_category_del()">刪除</el-button>
          <el-button type="primary" @click="c_category_confirm()">確定</el-button>
          <el-button type="info" plain @click="c_category_cal()">取消</el-button>
        </span>
      </el-dialog>

      <el-dialog :visible.sync="c_category_add_visible" width="80vw" title="編輯">

        <span slot="footer" class="invoice_dialog_footer">
          <el-button type="primary" @click="c_category_confirm()">確定</el-button>
          <el-button type="info" plain @click="c_category_cal()">取消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>

// import { parseTime } from '@/utils'

import waves from '@/directive/waves' // 水波紋指令
import { getsort_all, getsort_pay, getsort_in } from '@/api/sort/getsort'
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
      c_category_edit: {
        name: ''
      },
      c_category_name_p: '',
      c_sort_payorinitem: [],
      c_subsort_payorinitem: [],
      c_projectitem: [],
      c_accountitem: [],
      c_subsort_in_item: [],
      c_sort_disable: true,
      c_subsort_disable: true,
      c_category_visible: false,
      c_category_two_visible: false,
      c_category_add_visible: false,
      c_pay_in: [{ label: '支出', value: 0 }, { label: '收入', value: 1 }],
      c_user_category: null,
      c_user_subsort: null
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
  created() {
    this.get_all()
  },
  methods: {
    // test table
    get_all() {
      getsort_all(getToken()).then(response => {
        this.c_user_category = response.data
      }).catch((error) => {
        console.log(error)
      })
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
    // 待調整
    handle_edit(index, row) {
      this.c_category_visible = true
      getsubsort(getToken(), row.id).then((response) => {
        this.c_subsort_in_item = response.data
        this.c_user_subsort = response.data
      })
    },
    handle_in_edit(index, row) {
      this.c_category_two_visible = true
      this.c_category_name_p = row.name
    },
    handle_add_subsort() {
      this.c_category_add_visible = true
    },
    // 待調整
    handle_filter() {

    },
    c_category_confirm() {
      this.$message({
        type: 'success',
        message: '已完成該筆分類相關修改'
      })
      this.c_category_visible = false
      this.c_category_two_visible = false
      this.c_category_add_visible = false
    },
    c_category_cal() {
      this.$message({
        type: 'info',
        message: '已取消修改'
      })
      this.c_category_two_visible = false
      this.c_category_add_visible = false
    },
    c_category_del() {
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
          this.$message({
            type: 'success',
            message: '刪除成功'
          })
          this.c_category_visible = false
          this.c_category_two_visible = false
          this.c_category_add_visible = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消刪除'
          })
          this.c_category_two_visible = false
          this.c_category_add_visible = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刪除'
        })
        this.c_category_two_visible = false
        this.c_category_add_visible = false
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
.table-category {
  font-size: 0;
}
.table-category label {
  width: 90px;
  color: #99a9bf;
}
.table-category .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 50%;
}
</style>

