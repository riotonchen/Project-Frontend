<template>
  <div class="accounting_container">
    <title>
      {{ $t('route.accounting') }}
    </title>
    <el-container>

      <el-main>

        <el-table ref="accountingform" :data="tableData" :model="accountingtable" :rules="accountingRules" height="60vh" style="width:100%">

          <el-table-column :label="$t('c_accounting_view.purchasingtime')" width="135rem">
            <template slot-scope="scope">
              <el-date-picker v-model="c_purchasingtime" type="date" placeholder="選擇日期" class="accounting" />
              <span style="margin-left: 10px">{{ scope.row.c_purchasingtime }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('c_accounting_view.account')" width="120rem">
            <template slot-scope="scope">
              <el-select v-model="c_account" :placeholder="$t('c_accounting_view.choose')" class="accounting">
                <el-option v-for="item in accountoptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <span style="margin-left: 10px">{{ scope.row.account }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('c_accounting_view.class')" width="120rem">

            <template slot-scope="scope">

              <div class="block">
                <span class="demonstration" />
                <el-cascader :options="classoptions" placeholder="請選擇" filterable class="accounting" />

                <span style="margin-left: 10px">{{ scope.row.account }}</span>
              </div>
            </template>

          </el-table-column>

          <el-table-column :label="$t('c_accounting_view.project')" width="120rem">
            <template slot-scope="scope">
              <el-select v-model="c_project" :placeholder="$t('c_accounting_view.choose')" class="accounting">
                <el-option v-for="item in projectoptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <span style="margin-left: 10px">{{ scope.row.project }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('c_accounting_view.invoice')" width="140rem" prop="invoice">
            <template slot-scope="scope">
              <el-input v-model="accountingtable.invoice" :placeholder="$t('XX00000000')" class="accounting" name="invoice" />
              <span style="margin-left: 10px">{{ scope.row.invoice }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('c_accounting_view.money')" width="120rem" prop="money">
            <template slot-scope="scope">
              <el-input v-model="accountingtable.money" :placeholder="$t('c_accounting_view.amount')" class="accounting" name="money" />
              <span style="margin-left: 10px">{{ scope.row.money }}</span>

            </template>
          </el-table-column>
          <el-table-column :label="$t('c_accounting_view.remark')" width="200rem">
            <template slot-scope="scope">
              <el-input v-model="accountingtable.remarks" :placeholder="$t('c_accounting_view.addremark')" class="accounting" prop="remarks" />
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
import { validinvoice } from '@/utils/validate'
export default {
  data() {
    const isvalidinvoice = (rule, value, callback) => {
      if (!validinvoice(value)) {
        callback(new Error('英文字需大寫且數字需等於8碼'))
      } else {
        callback()
      }
    }
    const Validatemoney = (rule, value, callback) => { /* 金額只能輸入數字*/
      if (!Validatemoney(value)) {
        callback(new Error('只能輸入數字'))
      } else {
        callback()
      }
    }
    const accountingremarks = (rule, value, callback) => { /* 備註:中英*/
      if (value.length > 64) { /* 上限64*/
        callback(new Error('不能超過64個字符'))
      } else {
        callback()
      }
    }
    return {
      accountingtable: {
        invoice: '',
        money: '',
        remarks: ''
      },
      accountingformRules: {
        invoice: [{ trigger: 'blur', validator: isvalidinvoice }],
        money: [{ trigger: 'blur', validator: Validatemoney }],
        remarks: [{ trigger: 'blur', validator: accountingremarks }]
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }]
      },
      c_purchasingtime: '',

      classoptions: [{
        value: '',
        label: '',
        children: [{
          value: '',
          label: '',
          children: [{
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }]
        }, {
          value: '',
          label: '',
          children: [{
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }]
        }]
      }, {
        value: '',
        label: '',
        children: [{
          value: '',
          label: '',
          children: [{
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }]
        }, {
          value: '',
          label: '',
          children: [{
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }]
        }, {
          value: '',
          label: '',
          children: [{
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }]
        }, {
          value: '',
          label: '',
          children: [{
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }]
        }, {
          value: '',
          label: '',
          children: [{
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }]
        }, {
          value: '',
          label: '',
          children: [{
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }, {
            value: '',
            label: ''
          }]
        }]
      }, {
        value: '',
        label: '',
        children: [{
          value: '',
          label: ''
        }, {
          value: '',
          label: ''
        }, {
          value: '',
          label: ''
        }]
      }],
      c_account: '',
      accountoption: [{
        value: '',
        label: ''
      }, {
        value: '',
        label: ''
      }, {
        value: '',
        label: ''
      }, {
        value: '',
        label: ''
      }, {
        value: '',
        label: ''
      }],
      c_project: '',
      projectoptions: [{
        value: '',
        label: ''
      }, {
        value: '',
        label: ''
      }, {
        value: '',
        label: ''
      }, {
        value: '',
        label: ''
      }, {
        value: '',
        label: ''
      }],
      value3: '',
      formLabelAlign: {
        papertime: '',
        invoice: '',
        money: '',
        other: ''
      },
      tableData: [{
        papertime: '',
        account: '',
        money: '',
        class: '',
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
  padding-left: 0.2vw;
  padding-top: 0.5vh;
}
.accounting_btn {
  padding-left: 73.5vw;
  padding-top: 0.1vh;
}
.accounting {
  padding-top: 2.6vh;
}
</style>
