<template>
  <div class="app-container">
    <title>
      {{ $t('route.c_projectmanager') }}
    </title>
    <div class="filter-container">
      <el-select v-model="c_project" placeholder="專案名稱" clearable filterable style="width: 25vw;max-width:7.5rem;min-width:5.5rem;" @focus="get_projectlist()" @change="get_projectlist()">
        <el-option v-for="project in c_projectlist" :key="project.id" :label="project.name" :value="project.id" />
      </el-select>
      <el-button type="primary" @click="c_open_add_view()">
        新增專案
      </el-button>
    </div>
    <div class="card_table_container">
      <el-table v-loading.fullscreen.lock="view_loading" :data="c_user_project" element-loading-text="資料取得中，請稍後..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.9)" stripe style="width: 100%;" max-height="500" fit sortable>
        <el-table-column type="index" align="center" />
        <el-table-column label="名稱" prop="name" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="總收入" prop="allin" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.allin }}</span>
          </template>
        </el-table-column>
        <el-table-column label="總支出" prop="allpay" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.allpay }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" plain @click.native.prevent="handle_edit(scope.$index,scope.row)">{{ $t('c_card_view.edit') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog_container">
      <el-dialog :visible.sync="c_project_visible" width="80vw" title="子分類">
        <el-form ref="c_project_edit" :model="c_project_edit" :rules="c_project_edit_rules" label-position="left" inline class="table_project">
          <el-form-item>
            <span>{{ $t('c_card_view.blank') }}</span>
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item label="專案名稱" prop="name">
            <el-input v-model="c_project_edit.name" :placeholder="c_project_name_p" clearable name="name" @focus="clean_name()" />
          </el-form-item>
        </el-form>

        <span slot="footer" class="project_dialog_footer">
          <el-button type="danger" plain @click.native.prevent="c_project_del()">刪除</el-button>
          <el-button type="primary" @click.native.prevent="c_project_confirm()">確定</el-button>
          <el-button type="info" plain @click.native.prevent="c_project_cal()">取消</el-button>
        </span>

      </el-dialog>
      <el-dialog :visible.sync="c_project_add_visible" width="80vw" title="新增">
        <el-form ref="c_project_add" :model="c_project_add" :rules="c_project_edit_rules" label-position="left" inline class="table_project">
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item label="專案名稱" prop="name">
            <el-input v-model="c_project_add.name" :placeholder="c_project_name_p" clearable name="name" @focus="clean_name()" />
          </el-form-item>
        </el-form>

        <span slot="footer" class="project_dialog_footer">
          <el-button type="primary" @click.native.prevent="c_project_addn()">確定</el-button>
          <el-button type="info" plain @click.native.prevent="c_project_cal()">取消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import waves from '@/directive/waves' // 水波紋指令
import { getproject, getproject_single } from '@/api/project/getproject'
import { postproject } from '@/api/project/postproject'
import { patchproject_update, patchproject_delete } from '@/api/project/patchproject'
import { getToken } from '@/utils/auth'
import { formatdate } from '@/utils/index'

export default {
  name: 'CProject',
  directives: {
    waves
  },
  data() {
    const validecardnamelength = (rule, value, callback) => {
      if (value.length > 10) {
        callback(new Error('專案名稱至多10碼'))
      } else {
        callback()
      }
    }
    return {
      c_project: null,
      c_project_id: '',
      c_project_name_p: '',
      c_projectlist: [],
      c_user_project: null,
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
        name: [{ required: false, trigger: 'change', validator: validecardnamelength }]
      }
    }
  },
  watch: {
  },
  created() {
    this.page_load()
  },
  methods: {
    page_load() {
      setTimeout(() => {
        this.view_loading = false
        this.get_projectlist()
      }, 500)
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
      getproject(getToken()).then(response => {
        this.c_projectlist = response.data
        this.get_project()
      }).catch((error) => {
        console.log(error)
      })
    },
    get_project() {
      if (this.c_project === '' || this.c_project === null) {
        getproject(getToken()).then(response => {
          this.c_user_project = response.data
        }).catch((error) => {
          console.log(error)
        })
      } else {
        getproject_single(getToken(), this.c_project).then(response => {
          this.c_user_project = []
          this.c_user_project.push(response.data)
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    c_open_add_view() {
      this.c_project_add_visible = true
    },
    c_project_addn() {
      postproject(getToken(), this.c_project_add.name)
        .then(() => {
          this.$message({
            type: 'success',
            message: '新增專案成功'
          })
          this.get_project()
        })
        .catch((error) => {
          console.log(error)
          this.$message({
            type: 'error',
            message: '發生一點錯誤，請稍後再做新增'
          })
        })
      this.c_project_add_visible = false
    },
    c_project_confirm() {
      const date = formatdate('yyyy-mm-dd HH:MM:ss.l')
      patchproject_update(getToken(), this.c_project_id, this.c_project_edit.name, date)
        .then(() => {
          this.$message({
            type: 'success',
            message: '卡片相關更新成功'
          })
          this.get_project()
        })
        .catch((error) => {
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
    },
    c_project_del() {
      this.$confirm('你真的要刪除該卡片資料嗎？', '警告', {
        cancelButtonText: '取消',
        confirmButtonText: '確認',
        type: 'warning'
      }).then(() => {
        this.$confirm('請在確認一次是否要刪除該卡片資料資料', '警告', {
          cancelButtonText: '取消',
          confirmButtonText: '確認',
          type: 'warning'
        }).then(() => {
          const date = formatdate('yyyy-mm-dd HH:MM:ss.l')
          patchproject_delete(getToken(), this.c_project_id, date).then(() => {
            this.$message({
              type: 'success',
              message: '刪除成功'
            })
            this.get_project()
          }).catch((error) => {
            console.log(error)
            this.$message({
              type: 'error',
              message: '發生一點錯誤，請稍後再做修改'
            })
          })
          this.c_project_visible = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消刪除'
          })
          this.c_project_visible = false
        })
      }).catch(() => {
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

