<template>
  <div class="app-container">
    <title>
      {{ $t('route.a_manage_business') }}
    </title>
    <div class="filter_container">
      <el-input v-model="a_select_account" placeholder="account" style="width: 25vw;max-width:7.5rem;min-width:5.5rem;" />
      <el-input v-model="a_select_name" placeholder="name" style="width: 25vw;max-width:7.5rem;min-width:5.5rem;" />
      <el-input v-model="a_select_id" placeholder="toid" style="width: 25vw;max-width:7.5rem;min-width:5.5rem;" />
    </div>

    <div class="memberinfo_table">
      <el-table :data="a_all_ent_data" stripe style="width: 100%;" max-height="650" fit>
        <el-table-column type="index" align="center" />
        <el-table-column label="商家帳號">
          <template slot-scope="scope" prop="account" align="center">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商家名稱">
          <template slot-scope="scope" prop="name" align="center">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商家編號">
          <template slot-scope="scope" prop="id" align="center">
            <span>{{ scope.row.id }}</span>
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
      <el-dialog :visible.sync="a_ent_adv_visible" title="商家會員各項操作" width="90%">
        <el-row>
          <el-col :span="12">
            <el-button type="primary" class="adv_in_btn" plain @click="get_ent_info()">詳細資料</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" class="adv_in_btn" plain @click="get_accounting_info()">歷史活動</el-button>
          </el-col>
        </el-row>
        <el-row>
          <!--
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
        -->
          <el-row>
            <el-col :span="24">
              <el-button type="info" class="adv_calbtn" @click="adv_cal()">回管理頁</el-button>
            </el-col>
          </el-row>
        </el-row>
      </el-dialog>
    </div>
    <div class="editinfo_dialog">
      <el-dialog :visible.sync="c_ent_confiinfo_visible" title="詳細會員資訊" width="80%">
        <transition name="el-fade-in-linear">
          <div v-show="ent_info_view" class="ent_info_view">
            <el-row>
              <el-col :span="24">
                <el-form ref="profile_edit_form" :model="profile_edit_form" label-position="left" inline class="ent_view">
                  <el-form-item label="商家帳號">
                    <el-input v-model="profile_edit_form.account" type="text" readonly />
                  </el-form-item>
                  <el-form-item :label="$t('a_manage_business_view.princiapl')">
                    <el-input v-model="profile_edit_form.manager" type="text" readonly />
                  </el-form-item>
                  <el-form-item :label="$t('a_manage_business_view.name')">
                    <el-input v-model="profile_edit_form.name" type="text" readonly />
                  </el-form-item>
                  <el-form-item :label="$t('a_manage_business_view.taxID')">
                    <el-input v-model="profile_edit_form.uni_num" type="text" readonly />
                  </el-form-item>
                  <el-form-item :label="$t('a_manage_business_view.telephone')">
                    <el-input v-model="profile_edit_form.mobile_num" type="text" readonly />
                  </el-form-item>
                  <el-form-item :label="$t('a_manage_business_view.cellphone')">
                    <el-input v-model="profile_edit_form.phone_num" type="text" readonly />
                  </el-form-item>
                  <el-form-item :label="$t('a_manage_business_view.extension')">
                    <el-input v-model="profile_edit_form.extension" type="text" readonly />
                  </el-form-item>
                  <el-form-item :label="$t('a_manage_business_view.address')">
                    <el-input v-model="profile_edit_form.address" type="text" readonly />
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-button type="primary" class="info_btns" @click.native.prevent="changetoinfoconfi()">修改</el-button>
                <el-button type="info" class="info_btns" @click.native.prevent="in_adv_motion_cal()">回管理頁</el-button>
              </el-col>
            </el-row>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-show="ent_info_confi" class="ent_info_confi">
            <el-row>
              <el-col :span="24">
                <el-form ref="profile_edit_form" :model="profile_edit_form" label-position="left" inline class="ent_edit">
                  <el-form-item label="商家帳號">
                    <el-input v-model="profile_edit_form.account" type="text" readonly class="account" />
                  </el-form-item>
                  <el-form-item :label="$t('a_manage_business_view.princiapl')">
                    <el-input v-model="profile_edit_form.manager" :placeholder="profile_edit_form_manage_p" clearable type="text" />
                  </el-form-item>
                  <el-form-item :label="$t('a_manage_business_view.name')">
                    <el-input v-model="profile_edit_form.name" :placeholder="profile_edit_form_name_p" clearable type="text" />
                  </el-form-item>
                  <el-form-item :label="$t('a_manage_business_view.taxID')">
                    <el-input v-model="profile_edit_form.uni_num" :placeholder="profile_edit_form_uni_num_p" clearable type="text" />
                  </el-form-item>
                  <el-form-item :label="$t('a_manage_business_view.telephone')">
                    <el-input v-model="profile_edit_form.mobile_num" :placeholder="profile_edit_form_mobile_num_p" clearable type="text" />
                  </el-form-item>
                  <el-form-item :label="$t('a_manage_business_view.cellphone')">
                    <el-input v-model="profile_edit_form.phone_num" :placeholder="profile_edit_form_phone_num_p" clearable type="text" />
                  </el-form-item>
                  <el-form-item :label="$t('a_manage_business_view.extension')">
                    <el-input v-model="profile_edit_form.extension" :placeholder="profile_edit_form_extension_p" clearable type="text" />
                  </el-form-item>
                  <el-form-item :label="$t('a_manage_business_view.address')">
                    <el-input v-model="profile_edit_form.address" :placeholder="profile_edit_form_address_p" clearable type="text" />
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-button type="primary" class="info_btns" @click.native.prevent="cofigure_ent_info()">確認</el-button>
                <el-button type="info" class="info_btns" @click.native.prevent="changetoinfoview()">{{ $t('c_profile_edit.cancel') }}</el-button>
              </el-col>
            </el-row>
          </div>
        </transition>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波紋指令
import { getToken } from '@/utils/auth'
import { getmember, getmemberlist } from '@/api/member/getmember'
import { getentprofile } from '@/api/ent-profile/getentprofile'
import { patchentprofile } from '@/api/ent-profile/patchentprofile'
export default {
  name: 'BManageBusiness',
  directives: {
    waves
  },
  data() {
    /*
    const validatename = (rule, value, callback) => {
      if (value.length > 10) {
        callback(new Error('優惠名稱不可以大於 10 個字'))
      } else {
        callback()
      }
    }
    const validatecontent = (rule, value, callback) => {
      if (value.length > 140) {
        callback(new Error('優惠內容不可以大於 140 個字'))
      } else {
        callback()
      }
    }
    */
    return {
      a_select_account: '',
      a_select_name: '',
      a_select_id: '',

      a_all_ent_data: [],
      a_ent_adv_visible: false,
      c_ent_confiinfo_visible: false,
      profile_edit_form: {
        id: '',
        account: '',
        name: '',
        manager: '',
        uni_num: '',
        address: '',
        mobile_num: '',
        phone_num: '',
        extension: ''
      },
      profile_edit_form_manage_p: '',
      profile_edit_form_name_p: '',
      profile_edit_form_uni_num_p: '',
      profile_edit_form_mobile_num_p: '',
      profile_edit_form_phone_num_p: '',
      profile_edit_form_extension_p: '',
      profile_edit_form_address_p: '',
      ent_info_view: true,
      ent_info_confi: false
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
            getmemberlist(getToken(), i)
              .then((res_data) => {
                setTimeout(() => {
                  ori_data.push(res_data.data)
                  this.a_all_ent_data = ori_data.filter(function(item, index, array) {
                    return item.membertype === 5
                  })
                }, i * 10)
              })
          }
        })
    },
    handle_advance(index, row) {
      this.a_ent_adv_visible = true
      this.profile_edit_form.account = row.account
    },
    adv_cal() {
      this.a_ent_adv_visible = false
    },
    in_adv_motion_cal() {
      this.c_ent_confiinfo_visible = false
      this.$message({
        type: 'info',
        message: '已取消動作'
      })
    },
    changetoinfoconfi() {
      this.ent_info_view = false
      setTimeout(() => {
        this.ent_info_confi = true
      }, 200)
    },
    changetoinfoview() {
      setTimeout(() => {
        this.ent_info_view = true
      }, 200)
      this.ent_info_confi = false
    },
    get_ent_info() {
      this.c_ent_confiinfo_visible = true
      getentprofile(getToken(), this.profile_edit_form.account)
        .then((res) => {
          this.profile_edit_form.name = ''
          this.profile_edit_form.manager = ''
          this.profile_edit_form.uni_num = ''
          this.profile_edit_form.mobile_num = ''
          this.profile_edit_form.phone_num = ''
          this.profile_edit_form.extension = ''
          this.profile_edit_form.address = ''
          this.profile_edit_form.id = res.data[0].store_id
          this.profile_edit_form.name = res.data[0].name
          this.profile_edit_form.manager = res.data[0].manager
          this.profile_edit_form.uni_num = res.data[0].uni_num
          this.profile_edit_form.mobile_num = res.data[0].mobile_num
          this.profile_edit_form.phone_num = res.data[0].phone_num
          this.profile_edit_form.extension = res.data[0].extension
          this.profile_edit_form.address = res.data[0].address
          this.profile_edit_form_manage_p = res.data[0].manager
          this.profile_edit_form_name_p = res.data[0].name
          this.profile_edit_form_uni_num_p = res.data[0].uni_num
          this.profile_edit_form_mobile_num_p = res.data[0].mobile_num
          this.profile_edit_form_phone_num_p = res.data[0].phone_num
          this.profile_edit_form_extension_p = res.data[0].extension
          this.profile_edit_form_address_p = res.data[0].address
        })
    },
    cofigure_ent_info() {
      patchentprofile(getToken()
        , this.profile_edit_form.id
        , this.profile_edit_form.name
        , this.profile_edit_form.manager
        , this.profile_edit_form.uni_num
        , this.profile_edit_form.mobile_num
        , this.profile_edit_form.phone_num
        , this.profile_edit_form.extension
        , this.profile_edit_form.address)
        .then(() => {
          this.$message({
            type: 'success',
            message: '該商家用戶相關資料更新成功'
          })
          this.c_ent_confiinfo_visible = false
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: '目前遇到了一些問題，請稍後再更新一次'
          })
          this.c_ent_confiinfo_visible = false
        })
    }
  }
}
</script>
<style lang="scss">
.adv_calbtn {
  float: right;
  margin-top: 5vh;
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
.ent_view {
  font-size: 0;
  padding-left: 9vw;
}
.ent_view label {
  width: 110px;
  color: #99a9bf;
}
.ent_view input {
  border: 0;
}
.ent_view .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 50%;
}
.ent_edit {
  font-size: 0;
  padding-left: 9vw;
}
.ent_edit label {
  width: 110px;
  color: #99a9bf;
}
.ent_edit .account input {
  border: 0;
}
.ent_edit .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 50%;
}
.info_btns {
  float: right;
  margin-right: 1vw;
}
</style>

