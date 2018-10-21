<template>
  <div class="personal_container">
    <title>
      {{ $t('route.profile_view') }}
    </title>
    <el-card class="box-card">
      <div class="userinfo">
        <el-form :model="infoform">
          <el-form-item label="Email" class="label1">
            <el-input v-model="infoform.useraccount" type="text" class="useraccountin" readonly />
          </el-form-item>
          <el-form-item label="Name" class="label2">
            <el-input v-model="infoform.username" type="text" class="username" readonly />
          </el-form-item>
          <el-form-item label="ToID" class="label3">
            <el-input v-model="infoform.usertoid" type="text" class="userntoid" readonly />
          </el-form-item>
          <el-form-item>
            <el-button :loading="loadingprofile_edit" type="primary" style="width:20%;margin-top:20vh;margin-left:0px" @click.native.prevent="goprofile_edit">
              修改
            </el-button>
          </el-form-item>
        </el-form>
      </div>

    </el-card>
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
  width: 80%;
  height: 82vh;
  margin: 2% auto;
  position: relative;
}

.personal_btn a {
  font-family: "Microsoft JhengHei";
}

.userinfo {
  padding-top: 3vh;
  padding-left: 5vw;
  position: absolute;
}
.useraccountin {
  padding-left: 2vw;
}
.username {
  padding-left: 2vw;
}
.userntoid {
  padding-left: 2vw;
}
.useraccountin input {
  border: 0;
  font-size: 1vw;
  width: 30vw;
  padding-top: 1vh;
  font-family: "Microsoft JhengHei";
}
.username input {
  border: 0;
  font-size: 1vw;
  width: 30vw;
  padding-top: 1vh;
  font-family: "Microsoft JhengHei";
}
.userntoid input {
  border: 0;
  font-size: 1vw;
  width: 30vw;
  padding-top: 1vh;
  font-family: "Microsoft JhengHei";
}
.label1 label {
  font-size: 1.5vw;
}
.label2 label {
  font-size: 1.5vw;
}
.label3 label {
  font-size: 1.5vw;
}
</style>

