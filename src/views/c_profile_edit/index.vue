<template>
  <div class="personal_edit_container">
    <title>
      {{ $t('route.profile_edit') }}
    </title>
    <el-card class="box-card">
      <el-row>
        <el-col :span="9">
          <div class="personal_edit_form">
            <el-form ref="profile_edit_form" :model="profile_edit_form" :rules="profile_edit_form_rules">
              <el-form-item label="Email：">
                <el-input v-model="profile_edit_form.account" type="text" class="useraccountin" readonly />
              </el-form-item>
              <el-form-item label="姓名：" prop="name">
                <el-input v-model="profile_edit_form.name" placeholder="上限25個中英數字" name="name" />
              </el-form-item>
              <el-form-item label="ToID：" prop="toid">
                <el-input v-model="profile_edit_form.toid" placeholder="ToID 只限定於 8 碼" name="toid" />
              </el-form-item>
              <el-form-item label="新密碼：" prop="pswd">
                <el-input v-model="profile_edit_form.pswd" type="password" placeholder="如不修改，空白即可" name="pswd" />
              </el-form-item>
              <el-form-item label="密碼再次輸入：" prop="pswd2">
                <el-input v-model="profile_edit_form.pswd2" type="password" placeholder="如不修改，空白即可" name="pswd2" />
              </el-form-item>

            </el-form>
          </div>
        </el-col>
        <el-col :span="15">

          <div class="personal_upload">
            <el-upload :show-file-list="true" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </div>

          <div class="personal_edit_chk">
            <el-button :loading="loadingprofile_view_send" type="primary " @click.native.prevent="handleprofile_edit">
              確認
            </el-button>
            <el-button :loading="loadingprofile_view_cancal" type="info" class="personal_edit_cal" @click.native.prevent="goprofile_view">
              取消
            </el-button>
          </div>
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/login'
import { getToken } from '@/utils/auth'
import { validatetoid } from '@/utils/validate'
import { patchprofile, patchprofilepswd } from '@/api/profile/patchprofile'

export default {
  data() {
    const _validatetoid = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (!validatetoid(value)) {
        callback(new Error('ToID 只能有大小寫英數'))
      } else if (value.length !== 8) {
        callback(new Error('ToID 只限定於 8 碼'))
      } else {
        callback()
      }
    }
    const validatename = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value.length > 25) {
        callback(new Error('姓名不可以大於 25 個字'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value.length < 8) {
        callback(new Error('密碼不可以小於 8 碼'))
      } else {
        callback()
      }
    }
    const validatedoublepswd = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value !== this.profile_edit_form.pswd) {
        callback(new Error('二次密碼不一樣，請再次輸入！'))
      } else if (value === '' && this.profile_edit_form.pswd !== '') {
        callback(new Error('請輸入，不可空白'))
      } else {
        callback()
      }
    }
    return {
      imageUrl: '',
      labelPosition: 'right',
      loadingprofile_view_cancal: false,
      loadingprofile_view_send: false,
      profile_edit_form: {
        account: '',
        name: '',
        toid: '',
        pswd: '',
        pswd2: ''
      },
      profile_edit_form_rules: {
        name: [{ required: false, trigger: 'blur', validator: validatename }],
        toid: [{ required: false, trigger: 'blur', validator: _validatetoid }],
        pswd: [{ required: false, trigger: 'blur', validator: validatePassword }],
        pswd2: [{ required: false, validator: validatedoublepswd }]
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
        this.profile_edit_form.account = info.account
      })
    },
    goprofile_view() {
      this.loadingprofile_view_cancal = true
      setTimeout(() => {
        setTimeout(() => {
          this.loadingprofile_view_cancal = false
          this.$router.push({ path: this.redirect || '/profile/profile-view' })
        }, 300)
      }, 150)
    },
    handleprofile_edit() {
      this.$refs.profile_edit_form.validate(valid => {
        if (valid) {
          this.loadingprofile_view_send = true
          getUserInfo(getToken()).then(response => {
            var ori_name = response.name
            var ori_toid = response.toid
            var send_name = ''
            var send_toid = ''
            var send_pswd = ''
            if (this.profile_edit_form.name === '') {
              send_name = ori_name
            } else {
              send_name = this.profile_edit_form.name
            }
            if (this.profile_edit_form.toid === '') {
              send_toid = ori_toid
            } else {
              send_toid = this.profile_edit_form.toid
            }
            if (this.profile_edit_form.name !== '') {
              send_pswd = this.profile_edit_form.pswd
              patchprofilepswd(getToken(), send_pswd)
            }
            patchprofile(getToken(), send_name, send_toid)
            const h = this.$createElement
            this.$notify({
              title: '送出成功',
              message: h('b', { style: 'color: teal' }, '你的個人資料已更新')
            })
            this.loadingsend = false
            this.$router.push({ path: this.redirect || '/profile/profile-view' })
          })
        } else if (!valid) {
          console.log('error submit!!')
          return false
        } else {
          console.log('error submit!!')
          const h = this.$createElement
          this.$notify({
            title: '送出失敗',
            message: h('b', { style: 'color: teal' }, '發生了一點錯誤，請在試一次，如果一直發生請與我們聯繫，造成您的不良體驗，實在非常抱歉！')
          })
          this.loadingprofile_view_send = true
          setTimeout(() => {
            setTimeout(() => {
              this.loadingprofile_view_send = false
            }, 300)
          }, 800)
        }
      })
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" >
.personal_upload {
  position: absolute;
  margin-left: 40vw;
  margin-top: 10vh;
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
.personal_edit_form {
  padding-top: 5vh;
  width: 30vw;
  position: absolute;
}
.personal_edit_form label {
  font-size: 1vw !important;
}

.personal_edit_chk {
  padding-top: 68vh;
  position: absolute;
}
.useraccountin input {
  border: 0;
  font-family: "Microsoft JhengHei";
}
</style>
