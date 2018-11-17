<template>
  <div class="app-container">

    <title>
      {{ $t('route.a_manage_member') }}
    </title>
    <div class="filter_container">
      <el-input v-model="a_select_account" placeholder="account" style="width: 25vw;max-width:7.5rem;min-width:5.5rem;" />
      <el-input v-model="a_select_name" placeholder="name" style="width: 25vw;max-width:7.5rem;min-width:5.5rem;" />
      <el-input v-model="a_select_toid" placeholder="toid" style="width: 25vw;max-width:7.5rem;min-width:5.5rem;" />
    </div>

    <div class="memberinfo_table">
      <el-table :data="a_all_member_data" stripe style="width: 100%;" max-height="650" fit>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="table_expand">
              <el-form-item label="大頭貼">
                <span>{{ scope.row.localpicture }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" align="center" />
        <el-table-column label="會員帳號">
          <template slot-scope="scope" prop="account" align="center">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column label="會員名稱">
          <template slot-scope="scope" prop="name" align="center">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="ToID">
          <template slot-scope="scope" prop="toid" align="center">
            <span>{{ scope.row.toid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="handle_advance(scope.$index,scope.row)">進階</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="advance_dialog">
      <el-dialog :visible.sync="a_member_adv_visible" title="普通會員各項操作" width="90%">
        <el-row>
          <el-col :span="12">
            <el-button type="primary" class="adv_in_btn" plain @click="get_member_info()">修改資料</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" class="adv_in_btn" plain @click="get_accounting_info()">歷史帳務</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-button type="primary" class="adv_in_btn" plain @click="get_account_info()">帳戶管理</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" class="adv_in_btn" plain @click="get_card_info()">卡片管理</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-button type="primary" class="adv_in_btn" plain @click="get_category_info()">分類管理</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" class="adv_in_btn" plain @click="get_project_info()">專案管理</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button type="info" class="adv_calbtn" @click="adv_cal()">回管理頁</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>

    <div class="editinfo_dialog">
      <el-dialog :visible.sync="c_member_confiinfo_visible" title="修改會員資訊" width="80%">
        <el-row>
          <el-col :span="24">
            <el-form ref="profile_edit_form" :model="profile_edit_form" label-position="left" inline class="personal_edit">
              <el-form-item :label="$t('c_profile_edit.email')">
                <el-input v-model="profile_edit_form.account" type="textarea" resize="none" readonly />
              </el-form-item>
              <el-form-item :label="$t('c_profile_edit.name')" prop="name">
                <el-input v-model="profile_edit_form.name" :placeholder="$t('c_profile_edit.h1')" @focus="clean_name()" />
              </el-form-item>
              <el-form-item label="ToID" prop="toid">
                <el-input v-model="profile_edit_form.toid" :placeholder="$t('c_profile_edit.h2')" @focus="clean_toid()" />
              </el-form-item>
              <el-form-item :label="$t('c_profile_edit.newpswd')" prop="pswd">
                <el-input v-model="profile_edit_form.pswd" :placeholder="$t('c_profile_edit.h3')" type="password" />
              </el-form-item>
              <el-form-item :label="$t('c_profile_edit.input')" prop="pswd2">
                <el-input v-model="profile_edit_form.pswd2" :placeholder="$t('c_profile_edit.h3')" type="password" />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button type="primary" class="info_btns" @click.native.prevent="cofigure_member_info()">{{ $t('c_profile_edit.confirm') }}</el-button>
            <el-button type="info" class="info_btns" @click.native.prevent="in_adv_motion_cal()">{{ $t('c_profile_edit.cancel') }}</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>

    <div class="accounting_dialog">
      <el-dialog :visible.sync="a_adv_accountung_visible" width="80%" title="會員歷史帳務" top="5vh">
        <div class="filter_container">
          <el-row class="date_seletor">
            <el-col :xs="6" :sm="3" :md="2" :lg="2" :xl="1" class="c_history_selector_title">
              <span>{{ $t('c_history.selecttime') }}</span>
            </el-col>
            <el-col :xs="24" :sm="15" :md="9" :lg="8" :xl="6">
              <!--style="width: 40vw;min-width:15rem;max-width:23rem;"-->
              <el-date-picker v-model="accounting_startenddate" :picker-options="accounting_datepickoptions" :start-placeholder="$t('c_history.startdate')" :end-placeholder="$t('c_history.enddate')" :clearable="datepickerclea" range-separator="-" align="center" type="daterange" @focus="get_getaccounting_all()" @change="get_getaccounting_all()" />
            </el-col>
          </el-row>
          <el-row class="class_seletor">
            <el-col :xs="6" :sm="3" :md="2" :lg="2" :xl="1" class="c_history_selector_title">
              <span>{{ $t('c_history.selectclass') }}</span>
            </el-col>
            <el-col :xs="24" :sm="15" :md="9" :lg="8" :xl="6">
              <el-select v-model="c_accounting_payorin" :placeholder="$t('c_history.incomespend')" filterable clearable style="width: 25vw;max-width:7.5rem;min-width:5.5rem;" @focus="get_getaccounting_all()" @change="get_getaccounting_all()">
                <el-option v-for="payorin in c_pay_in" :key="payorin.value" :label="payorin.label" :value="payorin.value" />
              </el-select>
              <el-select v-model="c_accounting_sort" :disabled="c_sort_disable" :placeholder="$t('c_history.mainsort')" filterable style="width: 25vw;max-width:7.5rem;min-width:6.5rem;" @focus="get_sort()" @change="get_subsort()">
                <el-option v-for="sort in c_accounting_sortitem" :key="sort.id" :label="sort.name" :value="sort.id" />
              </el-select>
              <el-select v-model="c_accounting_subsort" :disabled="c_subsort_disable" :placeholder="$t('c_history.subclass')" filterable style="width: 25vw;max-width:7.5rem;min-width:6.5rem;" @focus="get_subsort()" @change="get_subsort()">
                <el-option v-for="subsort in c_accounting_subsortitem" :key="subsort.id" :label="subsort.name" :value="subsort.id" />
              </el-select>
            </el-col>
          </el-row>
          <el-row class="project_seletor">
            <el-col :xs="6" :sm="3" :md="2" :lg="2" :xl="1" class="c_history_selector_title">
              <span>{{ $t('c_history.selectproject') }}</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="9" :lg="8" :xl="6">
              <el-select v-model="c_accounting_project" :placeholder="$t('c_history.project')" filterable style="width: 25vw;max-width:13.2rem;min-width:11.8rem;" @focus="get_project()">
                <el-option v-for="project in c_accounting_projectitem" :key="project.id" :label="project.name" :value="project.id" />
              </el-select>
            </el-col>
          </el-row>
          <el-row class="account_seletor">
            <el-col :xs="6" :sm="3" :md="2" :lg="2" :xl="1" class="c_history_selector_title">
              <span>{{ $t('c_history.selectaccount') }}</span>
            </el-col>
            <el-col :xs="24" :sm="15" :md="9" :lg="8" :xl="6">
              <el-select v-model="c_accounting_account" :placeholder="$t('c_history.account')" filterable style="width: 25vw;max-width:13.2rem;min-width:11.8rem;" @focus="get_account()">
                <el-option v-for="account in c_accounting_accountitem" :key="account.id" :label="account.name" :value="account.id" />
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="padding-top:2vh;">
              <el-button type="info" plain @click.native.prevent="clean_accounting_allselect()">清空篩選</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="history_table_container">
          <!--目前使用日期做排序-->
          <el-row>
            <el-col :span="24">
              <el-table :data="c_user_history" :default-sort="{prop: 'date', order: 'descending'}" stripe style="width: 100%;" max-height="350" fit>
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
          <el-row>
            <el-col :span="24">
              <el-button type="info" class="adv_calbtn" @click="in_adv_cal()">回操作頁</el-button>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
    </div>

    <div class="account_dialog">

      <el-dialog :visible.sync="a_adv_account_visible" width="80%" title="會員帳戶管理" top="9vh">
        <div class="filter_container">
          <el-select v-model="c_account" :placeholder="$t('c_accountmanager.project')" filterable clearable style="width: 10vw;max-width:8rem;min-width:5rem;" @change="get_account_info()">
            <el-option v-for="type in c_account_options" :key="type.accounttype_id" :label="type.name" :value="type.accounttype_id" />
          </el-select>
          <el-select v-model="c_account_name" :disabled="c_account_name_disable" :placeholder="$t('c_category.mainsortname')" filterable style="width: 25vw;max-width:7.5rem;min-width:6.5rem;" @change="get_account_info()">
            <el-option v-for="name in c_account_name_options" :key="name.id" :label="name.name" :value="name.id" />
          </el-select>
        </div>
        <div class="account_table_container">
          <el-row>
            <el-col :span="24">
              <el-table :data="c_account_data" stripe style="width: 100%;" max-height="450" fit>
                <el-table-column type="index" align="center" />
                <el-table-column :label="$t('c_accountmanager.accountname')" prop="name" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('c_accountmanager.accounttype')" prop="accounttype_id" align="center">
                  <template slot-scope="scope">
                    <el-tag :type="scope.row.accounttype_id.name==='現金'?'primary':scope.row.accounttype_id.name==='資產'?'success':scope.row.accounttype_id.name==='儲值卡'?'warning':'danger'">
                      <span>
                        {{ scope.row.accounttype_id.name }}
                      </span>
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('c_accountmanager.finallymoney')" prop="balance" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.balance }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button type="info" class="adv_calbtn" @click="in_adv_cal()">回操作頁</el-button>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
    </div>

    <div class="card_dialog">
      <el-dialog :visible.sync="a_adv_card_visible" width="80%" title="會員卡片管理" top="9vh">
        <div class="filter_container">
          <el-select v-model="c_card" :placeholder="$t('c_card_view.cardname')" clearable filterable style="width: 25vw;max-width:7.5rem;min-width:5.5rem;" @focus="get_card_info()" @change="get_card_info()">
            <el-option v-for="card in c_card_options" :key="card.id" :label="card.name" :value="card.id" />
          </el-select>
        </div>

        <div class="card_table_container">
          <el-row>
            <el-col :span="24">
              <el-table :data="c_user_card" stripe style="width: 100%;" max-height="450" fit sortable>
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
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button type="info" class="adv_calbtn" @click="in_adv_cal()">回操作頁</el-button>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
    </div>

    <div class="category_dialog">
      <el-dialog :visible.sync="a_adv_category_visible" width="80%" title="會員分類管理" top="9vh">
        <div class="filter_container">
          <el-select v-model="c_category_sort_payorin" :placeholder="$t('c_category.incomespend')" filterable clearable style="width: 10vw;max-width:8rem;min-width:5rem;" @change="get_category_info()">
            <el-option v-for="payorin in c_pay_in" :key="payorin.value" :label="payorin.label" :value="payorin.value" />
          </el-select>
          <el-select v-model="c_category_sort_id" :disabled="c_sort_disable" :placeholder="$t('c_category.mainsortname')" clearable filterable style="width: 25vw;max-width:7.5rem;min-width:6.5rem;" @change="get_category_info()">
            <el-option v-for="sort in c_category_sort_list_option" :key="sort.sort_id.id" :label="sort.sort_id.name" :value="sort.sort_id.id" />
          </el-select>
          <el-date-picker v-model="category_startenddate" :placeholder="$t('c_category.choose')" :clearable="datepickerclea" value-format="yyyy-MM" align="center" type="month" style="width: 10vw;min-width:7rem;max-width:10rem;" />
        </div>
        <div class="category_table_container">
          <el-row>
            <el-col :span="24">
              <el-table :data="c_user_category" stripe style="width: 100%;" max-height="450" fit>
                <el-table-column type="index" align="center" />
                <el-table-column :label="$t('c_category.name')" prop="name" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sort_id.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('c_category.budgetmonth')" prop="budget" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.budget }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('c_category.spendingmonth')" prop="amount" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.amount }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('c_category.remainingbudget')" prop="balance" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.balance }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-row>
              <el-col :span="24">
                <el-button type="info" class="adv_calbtn" @click="in_adv_cal()">回操作頁</el-button>
              </el-col>
            </el-row>
          </el-row>
        </div>
      </el-dialog>
    </div>

    <div class="project_dialog">
      <el-dialog :visible.sync="a_adv_project_visible" width="80%" title="會員專案管理" top="9vh">
        <div class="filter-container">
          <el-select v-model="c_project" placeholder="專案名稱" clearable filterable style="width: 25vw;max-width:7.5rem;min-width:5.5rem;" @focus="get_project_info()" @change="get_project_info()">
            <el-option v-for="project in c_project_options" :key="project.id" :label="project.name" :value="project.id" />
          </el-select>
        </div>
        <div class="project_table_container">
          <el-row>
            <el-col :span="24">
              <el-table :data="c_user_project" stripe style="width: 100%;" max-height="450" fit sortable>
                <el-table-column type="index" align="center" />
                <el-table-column label="名稱" prop="name" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="總收入" prop="total_income" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.total_income }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="總支出" prop="total_expenses" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.total_expenses }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button type="info" class="adv_calbtn" @click="in_adv_cal()">回操作頁</el-button>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
    </div>

  </div>

</template>

<script>
import waves from '@/directive/waves' // 水波紋指令
import { getcardforadmin } from '@/api/card/getcard'
import { getmember, getmemberlist } from '@/api/member/getmember'
import { getToken } from '@/utils/auth'
import { formatdate } from '@/utils/index'
import { getaccountforadmin, getaccounttype } from '@/api/account/getaccount'
import { getprojectforadmin } from '@/api/project/getproject'
import { getsortbudgetforadmin } from '@/api/sortbudget/getsortbudget'

export default {
  name: 'AManageMember',
  directives: {
    waves
  },
  data() {
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
    return {
      globaltime: formatdate('yyyy-mm-dd HH:MM:ss.l'),
      datepickerclea: false,
      // ori-page
      profile_edit_form: {
        id: '', // member id for all confi
        account: '',
        name: '',
        toid: '',
        pswd: '',
        pswd2: ''
      },
      a_select_account: '',
      a_select_name: '',
      a_select_toid: '',
      a_all_member_data: [],
      a_member_adv_visible: false,
      c_member_confiinfo_visible: false,
      a_adv_accountung_visible: false,
      a_adv_account_visible: false,
      a_adv_card_visible: false,
      a_adv_category_visible: false,
      a_adv_project_visible: false,

      // account
      c_account_data: [],
      c_account: '',
      c_account_name: '',
      c_account_options: '',
      c_account_name_options: '',
      c_account_name_disable: true,

      // card
      c_card: '',
      c_card_options: [],
      c_user_card: [],

      // accounting
      c_accounting_payorin: '',
      c_accounting_sort: '',
      c_accounting_subsort: '',
      c_accounting_project: '',
      c_accounting_account: '',
      c_accounting_sortitem: [],
      c_accounting_subsortitem: [],
      c_accounting_projectitem: [],
      c_accounting_accountitem: [],
      c_user_history: [],
      accounting_startenddate: [start, formatdate('yyyy-mm-dd HH:MM:ss.l')],
      accounting_datepickoptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime())
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一週',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一個月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三個月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近六個月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
              picker.$emit('pick', [start, end])
            }
          }]
      },

      // category
      c_pay_in: [{ label: '支出', value: 0 }, { label: '收入', value: 1 }],
      c_category_sort_payorin: '',
      c_category_sort_id: '',
      c_category_sort_list_option: [],
      c_user_category: [],
      c_sort_disable: true,
      category_startenddate: formatdate('yyyy-mm'),

      // project
      c_project: '',
      c_project_options: [],
      c_user_project: []
    }
  },
  watch: {
    c_account: function(new_type, old_type) {
      if (new_type !== '') {
        this.c_account_name = ''
        this.c_account_name_disable = false
      } else if (new_type !== old_type) {
        this.c_account_name = ''
        this.get_account_info()
      }
    },
    c_category_sort_payorin: function(newpi, oldpi) {
      if (this.c_category_sort_payorin === '') {
        this.c_sort_disable = true
        this.c_category_sort_id = ''
      } else if (newpi !== oldpi) {
        this.c_category_sort_id = ''
        this.c_sort_disable = false
      }
    },
    category_startenddate: function(newdate, olddate) {
      const todayplus3 = new Date()
      const todayde3 = new Date()
      const time = new Date(newdate)
      todayplus3.setTime(todayplus3.getTime() + 3600 * 1000 * 24 * 90)
      todayde3.setTime(todayde3.getTime() - 3600 * 1000 * 24 * 90)
      time.setTime(time.getTime())

      if (time > todayplus3 || time < todayde3) {
        this.category_startenddate = formatdate('yyyy-mm')
        this.$message({
          type: 'warning',
          message: '只能選擇前後各三個月的時間'
        })
      } else if (newdate !== olddate) {
        this.get_category_info()
      }
    }
    /*
    accounting_startenddate: function(newdate, olddate) {
      const todayplus3 = new Date()
      const todayde3 = new Date()
      const time = new Date(newdate)
      todayplus3.setTime(todayplus3.getTime() + 3600 * 1000 * 24 * 90)
      todayde3.setTime(todayde3.getTime() - 3600 * 1000 * 24 * 90)
      time.setTime(time.getTime())

      if (time > todayplus3 || time < todayde3) {
        this.category_startenddate = formatdate('yyyy-mm')
        this.$message({
          type: 'warning',
          message: '只能選擇前後各三個月的時間'
        })
      } else if (newdate !== olddate) {
        this.get_category_info()
      }
    }
    */
  },
  created() {
    this.get_member_all()
  },
  methods: {
    get_member_all() {
      getmember(getToken())
        .then((res) => {
          const testmember = res.data
          const ori_data = []
          for (let i = 1; i <= testmember.length; i++) {
            setTimeout(() => {
              getmemberlist(getToken(), i)
                .then((res_data) => {
                  if ((res_data.status) !== 404) {
                    ori_data.push(res_data.data)
                    this.a_all_member_data = ori_data.filter(function(item, index, array) {
                      return item.membertype === 2 || item.membertype === 3 || item.membertype === 4
                    })
                  } else {
                    return
                  }
                })
            }, i * 20)
          }
        })
    },
    get_member_info() {
      this.c_member_confiinfo_visible = true
      console.log(this.profile_edit_form.id)
      getmemberlist(getToken(), this.profile_edit_form.id)
        .then((res) => {
          this.profile_edit_form.account = res.data.account
          this.profile_edit_form.name = res.data.name
          this.profile_edit_form.toid = res.data.toid
        })
    },
    get_accounting_info() {
      // not done
      this.a_adv_accountung_visible = true
    },
    get_account_info() {
      // not done
      this.a_adv_account_visible = true
      this.c_account_data = []
      if (this.c_account === '') {
        this.c_account_name_disable = true
      }
      getaccountforadmin(getToken()
        , this.profile_edit_form.id
        , this.c_account
        , this.c_account_name)
        .then((res) => {
          this.c_account_data = res.data
        })
      getaccountforadmin(getToken()
        , this.profile_edit_form.id
        , this.c_account)
        .then((res) => {
          this.c_account_name_options = res.data
        })
      getaccounttype(getToken())
        .then((res) => {
          this.c_account_options = res.data
        })
    },

    get_card_info() {
      this.c_user_card = []
      if (this.c_card === '') {
        getcardforadmin(getToken(), this.profile_edit_form.id).then((res) => {
          this.c_card_options = res.data
          this.c_user_card = res.data
        })
      } else {
        getcardforadmin(getToken(), this.profile_edit_form.id, this.c_card).then((res) => {
          this.c_user_card = res.data
        })
      }
      this.a_adv_card_visible = true
    },
    get_category_info() {
      // not done
      this.a_adv_category_visible = true
      let send_payin
      if (this.c_category_sort_payorin === 0) {
        send_payin = 'False'
      } else if (this.c_category_sort_payorin === 1) {
        send_payin = 'True'
      } else {
        send_payin = ''
        this.c_category_sort_id = ''
      }

      getsortbudgetforadmin(getToken()
        , this.profile_edit_form.id
        , this.category_startenddate.substring(0, 4)
        , this.category_startenddate.substring(5, 8)
        , send_payin
        , this.c_category_sort_id
      )
        .then((res) => {
          this.c_user_category = []
          this.c_user_category = res.data
        })

      getsortbudgetforadmin(getToken()
        , this.profile_edit_form.id
        , this.category_startenddate.substring(0, 4)
        , this.category_startenddate.substring(5, 8)
        , send_payin)
        .then((res) => {
          this.c_category_sort_list_option = []
          this.c_category_sort_list_option = res.data
        })
    },
    get_project_info() {
      this.a_adv_project_visible = true
      if (this.c_project === '') {
        getprojectforadmin(getToken(), this.profile_edit_form.id)
          .then((res) => {
            this.c_project_options = res.data
            this.c_user_project = res.data
          })
      } else {
        getprojectforadmin(getToken(), this.profile_edit_form.id, this.c_project)
          .then((res) => {
            this.c_user_project = res.data
          })
      }
    },

    cofigure_member_info() {
      // not done
    },
    handle_advance(index, row) {
      this.a_member_adv_visible = true
      this.profile_edit_form.id = row.id
    },
    clean_name() {
      this.profile_edit_form.name = ''
    },
    clean_toid() {
      this.profile_edit_form.toid = ''
    },
    clean_accounting_allselect() {
      this.c_accounting_payorin = ''
      this.c_accounting_sort = ''
      this.c_accounting_subsort = ''
      this.c_accounting_project = ''
      this.c_accounting_account = ''
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      this.accounting_startenddate = [start, formatdate('yyyy-mm-dd HH:MM:ss.l')]
    },
    in_adv_motion_cal() {
      // 3層以上的功能
      // btn-cal in add confi del finc view
      this.c_account_add_visible = false
      this.c_member_confiinfo_visible = false
      this.$message({
        type: 'info',
        message: '已取消動作'
      })
    },
    in_adv_cal() {
      // 所有3層取消打在這  會回到2層
      this.a_adv_project_visible = false
      this.a_adv_card_visible = false
      this.a_adv_account_visible = false
      this.a_adv_category_visible = false
      this.a_adv_accountung_visible = false
    },
    adv_cal() {
      // 這個是2層回1層
      this.a_member_adv_visible = false
    }
  }
}
</script>
<style lang="scss">
.info_btns {
  float: right;
  margin-right: 1vw;
}
.adv_calbtn {
  float: right;
  margin-top: 5vh;
}
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
.advance_dialog .el-row {
  padding-top: 3vh;
}
.advance_dialog .el-col {
  text-align: center;
}
.advance_dialog .el-col .adv_in_btn {
  width: 80%;
  text-align: center;
}
.personal_edit {
  font-size: 0;
}
.personal_edit label {
  width: 90px;
  color: #99a9bf;
  font-size: 1.2vw;
}
.personal_edit input {
  font-family: "Microsoft JhengHei";
  width: 130%;
}
.personal_edit textarea {
  font-family: "Microsoft JhengHei";
  border: 0;
  width: 130%;
  padding-top: 0.65rem;
}
.personal_edit .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
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
.table_account_add {
  font-size: 0;
}
.table_account_add label {
  width: 100px;
  color: #99a9bf;
}
.table_account_add .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 50%;
}
.c_history_selector_title {
  line-height: 2.25rem;
  font-size: 0.7vw;
}
</style>
