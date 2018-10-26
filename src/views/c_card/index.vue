<template>
  <div class="app-container">
    <title>
      {{ $t('route.c_cardmanager') }}
    </title>
    <div class="filter-container">
      <el-select v-model="listQuery.id" placeholder="票卡名稱" clearable filterable style="width: 25vw;max-width:7.5rem;min-width:5.5rem;" @focus="get_cardlist()" @change="get_cardlist()">
        <el-option v-for="card in c_cardlist" :key="card.id" :label="card.name" :value="card.id" />
      </el-select>
    </div>
    <div class="history_table_container">
      <el-table :data="c_user_card" stripe style="width: 100%;min-width:20rem;max-width:33rem;" max-height="470" fit sortable>
        <el-table-column prop="id" label="編號" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="條碼編號" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="">
          <template slot-scope="scope">
            <el-button type="primary" @click="handle_edit(scope.$index,scope.row)">編輯</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog_container">
      <el-dialog :visible.sync="c_card_visible" width="80vw" title="編輯">
        <el-form :model="c_card_edit" label-position="left" inline class="table-card">
          <el-form-item>
            <span>以下如不修改保持空白即可</span>
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item label="卡片名稱">
            <el-input v-model="c_card_edit.name" :placeholder="c_card_name_p" clearable />
          </el-form-item>
          <el-form-item label="條碼編號">
            <el-input v-model="c_card_edit.number" :placeholder="c_card_number_p" clearable />
          </el-form-item>
        </el-form>

        <span slot="footer" class="invoice_dialog_footer">
          <el-button type="danger" @click="c_card_del()">刪除</el-button>
          <el-button type="primary" @click="c_card_confirm()">確定</el-button>
          <el-button type="info" plain @click="c_card_cal()">取消</el-button>
        </span>

      </el-dialog>
    </div>
  </div>
</template>

<script>

import waves from '@/directive/waves' // 水波紋指令
import { getcard } from '@/api/card/getcard'
import { patchcard } from '@/api/card/patchcard'
import { getToken } from '@/utils/auth'

export default {
  name: 'CCard',
  directives: {
    waves
  },
  data() {
    return {
      listQuery: {
        id: undefined
      },
      c_card_time: '',
      c_card_id: '',
      c_card_name_p: '',
      c_card_number_p: '',
      c_cardlist: [],
      c_carditem: [],
      c_user_card: null,
      c_card_edit: {
        name: '',
        number: ''
      },
      c_card_visible: false
    }
  },
  watch: {

  },
  created() {
    this.get_cardlist()
    this.get_card()
  },
  methods: {
    handle_edit(index, row) {
      this.c_card_id = row.id
      this.c_card_name_p = row.name
      this.c_card_number_p = row.number
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
      patchcard(getToken(), this.c_card_id, this.c_card_edit.name, this.c_card_edit.number, this.c_card_time)
        .then(() => {})
        .catch((error) => {
          console.log(error)
        })
      this.$message({
        type: 'success',
        message: '已完成該卡片資料資料修改'
      })
      this.c_card_visible = false
    },
    c_card_cal() {
      this.$message({
        type: 'info',
        message: '已取消修改'
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
          this.c_card_visible = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刪除'
        })
        this.c_card_visible = false
      })
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>
<style lang="scss">
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

.table-card {
  font-size: 0;
}
.table-card label {
  width: 90px;
  color: #99a9bf;
}
.table-card .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 50%;
}
</style>

