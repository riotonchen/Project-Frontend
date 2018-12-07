<template>
  <div class="app-container">
    <title>
      {{ $t('route.c_projectmanager') }}
    </title>
    <div class="filter-container">
      <el-select
        v-model="c_project"
        :placeholder="$t('c_project.name')"
        clearable
        filterable
        style="width: 25vw;max-width:7.5rem;min-width:5.5rem;"
        @focus="get_projectlist()"
        @change="get_projectlist()"
      >
        <el-option
          v-for="project in c_projectlist"
          :key="project.id"
          :label="project.name"
          :value="project.id"
        />
      </el-select>
      <el-button
        type="primary"
        @click="c_open_add_view()"
      >
        {{ $t('c_project.add') }}
      </el-button>
    </div>
    <div class="card_table_container">
      <el-table
        v-loading.fullscreen.lock="view_loading"
        :data="c_user_project"
        element-loading-text="正在幫你載入所有專案資料中......."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.9)"
        stripe
        style="width: 100%;"
        max-height="500"
        fit
        sortable
      >
        <el-table-column
          type="index"
          align="center"
        />
        <el-table-column
          :label="$t('c_project.name')"
          prop="name"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('c_project.income')"
          prop="total_income"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.total_income }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('c_project.expenditure')"
          prop="total_expenses"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.total_expenses }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('c_project.action')"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              @click.native.prevent="handle_edit(scope.$index,scope.row)"
            >{{ $t('c_project.edit') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog_container">
      <el-dialog
        :visible.sync="c_project_visible"
        :title="$t('c_project.edit')"
        width="80vw"
      >
        <el-form
          ref="c_project_edit"
          :model="c_project_edit"
          :rules="c_project_edit_rules"
          label-position="left"
          inline
          class="table_project"
        >
          <el-form-item>
            <span>{{ $t('c_card_view.blank') }}</span>
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item
            :label="$t('c_project.name')"
            prop="name"
          >
            <el-input
              v-model="c_project_edit.name"
              :placeholder="c_project_name_p"
              clearable
              name="name"
              @focus="clean_name()"
            />
          </el-form-item>
        </el-form>

        <span
          slot="footer"
          class="project_dialog_footer"
        >
          <el-button
            type="danger"
            plain
            @click.native.prevent="c_project_del()"
          >{{ $t('c_project.delete') }}</el-button>
          <el-button
            type="primary"
            @click.native.prevent="c_project_confirm()"
          >{{ $t('c_project.confirm') }}</el-button>
          <el-button
            type="info"
            plain
            @click.native.prevent="c_project_cal()"
          >{{ $t('c_project.cancel') }}</el-button>
        </span>

      </el-dialog>
      <el-dialog
        :visible.sync="c_project_add_visible"
        :title="$t('c_project.add')"
        width="80vw"
      >
        <el-form
          ref="c_project_add"
          :model="c_project_add"
          :rules="c_project_edit_rules"
          label-position="left"
          inline
          class="table_project"
        >
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item
            :label="$t('c_project.name')"
            prop="name"
          >
            <el-input
              v-model="c_project_add.name"
              clearable
              name="name"
              @focus="clean_name()"
            />
          </el-form-item>
        </el-form>

        <span
          slot="footer"
          class="project_dialog_footer"
        >
          <el-button
            type="primary"
            @click.native.prevent="c_project_addn()"
          >{{ $t('c_project.confirm') }}</el-button>
          <el-button
            type="info"
            plain
            @click.native.prevent="c_project_cal()"
          >{{ $t('c_project.cancel') }}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波紋指令
import { getproject, getproject_single } from '@/api/project/getproject'
import { postproject } from '@/api/project/postproject'
import {
  patchproject_update,
  patchproject_delete
} from '@/api/project/patchproject'
import { getToken } from '@/utils/auth'
import { formatdate } from '@/utils/index'

export default {
  name: 'CProject',
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
    return {
      c_project: '',
      c_project_id: '',
      c_project_name_p: '',
      c_projectlist: [],
      c_user_project: '',
      c_project_visible: false,
      c_project_add_visible: false,
      view_loading: true,
      c_project_edit: {
        name: ''
      },
      c_project_add: {
        name: ''
      },
      c_project_edit_rules: {
        name: [
          {
            required: false,
            trigger: 'change',
            validator: validatename
          }
        ]
      }
    }
  },
  watch: {},
  created() {
    this.page_load()
  },
  methods: {
    page_load() {
      setTimeout(() => {
        this.view_loading = false
        this.get_projectlist()
      }, 1500)
    },
    clean_name() {
      this.c_project_edit.name = ''
    },
    clean_number() {
      this.c_project_edit.number = ''
    },
    handle_edit(index, row) {
      this.c_project_id = row.id
      this.c_project_name_p = row.name
      this.c_project_edit.name = row.name
      this.c_project_visible = true
    },
    get_projectlist() {
      getproject(getToken())
        .then(response => {
          this.c_projectlist = response.data
          this.get_project()
        })
        .catch(error => {
          console.log(error)
        })
    },
    get_project() {
      if (this.c_project === '' || this.c_project === null) {
        getproject(getToken())
          .then(response => {
            this.c_user_project = response.data
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        getproject_single(getToken(), this.c_project)
          .then(response => {
            this.c_user_project = []
            this.c_user_project.push(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    c_open_add_view() {
      this.c_project_add_visible = true
    },
    c_project_addn() {
      this.$refs.c_project_add.validate(valid => {
        if (valid) {
          postproject(getToken(), this.c_project_add.name)
            .then(() => {
              this.$message({
                type: 'success',
                message: '新增專案成功'
              })
              this.c_project_add.name = ''
              this.c_project_add_visible = false
              this.get_project()
            })
            .catch(error => {
              console.log(error)
              this.$message({
                type: 'error',
                message: '發生一點錯誤，請稍後再做新增'
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    c_project_confirm() {
      const date = formatdate('yyyy-mm-dd HH:MM:ss.l')
      patchproject_update(
        getToken(),
        this.c_project_id,
        this.c_project_edit.name,
        date
      )
        .then(() => {
          this.$message({
            type: 'success',
            message: '專案相關更新成功'
          })
          this.get_project()
        })
        .catch(error => {
          console.log(error)
          this.$message({
            type: 'error',
            message: '發生一點錯誤，請稍後再做修改'
          })
        })
      this.c_project_visible = false
    },
    c_project_cal() {
      this.$message({
        type: 'info',
        message: '已取消動作'
      })
      this.c_project_visible = false
      this.c_project_add_visible = false
    },
    c_project_del() {
      this.$confirm('你真的要刪除該專案資料嗎？', '警告', {
        cancelButtonText: '取消',
        confirmButtonText: '確認',
        type: 'warning'
      })
        .then(() => {
          this.$confirm('請在確認一次是否要刪除該專案資料資料', '警告', {
            cancelButtonText: '取消',
            confirmButtonText: '確認',
            type: 'warning'
          })
            .then(() => {
              const date = formatdate('yyyy-mm-dd HH:MM:ss.l')
              patchproject_delete(getToken(), this.c_project_id, date)
                .then(() => {
                  this.$message({
                    type: 'success',
                    message: '刪除成功'
                  })
                  this.get_project()
                })
                .catch(error => {
                  console.log(error)
                  this.$message({
                    type: 'error',
                    message: '發生一點錯誤，請稍後再做修改'
                  })
                })
              this.c_project_visible = false
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消刪除'
              })
              this.c_project_visible = false
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消刪除'
          })
          this.c_project_visible = false
        })
    }
  }
}
</script>
<style lang="scss">
.table_project {
  font-size: 0;
}
.table_project label {
  width: 100px;
  color: #99a9bf;
}
.table_project .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 50%;
}
</style>

