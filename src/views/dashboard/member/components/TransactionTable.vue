<template>
  <!--
  <el-table :data="list" style="width: 100%;padding-top: 15px;">

    <el-table-column label="Order_No" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.order_no | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="195" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.price | toThousandFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter"> {{ scope.row.status }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
   -->
  <div>
    <el-row>
      <el-col :span="24" class="accounting_title_col">
        <span>最近交易紀錄</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="c_user_history" :default-sort="{prop: 'purchasedate', order: 'descending'}" stripe style="width: 100%;" max-height="345" fit>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-form label-position="left" inline class="table_expand">
                <!--
              <el-form-item label="發票隨機碼">
                <div v-if="scope.row.invoice_id==='-'">
                  <span>
                    {{ scope.row.invoice_id }}
                  </span>
                </div>
                <div v-else>
                  <span>
                    {{ scope.row.invoice_id.randomNumber }}
                  </span>
                </div>
              </el-form-item>
              -->
                <el-form-item :label="$t('c_history.note')">
                  <span>{{ scope.row.comment }}</span>
                </el-form-item>
                <el-form-item :label="$t('c_history.picture')">
                  <span>{{ scope.row.picture }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column :label="$t('c_history.date')" prop="purchasedate" sortable align="center">
            <template slot-scope="scope">
              <span>
                {{ scope.row.purchasedate }}
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('c_history.receipt')" prop="invoice_id.number" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.invoice_id==='-'">
                <span>
                  {{ scope.row.invoice_id }}
                </span>
              </div>
              <div v-else>
                <span>
                  {{ scope.row.invoice_id.number }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('c_history.incomespend')" prop="type" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.type==='支出'?'danger':'primary'">
                <span>
                  {{ scope.row.type }}
                </span>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('c_history.mainsort')" prop="sort_id.name" align="center">
            <template slot-scope="scope">
              <span>
                {{ scope.row.sort_id.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('c_history.subclass')" prop="subsort_id.name" align="center">
            <template slot-scope="scope">
              <span>
                {{ scope.row.subsort_id.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('c_history.project')" prop="project_id.name" align="center">
            <template slot-scope="scope">
              <span>
                {{ scope.row.project_id.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('c_history.account')" prop="account_id.name" align="center">
            <template slot-scope="scope">
              <span>
                {{ scope.row.account_id.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('c_history.money')" prop="amount" align="center">
            <template slot-scope="scope">
              <span>
                {{ scope.row.amount }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getaccounting_all } from '@/api/accounting/getaccounting'
import { getToken } from '@/utils/auth'

export default {
  name: 'Memberaccountinglist',
  data() {
    return {
      c_user_history: []
    }
  },
  created() {
    this.get_getaccounting_all()
  },
  methods: {
    get_getaccounting_all() {
      let startdate
      let enddate
      let payinval
      this.c_user_history = []
      getaccounting_all(getToken(), startdate, enddate, payinval, this.c_sort, this.c_subsort, this.c_project, this.c_account).then((res) => {
        this.c_user_history = res.data
        this.c_user_history.forEach(items => {
          if (items.type === false) {
            items.type = '支出'
          } else {
            items.type = '收入'
          }
          if (items.invoice_id === null || items.invoice_id === undefined) {
            items.invoice_id = '-'
          }
        })
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
.accounting_title_col {
  padding: 15px;
  background-color: #fff;
  text-align: center;
  font-size: 1.2vw;
  font-weight: bold;
}
</style>

