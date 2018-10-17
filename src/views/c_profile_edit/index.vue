<template>
  <div class="personal_edit_container">
    <title>
      {{ $t('route.profile_edit') }}
    </title>
    <el-card class="box-card">
      <el-row>
        <el-col :span="9">
          <div class="personal_edit_form">
            <el-form :label-position="labelPosition" :model="formLabelAlign" label-width="9vw">
              <el-form-item label="Email："><span>a4214679@xxx.com</span></el-form-item>

              <el-form-item label="姓名：">
                <el-input v-model="formLabelAlign.name" class="personal_ipt" />
              </el-form-item>
              <el-form-item label="ToID：">
                <el-input v-model="formLabelAlign.id" class="personal_ipt" placeholder="請輸入8位數字" />
              </el-form-item>
              <el-form-item label="新密碼：">
                <el-input v-model="formLabelAlign.region" class="personal_ipt" type="password" placeholder="如不修改，空白即可" />
              </el-form-item>
              <el-form-item label="再次輸入：">
                <el-input v-model="formLabelAlign.type" type="password" class="personal_ipt" placeholder="如不修改，空白即可" />
              </el-form-item>

            </el-form>
          </div>
        </el-col>
        <el-col :span="15">
          <div class="personal_edit_upload">
            <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </div>
          <div class="personal_edit_chk">
            <el-button type="primary ">
              確認
            </el-button>
            <el-button class="personal_edit_cal">
              <router-link to="/profile/profile-view">取消</router-link>
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
  width: 28vw;
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
.personal_edit_form {
  padding-top: 10vh;
}
.personal_edit_form label {
  font-size: 1vw !important;
}

.personal_edit_upload {
  padding-top: 10vh;
  padding-left: 9vw;
}
.personal_edit_chk {
  padding-top: 8vh;
  padding-left: 61%;
}
</style>
