<template>
  <div class="accounting_container">
    <el-container>

      <el-main>

        <el-table :data="tableData" height="70vh" style="width:90%">
          <el-table-column :label="$t('c_accounting_view.accountname')" width="200rem">
            <template slot-scope="scope">
              <el-input v-model="input" :placeholder="$t('c_accounting_view.name')" class="accounting_ipt" />

              <span style="margin-left: 10px">{{ scope.row.account }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('c_accounting_view.class')" width="200rem">
            <template slot-scope="scope">

              <el-select v-model="value" :placeholder="$t('c_accounting_view.choose')" class="accounting_opt">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>

              <span style="margin-left: 10px">{{ scope.row.class }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('c_accounting_view.categories')" width="200rem">
            <template slot-scope="scope">
              <el-select v-model="value" :placeholder="$t('c_accounting_view.choose')" class="accounting_opt">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <span style="margin-left: 10px">{{ scope.row.subclass }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('c_accounting_view.project')" width="200rem">
            <template slot-scope="scope">
              <el-select v-model="value" :placeholder="$t('c_accounting_view.choose')" class="accounting_opt">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <span style="margin-left: 10px">{{ scope.row.project }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('c_accounting_view.money')" width="200rem">
            <template slot-scope="scope">
              <el-input v-model="input" :placeholder="$t('c_accounting_view.amount')" class="accounting_ipt">
                <span style="margin-left: 10px">{{ scope.row.money }}</span>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('c_accounting_view.other')" width="400rem">
            <template slot-scope="scope">
              <el-input v-model="input" :placeholder="$t('c_accounting_view.other2')" class="accounting_ipt" />
              <span style="margin-left: 10px">{{ scope.row.remarks }}</span>
            </template>
          </el-table-column>
          <el-table-column label="" right="fixed">
            <template slot-scope="scope">

              <el-button type="danger" icon="el-icon-delete" circle />

            </template>

          </el-table-column>

        </el-table>

      </el-main>
      <el-footer>
        <div class="accounting_btn">
          <el-tooltip :content="$t('c_accounting_view.data')" class="item" effect="dark" placement="top">
            <el-button type="primary" icon="el-icon-plus" circle />
          </el-tooltip>
          <el-tooltip :content="$t('c_accounting_view.send')" class="item" effect="dark" placement="top">
            <el-button icon="el-icon-arrow-right" circle />
          </el-tooltip>
        </div>
      </el-footer>
    </el-container>

  </div>

</template>
<script>
export default {
  data() {
    return {
      options: [{
        value: '选项1',
        label: '分類1'
      }, {
        value: '选项2',
        label: '分類2'
      }, {
        value: '选项3',
        label: '分類3'
      }, {
        value: '选项4',
        label: '分類4'
      }, {
        value: '选项5',
        label: '分類5'
      }],
      value: '',
      options2: [{
        value: '选项1',
        label: '子分類1'
      }, {
        value: '选项2',
        label: '子分類2'
      }, {
        value: '选项3',
        label: '子分類3'
      }, {
        value: '选项4',
        label: '子分類4'
      }, {
        value: '选项5',
        label: '子分類5'
      }],
      value2: '',
      options3: [{
        value: '选项1',
        label: '專案1'
      }, {
        value: '选项2',
        label: '專案2'
      }, {
        value: '选项3',
        label: '專案3'
      }, {
        value: '选项4',
        label: '專案4'
      }, {
        value: '选项5',
        label: '專案5'
      }],
      value3: '',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      tableData: [{
        account: '',
        money: '',
        class: '',
        subclass: '',
        project: '',
        invoice: '',
        remarks: ''
      }]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}

</script>
<style>
.accounting_container {
  padding-left: 2vw;
  padding-top: 0.5vh;
}
.accounting_btn {
  padding-left: 73.5vw;
}
.accounting_ipt {
  padding-top: 1.9vh;
}

.accounting_opt {
  padding-top: 1.9vh;
}
</style>
