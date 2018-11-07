<template>
  <div class="b_personal_container">
    <title>
      {{ $t('route.b_profile_view') }}
    </title>
    <div class="card_info">
      <el-card body-style="padding:3.125rem">
        <el-form :model="infoform" label-position="left" inline class="personal_view">
          <el-form-item :label="$t('b_profile_view.email')">
            <el-input v-model="infoform.bmail" type="textarea" autosize readonly />
          </el-form-item>
          <el-form-item :label="$t('b_profile_view.name')" class="label2">
            <el-input v-model="infoform.bname" type="text" readonly />
          </el-form-item>
          <el-form-item :label="$t('b_profile_view.princiapl')" class="label3">
            <el-input v-model="infoform.bprincipal" type="text" readonly />
          </el-form-item>
          <el-form-item :label="$t('b_profile_view.taxID')" class="label4">
            <el-input v-model="infoform.btaxID" type="text" readonly />
          </el-form-item>
          <el-form-item :label="$t('b_profile_view.telephone')" class="label5">
            <el-input v-model="infoform.btelephone" type="text" readonly />
          </el-form-item>
          <el-form-item :label="$t('b_profile_view.cellphone')" class="label6">
            <el-input v-model="infoform.bcellphone" type="text" readonly />
          </el-form-item>
          <el-form-item :label="$t('b_profile_view.extension')" class="label7">
            <el-input v-model="infoform.bextension" type="text" readonly />
          </el-form-item>
          <el-form-item :label="$t('b_profile_view.address')" class="label8">
            <el-input v-model="infoform.baddress" type="text" readonly />
          </el-form-item>

          <el-button :loading="loadingb_profile_edit" type="primary" class="btn" @click.native.prevent="gob_profile_edit">
            {{ $t('a_profile_view.alter') }}
          </el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/login'
import { getToken } from '@/utils/auth'
export default {
  name: 'BusinessProfileView',
  data() {
    return {
      labelPosition: 'right',
      loadingb_profile_edit: false,
      infoform: {
        bmail: '',
        bname: '',
        bprincipal: '',
        btaxID: '',
        btelephone: '',
        bcellphone: '',
        bextension: '',
        baddress: ''
      }
    }
  },
  created() {
    this.getinfo()
  },
  methods: {
    getinfo() {
      getUserInfo(getToken()).then(response => {
        const info = response.data
        this.infoform.useraccount = info.bemail
        this.infoform.username = info.bname
        this.infoform.usertoid = info.bprincipal
        this.infoform.useraccount = info.btaxID
        this.infoform.username = info.btelephone
        this.infoform.usertoid = info.bcellphone
        this.infoform.username = info.bextension
        this.infoform.usertoid = info.baddress
      })
    },
    gob_profile_edit() {
      this.loadingprofile_edit = true
      setTimeout(() => {
        setTimeout(() => {
          this.loadingprofile_edit = false
          this.$router.push({ path: this.redirect || '/profile/b_profile_edit' })
        }, 300)
      }, 150)
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" >
.card_info {
  width: 80%;
  margin: 15vh 10vw;
}

.btn {
  float: right;
  margin-bottom: 1.875rem;
}

.personal_view {
  font-size: 0;
}
.personal_view label {
  width: 90px;
  color: #99a9bf;
  font-size: 1.2vw;
}
.personal_view input {
  font-family: "Microsoft JhengHei";
  border: 0;
  width: 130%;
}
.personal_view textarea {
  font-family: "Microsoft JhengHei";
  border: 0;
  width: 130%;
  padding-top: 1.25rem;
}
.personal_view .el-form-item {
  width: 100%;
}
</style>
