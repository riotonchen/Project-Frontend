<template>
  <div class="app-container">
    <title>
      {{ $t('route.c_cardmanager') }}
    </title>
    <div class="filter-container">
      <el-select v-model="listQuery.id" :placeholder="$t('c_card_view.cardname')" clearable filterable style="width: 25vw;max-width:7.5rem;min-width:5.5rem;" @focus="get_cardlist()" @change="get_cardlist()">
        <el-option v-for="card in c_cardlist" :key="card.id" :label="card.name" :value="card.id" />
      </el-select>
    </div>
    <div class="card_table_container">
      <el-table :data="c_user_card" stripe style="width: 100%;" max-height="500" fit sortable>
        <el-table-column type="index" align="center" />
        <el-table-column :label="$t('c_card_view.name')" prop="name" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('c_card_view.codenumber')" prop="number" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.number }}</span>
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
      <el-dialog :visible.sync="c_card_visible" width="80vw" title="子分類">
        <el-form ref="c_card_edit" :model="c_card_edit" :rules="c_card_edit_rules" label-position="left" inline class="table_card">
          <el-form-item>
            <span>{{ $t('c_card_view.blank') }}</span>
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item :label="$t('c_card_view.name')" prop="name">
            <el-input v-model="c_card_edit.name" :placeholder="c_card_name_p" clearable name="name" @focus="clean_name()" />
          </el-form-item>
          <el-form-item :label="$t('c_card_view.codenumber')" prop="number">
            <el-input v-model="c_card_edit.number" :placeholder="c_card_number_p" clearable name="number" @focus="clean_number()" />
          </el-form-item>
        </el-form>

        <span slot="footer" class="invoice_dialog_footer">
          <el-button type="danger" plain @click.native.prevent="c_card_del()">{{ $t('c_card_view.delete') }}</el-button>
          <el-button type="primary" @click.native.prevent="c_card_confirm()">{{ $t('c_card_view.confirm') }}</el-button>
          <el-button type="info" plain @click.native.prevent="c_card_cal()">{{ $t('c_card_view.cancel') }}</el-button>
        </span>

      </el-dialog>
    </div>
  </div>
</template>

<script>

import waves from '@/directive/waves' // 水波紋指令
import { getcard } from '@/api/card/getcard'
import { patchcard_modify, patchcard_del } from '@/api/card/patchcard'
import { getToken } from '@/utils/auth'
import { formatdate } from '@/utils/index'

export default {
  name: 'CCard',
  directives: {
    waves
  },
  data() {
    const validecardnamelength = (rule, value, callback) => {
      if (value.length > 10) {
        callback(new Error('卡片名稱至多10碼'))
      } else {
        callback()
      }
    }
    const validecardnumberlength = (rule, value, callback) => {
      if (value.length > 100) {
        callback(new Error('條碼編號上限為100字，如持有卡更長，請聯繫我們'))
      } else {
        callback()
      }
    }
    return {
      listQuery: {
        id: undefined
      },
      c_card_id: '',
      c_card_name_p: '',
      c_card_number_p: '',
      c_cardlist: [],
      c_carditem: [],
      c_user_card: null,
      c_card_visible: false,
      c_card_edit: {
        name: '',
        number: ''
      },
      c_card_edit_rules: {
        name: [{ required: false, trigger: 'change', validator: validecardnamelength }],
        number: [{ required: false, trigger: 'change', validator: validecardnumberlength }]
      }
    }
  },
  watch: {
  },
  created() {
    this.get_cardlist()
  },
  methods: {
    clean_name() {
      this.c_card_edit.name = ''
    },
    clean_number() {
      this.c_card_edit.number = ''
    },
    handle_edit(index, row) {
      this.c_card_id = row.id
      this.c_card_name_p = row.name
      this.c_card_edit.name = row.name
      this.c_card_number_p = row.number
      this.c_card_edit.number = row.number
      this.c_card_visible = true
    },
    get_cardlist() {
      getcard(getToken()).then(response => {
        this.c_cardlist = response.data
        this.get_card()
      }).catch((error) => {
        console.log(error)
      })
    },
    get_card() {
      getcard(getToken(), this.listQuery).then(response => {
        this.c_carditem = response.data
        this.c_user_card = response.data
      }).catch((error) => {
        console.log(error)
      })
    },
    c_card_confirm() {
      const date = formatdate('yyyy-mm-dd HH:MM:ss.l')
      patchcard_modify(getToken(), this.c_card_id, this.c_card_edit.name, this.c_card_edit.number, date)
        .then(() => {
          this.$message({
            type: 'success',
            message: '卡片相關更新成功'
          })
          this.get_card()
        })
        .catch((error) => {
          console.log(error)
          this.$message({
            type: 'error',
            message: '發生一點錯誤，請稍後再做修改'
          })
        })
      this.c_card_visible = false
    },
    c_card_cal() {
      this.$message({
        type: 'info',
        message: '已取消動作'
      })
      this.c_card_visible = false
    },
    c_card_del() {
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
          patchcard_del(getToken(), this.c_card_id, date).then(() => {
            this.$message({
              type: 'success',
              message: '刪除成功'
            })
            this.get_card()
          }).catch((error) => {
            console.log(error)
            this.$message({
              type: 'error',
              message: '發生一點錯誤，請稍後再做修改'
            })
          })
          this.c_card_visible = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消刪除'
          })
          this.c_card_visible = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刪除'
        })
        this.c_card_visible = false
      })
    }
  }
}
</script>
<style lang="scss">
.table_expand {
  font-size: 0;
}
.table_expand label {
  width: 90px;
  color: #99a9bf;
}
.table_expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}

.table_card {
  font-size: 0;
}
.table_card label {
  width: 100px;
  color: #99a9bf;
}
.table_card .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 50%;
}
</style>

