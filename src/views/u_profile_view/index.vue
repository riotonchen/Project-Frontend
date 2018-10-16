<template>
  <div class="personal_container">
    <title>
      {{ $t('route.profile_view') }}
    </title>
    <el-card class="box-card">
      <el-row>
        <el-col :span="12">
          <div class="personal_form">
            <el-row>
              <el-col :span="4">
                <p>Email：</p>
              </el-col>
              <el-col :span="12">
                <p>a4214679@pccu.edu.tw</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <p>姓名：</p>
              </el-col>
              <el-col :span="12">
                <p>Rioton</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <p>ToID：</p>
              </el-col>
              <el-col :span="12">
                <p>74123985</p>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="personal_upload">
            <el-upload :show-file-list="true" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </div>

          <div class="personal_btn">
            <el-button type="primary ">
              <router-link to="/profile/profile-edit">修改</router-link>
            </el-button>
          </div>
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: '',
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    }
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
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" >
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
}

.personal_btn {
  padding-left: 76%;
  padding-top: 12vh;
}

.personal_form {
  font-size: 1vw;
  padding-top: 6vh;
  padding-left: 5vw;
}

.personal_upload {
  padding-top: 8vh;
  padding-left: 1vw;
}
</style>
