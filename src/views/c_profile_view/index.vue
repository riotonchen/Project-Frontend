<template>
  <div class="personal_container">
    <title>
      {{ $t('route.c_profile_view') }}
    </title>
    <div class="box-card">
      <div class="userinfo">
        <el-form :model="infoform" label-position="left" inline class="personal_view">
          <el-form-item :label="$t('c_profile_view.email')">
            <el-input v-model="infoform.useraccount" type="text" readonly />
          </el-form-item>
          <el-form-item :label="$t('c_profile_view.name')" class="label2">
            <el-input v-model="infoform.username" type="text" readonly />
          </el-form-item>
          <el-form-item label="ToID" class="label3">
            <el-input v-model="infoform.usertoid" type="text" readonly />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item>
            <span />
          </el-form-item>
          <el-form-item>
            <el-button :loading="loadingprofile_edit" type="primary" @click.native.prevent="goprofile_edit">
              {{ $t('c_profile_view.alter') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/login'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      labelPosition: 'right',
      loadingprofile_edit: false,
      infoform: {
        useraccount: '',
        username: '',
        usertoid: ''
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
        this.infoform.useraccount = info.account
        this.infoform.username = info.name
        this.infoform.usertoid = info.toid
      })
    },
    goprofile_edit() {
      this.loadingprofile_edit = true
      setTimeout(() => {
        setTimeout(() => {
          this.loadingprofile_edit = false
          this.$router.push({ path: this.redirect || '/profile/profile-edit' })
        }, 300)
      }, 150)
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" >
.box-card {
  width: 85%;
  height: 82vh;
  margin: 5vh 3vw;
}

.personal_view {
  font-size: 0;
}
.personal_view label {
  width: 100px;
  color: #99a9bf;
}
.personal_view input {
  font-family: "Microsoft JhengHei";
  border: 0;
}
.personal_view .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 100%;
}
</style>

