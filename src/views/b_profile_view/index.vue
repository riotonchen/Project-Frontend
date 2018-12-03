<template>
  <div class="app-container">
    <title>
      {{ $t('route.b_profile_view') }}
    </title>

    <div class="b_profile_info">
      <el-card body-style="padding:3.125rem">
        <el-form
          :model="infoform"
          label-position="left"
          inline
          class="personal_view"
        >
          <el-form-item :label="$t('b_profile_view.email')">
            <el-input
              v-model="infoform.bmail"
              type="textarea"
              autosize
              readonly
            />
          </el-form-item>
          <el-form-item
            :label="$t('b_profile_view.name')"
            class="label2"
          >
            <el-input
              v-model="infoform.bname"
              type="text"
              readonly
            />
          </el-form-item>
          <el-form-item
            :label="$t('b_profile_view.princiapl')"
            class="label3"
          >
            <el-input
              v-model="infoform.bmanager"
              type="text"
              readonly
            />
          </el-form-item>
          <el-form-item
            :label="$t('b_profile_view.taxID')"
            class="label4"
          >
            <el-input
              v-model="infoform.btaxID"
              type="text"
              readonly
            />
          </el-form-item>
          <el-form-item
            :label="$t('b_profile_view.telephone')"
            class="label5"
          >
            <el-input
              v-model="infoform.btelephone"
              type="text"
              readonly
            />
          </el-form-item>
          <el-form-item
            :label="$t('b_profile_view.cellphone')"
            class="label6"
          >
            <el-input
              v-model="infoform.bcellphone"
              type="text"
              readonly
            />
          </el-form-item>
          <el-form-item
            :label="$t('b_profile_view.extension')"
            class="label7"
          >
            <el-input
              v-model="infoform.bextension"
              type="text"
              readonly
            />
          </el-form-item>
          <el-form-item
            :label="$t('b_profile_view.address')"
            class="label8"
          >
            <el-input
              v-model="infoform.baddress"
              type="text"
              readonly
            />
          </el-form-item>

          <el-button
            :loading="loadingb_profile_edit"
            type="primary"
            class="btn2"
            @click.native.prevent="gob_profile_edit"
          >
            {{ $t('a_profile_view.alter') }}
          </el-button>
          <el-button
            type="primary"
            class="btn"
            @click.native.prevent="go_current_picture()"
          >
            目前大頭貼
          </el-button>
        </el-form>
      </el-card>

    </div>

    <div class="dialog_container">
      <el-dialog
        :visible.sync="current_picture_dialog"
        title="當前大頭貼"
        width="30vw"
      >
        <div style="padding-left:3.5vw;">
          <img
            :src="userinfo_picture"
            class="userpicture"
          >
        </div>

      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/login';
import { getentprofile } from '@/api/ent-profile/getentprofile';
import { getToken } from '@/utils/auth';
import store from '@/store';

export default {
  name: 'BusinessProfileView',
  data() {
    return {
      labelPosition: 'right',
      loadingb_profile_edit: false,
      infoform: {
        bmail: '',
        bname: '',
        bmanager: '',
        btaxID: '',
        btelephone: '',
        bcellphone: '',
        bextension: '',
        baddress: ''
      },
      current_picture_dialog: false,
      userinfo_picture: ''
    }
  },
  created() {
    this.getinfo()
  },
  methods: {
    getinfo() {
      getUserInfo(getToken()).then(res => {
        getentprofile(getToken(), res.data.account).then(res_info => {
          console.log(res_info.data)
          this.infoform.bmail = res_info.data[0].email
          this.infoform.bname = res_info.data[0].name
          this.infoform.bmanager = res_info.data[0].manager
          this.infoform.btaxID = res_info.data[0].uni_num
          this.infoform.btelephone = res_info.data[0].mobile_num
          this.infoform.bcellphone = res_info.data[0].phone_num
          this.infoform.bextension = res_info.data[0].extension
          this.infoform.baddress = res_info.data[0].address
        })
      })
    },
    gob_profile_edit() {
      this.loadingprofile_edit = true
      setTimeout(() => {
        setTimeout(() => {
          this.loadingprofile_edit = false
          this.$router.push({
            path: this.redirect || '/profile/ent-profile-edit'
          })
        }, 300)
      }, 150)
    },
    go_current_picture() {
      this.current_picture_dialog = true
      this.userinfo_picture = store.getters.dbpicture
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
.b_profile_info {
  width: 80%;
  margin: 6vh 10vw;
}

.btn {
  float: right;
  margin-bottom: 1.875rem;
  margin-right: 1.25rem;
}
.btn2 {
  float: right;
  margin-bottom: 1.875rem;
}

.personal_view {
  font-size: 0;
}
.personal_view label {
  width: 90px;
  color: #99a9bf;
  font-size: 1vw;
}
.personal_view input {
  font-family: "Microsoft JhengHei";
  border: 0;
  width: 100vw;
}
.personal_view textarea {
  font-family: "Microsoft JhengHei";
  border: 0;
  width: 100vw;
}
.personal_view .el-form-item {
  margin-right: 0;
  width: 50%;
}
.userpicture {
  height: 20vw;
  width: 20vw;
  border-radius: 20px;
}
</style>
