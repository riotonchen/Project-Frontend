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
        </el-form>
      </div>

      <div class="personal_btn">
        <el-button type="primary ">
          <router-link to="/profile/profile-edit">修改</router-link>
        </el-button>
      </div>

      <div class="personal_upload">
        <el-upload :show-file-list="true" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>

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
      imageUrl: '',
      labelPosition: 'right',
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上傳頭像圖片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上傳頭像圖片大小不能超過 2MB!')
      }
      return isJPG && isLt2M
    },
    getinfo() {
      getUserInfo(getToken()).then(response => {
        const info = response.data
        console.log(info)
        this.infoform.useraccount = info.account
        this.infoform.username = info.name
        this.infoform.usertoid = info.toid
      })
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" >
.personal_upload {
  position: absolute;
  margin-left: 40vw;
  margin-top: 5vh;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 30vw;
  height: 45vh;
  line-height: 45vh;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.box-card {
  width: 80%;
  height: 82vh;
  margin: 2% auto;
  position: relative;
}

.personal_btn {
  position: absolute;
  margin-top: 68vh;
  margin-left: 5vw;
}
.personal_btn a {
  font-family: "Microsoft JhengHei";
}

.userinfo {
  padding-top: 5vh;
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

