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
      <el-dialog :visible.sync="a_adv_info_visible" title="修改會員資訊" width="80%">
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
            <el-button type="info" class="info_btns" @click.native.prevent="in_adv_cal()">{{ $t('c_profile_edit.cancel') }}</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>

    <div class="accounting_dialog">
      <el-dialog :visible.sync="a_adv_accountung_visible" width="80%" title="會員歷史帳務" />
    </div>

    <div class="account_dialog">

      <el-dialog :visible.sync="a_adv_account_visible" width="80%" title="會員帳戶管理" top="9vh">
        <div class="filter_container">
          <el-select v-model="c_account_type" :placeholder="$t('c_accountmanager.project')" filterable clearable style="width: 10vw;max-width:8rem;min-width:5rem;" @change="get_account_info()">
            <el-option v-for="type in c_account_type_options" :key="type.accounttype_id" :label="type.name" :value="type.accounttype_id" />
          </el-select>
          <el-select v-model="c_account_name" :disabled="c_account_name_disable" :placeholder="$t('c_category.mainsortname')" filterable style="width: 25vw;max-width:7.5rem;min-width:6.5rem;" @change="get_account_info()">
            <el-option v-for="name in c_account_name_options" :key="name.id" :label="name.name" :value="name.id" />
          </el-select>
          <el-button type="primary" @click="c_account_add_view()">
            {{ $t('c_accountmanager.data') }}
          </el-button>
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
                <el-table-column :label="$t('c_accountmanager.use')" align="center">
                  <template slot-scope="scope">
                    <el-button type="primary" plain @click.native.prevent="handle_edit(scope.$index,scope.row)">{{ $t('c_card_view.edit') }}</el-button>
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
    <div class="c_account_add_dialog_container">
      <!--新增-->
      <el-dialog :visible.sync="c_account_add_visible" :title="$t('c_accountmanager.addnewaccount')" width="70%">
        <el-form ref="c_category_add" :model="c_account_add" :rules="c_category_add_rules" label-position="left" inline class="table_account_add">
          <el-form-item :label="$t('c_accountmanager.accountname')" prop="name">
            <el-input v-model="c_account_add.name" :placeholder="$t('c_accountmanager.accountname')" />
          </el-form-item>
          <el-form-item :label="$t('c_accountmanager.accounttype')" prop="type">
            <el-select v-model="c_account_add.type" :placeholder="$t('c_accountmanager.project')" filterable clearable @focus="get_account()" @change="get_account()">
              <el-option v-for="type in c_account_type_options" :key="type.accounttype_id" :label="type.name" :value="type.accounttype_id" />
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer">
          <el-button type="primary" @click.native.prevent="c_account_add()">{{ $t('c_accountmanager.confirm') }}</el-button>
          <el-button type="info" plain @click.native.prevent="in_adv_motion_cal()">{{ $t('c_accountmanager.cancel') }}</el-button>
        </span>

      </el-dialog>
    </div>
    <div class="c_account_confi_dialog_container">
      <!--修改-->
      <el-dialog :visible.sync="c_account_configure_visible" :title="$t('c_accountmanager.configure')" width="70%">
        <el-form ref="c_account_configure" :model="c_account_configure" label-position="left" inline class="table_account_confi">
          <el-form-item :label="$t('c_accountmanager.accountname')" prop="name">
            <el-input v-model="c_account_configure.name" :placeholder="c_account_add_name_p" />
          </el-form-item>
          <!--
          <el-form-item :label="$t('c_accountmanager.accounttype')">
            <el-select v-model="c_account_configure.type" :placeholder="$t('c_accountmanager.project')" filterable clearable>
              <el-option v-for="type in c_account_type_options" :key="type.accounttype_id" :label="type.name" :value="type.accounttype_id" />
            </el-select>
          </el-form-item>
          -->
          <el-form-item :label="$t('c_accountmanager.finallymoney')" prop="balance">
            <el-input v-model="c_account_configure.balance" :placeholder="c_account_add_balance_p" />
          </el-form-item>
        </el-form>

        <span slot="footer">
          <el-button type="danger" plain @click.native.prevent="c_account_del()">{{ $t('c_accountmanager.delete') }}</el-button>
          <el-button type="primary" @click.native.prevent="c_account_configure()">{{ $t('c_accountmanager.confirm') }}</el-button>
          <el-button type="info" plain @click.native.prevent="c_account_cal()">{{ $t('c_accountmanager.cancel') }}</el-button>
        </span>

      </el-dialog>
    </div>

    <div class="card_dialog">
      <el-dialog :visible.sync="a_adv_card_visible" width="80%" title="會員卡片管理">
        <div class="filter_container">
          <el-select v-model="card_id" :placeholder="$t('c_card_view.cardname')" clearable filterable style="width: 25vw;max-width:7.5rem;min-width:5.5rem;" @focus="get_card_info()" @change="get_card_info()">
            <el-option v-for="card in c_cardlistoptions" :key="card.id" :label="card.name" :value="card.id" />
          </el-select>
        </div>

        <div class="card_table_container">
          <el-row>
            <el-col :span="24">
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
                    <el-button type="primary" plain @click.native.prevent="handle_card_edit(scope.$index,scope.row)">{{ $t('c_card_view.edit') }}</el-button>
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

    <div class="card_dialog_container">
      <el-dialog :visible.sync="c_card_confi_visible" :title="$t('c_card_view.edit')" width="70%">
        <el-form ref="c_card_edit" :model="c_card_edit" hide-required-asterisk label-position="left" inline class="table_card">
          <el-form-item :label="$t('c_card_view.name')" prop="name">
            <el-input v-model="c_card_edit.name" :placeholder="c_card_name_p" clearable name="name" @focus="clean_name()" />
          </el-form-item>
          <el-form-item :label="$t('c_card_view.codenumber')" prop="number">
            <el-input v-model="c_card_edit.number" :placeholder="c_card_number_p" clearable name="number" @focus="clean_number()" />
          </el-form-item>
        </el-form>

        <span slot="footer" class="card_dialog_footer">
          <el-button type="danger" plain @click.native.prevent="c_card_del()">{{ $t('c_card_view.delete') }}</el-button>
          <el-button type="primary" @click.native.prevent="c_card_confirm()">{{ $t('c_card_view.confirm') }}</el-button>
          <el-button type="info" plain @click.native.prevent="in_adv_motion_cal()">{{ $t('c_card_view.cancel') }}</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="category_dialog">
      <el-dialog :visible.sync="a_adv_category_visible" width="80%" title="會員分類管理" />
    </div>

    <div class="project_dialog">
      <el-dialog :visible.sync="a_adv_project_visible" width="80%" title="會員專案管理" />
    </div>

  </div>

</template>

<script>
import waves from '@/directive/waves' // 水波紋指令
import { getcardforadmin } from '@/api/card/getcard'
import { patchcard_modify, patchcard_del } from '@/api/card/patchcard'
import { getmember, getmemberlist } from '@/api/member/getmember'
import { getToken } from '@/utils/auth'
import { formatdate } from '@/utils/index'

import { postaccount } from '@/api/account/postaccount'
import { getaccountforadmin, getaccounttype, getaccountsingledata } from '@/api/account/getaccount'
import { patchaccount_modify, patchaccount_del } from '@/api/account/patchaccount'

export default {

  name: 'AManageMember',
  directives: {
    waves
  },
  data() {
    return {
      globaltime: formatdate('yyyy-mm-dd HH:MM:ss.l'),
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
      a_adv_info_visible: false,
      a_adv_accountung_visible: false,
      a_adv_account_visible: false,
      a_adv_card_visible: false,
      a_adv_category_visible: false,
      a_adv_project_visible: false,

      // account
      c_account_data: [],
      c_account_type: '',
      c_account_name: '',
      c_account_type_options: '',
      c_account_name_options: '',
      c_account_name_disable: true,
      c_account_add_visible: false,
      c_account_configure_visible: false,
      c_account_add: {
        name: '',
        type: ''
      },
      c_account_configure: {
        name: '',
        type: ''
      },

      // card
      card_id: '',
      c_card_name_p: '',
      c_card_number_p: '',
      c_card_edit: {
        id: '',
        name: '',
        number: ''
      },
      c_cardlistoptions: [],
      c_user_card: [],
      c_card_confi_visible: false
    }
  },
  watch: {
    c_account_type: function(new_type, old_type) {
      if (new_type !== '') {
        this.c_account_name_disable = false
      } else if (new_type === '') {
        this.c_account_name_disable = true
        this.c_account_type = ''
        this.c_account_name = ''
        this.get_account_info()
      } else if (new_type !== old_type) {
        this.c_account_name = ''
      }
    }
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
            }, i * 10)
          }
        })
    },
    get_member_info() {
      this.a_adv_info_visible = true
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
      getaccountforadmin(getToken()
        , this.profile_edit_form.id
        , this.c_account_type
        , this.c_account_name)
        .then((res) => {
          this.c_account_data = res.data
        })
      getaccountforadmin(getToken()
        , this.profile_edit_form.id
        , this.c_account_type)
        .then((res) => {
          this.c_account_name_options = res.data
        })
      getaccounttype(getToken())
        .then((res) => {
          this.c_account_type_options = res.data
        })
    },

    c_account_add_view() {
      this.c_account_add_visible = true
    },

    get_card_info() {
      this.c_user_card = []
      if (this.card_id === '') {
        getcardforadmin(getToken(), this.profile_edit_form.id).then((res) => {
          this.c_cardlistoptions = res.data
          this.c_user_card = res.data
        })
      } else {
        getcardforadmin(getToken(), this.profile_edit_form.id, this.card_id).then((res) => {
          this.c_user_card = res.data
        })
      }
      this.a_adv_card_visible = true
    },
    handle_card_edit(index, row) {
      this.c_card_confi_visible = true
      this.c_card_edit.id = row.id
    },
    get_category_info() {
      // not done
      this.a_adv_category_visible = true
    },
    get_project_info() {
      // not done
      this.a_adv_project_visible = true
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
          patchcard_del(getToken(), this.c_card_edit.id, this.globaltime).then(() => {
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
          this.c_card_confi_visible = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消刪除'
          })
          this.c_card_confi_visible = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刪除'
        })
        this.c_card_confi_visible = false
      })
    },
    c_card_confirm() {
      patchcard_modify(getToken(), this.c_card_edit.id, this.c_card_edit.name, this.c_card_edit.number, this.globaltime)
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
      this.c_card_confi_visible = false
    },
    in_adv_motion_cal() {
      // 3層以上的功能
      // btn-cal in add confi del finc view
      this.c_card_confi_visible = false
      this.c_account_add_visible = false
      this.$message({
        type: 'info',
        message: '已取消動作'
      })
    },
    in_adv_cal() {
      // 所有3層取消打在這  會回到2層
      // 3層的回各項操作(2層) btn方法請都用這個
      this.a_adv_info_visible = false
      this.a_adv_card_visible = false
      this.a_adv_account_visible = false
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
</style>
