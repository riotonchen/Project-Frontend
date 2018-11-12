<template>
  <div class="app-container">

    <title>
      {{ $t('route.a_user') }}
    </title>
    <div class="filter_container" />

    <div class="memberinfo_table">
      <el-table :data="a_all_member_data" stripe style="width: 100%;" max-height="550" fit>
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
      <el-dialog :visible.sync="a_adv_account_visible" width="80%" title="會員帳戶管理" />
    </div>

    <div class="card_dialog">
      <el-dialog :visible.sync="a_adv_card_visible" width="80%" title="會員卡片管理" />
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
import { getmember, getmemberlist } from '@/api/member/getmember'
import { getToken } from '@/utils/auth'
// import { formatdate, formatdate_inc_time } from '@/utils/index'

export default {

  name: 'AManageMember',
  /*
  directives: {
    waves
  },
  */
  data() {
    return {
      profile_edit_form: {
        id: '',
        account: '',
        name: '',
        toid: '',
        pswd: '',
        pswd2: ''
      },
      a_all_member_data: [],
      a_member_adv_visible: false,
      a_adv_info_visible: false,
      a_adv_accountung_visible: false,
      a_adv_account_visible: false,
      a_adv_card_visible: false,
      a_adv_category_visible: false,
      a_adv_project_visible: false
    }
  },
  watch: {
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
            getmemberlist(getToken(), i)
              .then((res_data) => {
                /*
                if (res_data.data.membertype === 5) {
                  return
                } else {
                  this.a_all_member_data.push(res_data.data)
                }
                */
                ori_data.push(res_data.data)
                this.a_all_member_data = ori_data.filter(function(item, index, array) {
                  return item.membertype !== 5
                })
              })
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
    },
    get_card_info() {
      // not done
      this.a_adv_card_visible = true
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
    in_adv_cal() {
      // 所有3層取消打在這  會回到2層
      // 3層的回各項操作(2層) btn方法請都用這個
      this.a_adv_info_visible = false
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
</style>
