<template>
  <div class="personal_edit_container">
    <title>
      {{ $t('route.c_profile_edit') }}
    </title>
    <div class="personal_edit_form">
      <!--個人資料修改-->
      <el-card>
        <el-form
          ref="profile_edit_form"
          :model="profile_edit_form"
          :rules="profile_edit_form_rules"
          label-position="left"
          inline
          class="personal_edit"
        >
          <el-form-item :label="$t('c_profile_edit.email')">
            <el-input
              v-model="profile_edit_form.account"
              type="textarea"
              resize="none"
              autosize
              readonly
            />
          </el-form-item>
          <el-form-item
            :label="$t('c_profile_edit.name')"
            prop="name"
          >
            <el-input
              v-model="profile_edit_form.name"
              :placeholder="$t('c_profile_edit.h1')"
              name="name"
              @focus="clean_name()"
            />
          </el-form-item>
          <el-form-item
            label="ToID"
            prop="toid"
          >
            <el-input
              v-model="profile_edit_form.toid"
              :placeholder="$t('c_profile_edit.h2')"
              name="toid"
              @focus="clean_toid()"
            />
          </el-form-item>
          <el-form-item
            :label="$t('c_profile_edit.newpswd')"
            prop="pswd"
          >
            <el-input
              v-model="profile_edit_form.pswd"
              :placeholder="$t('c_profile_edit.h3')"
              type="password"
              name="pswd"
            />
          </el-form-item>
          <el-form-item
            :label="$t('c_profile_edit.input')"
            prop="pswd2"
          >
            <el-input
              v-model="profile_edit_form.pswd2"
              :placeholder="$t('c_profile_edit.h3')"
              type="password"
              name="pswd2"
            />
          </el-form-item>
          <!--
          <el-form-item prop="picture">
            <el-upload
              ref="upload"
              :auto-upload="false"
              :before-upload="bfupload"
              :multiple="false"
              list-type="picture-card"
              limit="1"
            >
              <i class="el-icon-plus" />
            </el-upload>
          </el-form-item>
          -->
          <el-button
            :loading="loadingprofile_view_send"
            type="primary"
            class="btn2"
            @click.native.prevent="handleprofile_edit"
          >{{ $t('c_profile_edit.confirm') }}</el-button>
          <el-button
            :loading="loadingprofile_view_cancal"
            type="info"
            class="btn"
            @click.native.prevent="goprofile_view"
          >{{ $t('c_profile_edit.cancel') }}</el-button>

        </el-form>
        <div class="upload">
          <el-upload
            ref="upload"
            :on-change="changeUpload"
            :auto-upload="false"
            :file-list="fileList"
            :class="{disabled:uploadDisabled}"
            accept="image/jpeg,image/png,image/gif"
            action=""
            list-type="picture-card"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/login'
import { getToken } from '@/utils/auth'
import { validatetoid } from '@/utils/validate'
import { patchprofile, patchprofilepswd } from '@/api/profile/patchprofile'
import axios from 'axios'
export default {
  name: 'CProfileEdit',
  data() {
    const _validatetoid = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('ToID 不得為空'))
      } else if (!validatetoid(value)) {
        callback(new Error('ToID 只能有大小寫英數'))
      } else if (value.length !== 8) {
        callback(new Error('ToID 只限定於 8 碼'))
      } else {
        callback()
      }
    }
    const validatename = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('姓名 不得為空'))
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
      if (value === '' && this.profile_edit_form.pswd.length < 1) {
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
      bfupload: true,
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
        name: [{ required: false, trigger: 'change', validator: validatename }],
        toid: [
          { required: false, trigger: 'change', validator: _validatetoid }
        ],
        pswd: [
          { required: false, trigger: 'change', validator: validatePassword }
        ],
        pswd2: [
          { required: false, trigger: 'change', validator: validatedoublepswd }
        ]
      },
      redirect: undefined,
      imageUrl: '',
      fileList: [],
      file: ''
    }
  },
  computed: {
    uploadDisabled: function() {
      return this.fileList.length > 0
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getinfo()
  },
  methods: {
    clean_name() {
      this.profile_edit_form.name = ''
    },
    clean_toid() {
      this.profile_edit_form.toid = ''
    },
    getinfo() {
      getUserInfo(getToken()).then(response => {
        const info = response.data
        this.profile_edit_form.account = info.account
        this.profile_edit_form.name = info.name
        this.profile_edit_form.toid = info.toid
      })
    },
    /* 取消按鈕*/
    goprofile_view() {
      this.loadingprofile_view_cancal = true
      setTimeout(() => {
        setTimeout(() => {
          this.loadingprofile_view_cancal = false
          this.$router.push({ path: this.redirect || '/profile/profile-view' })
        }, 300)
      }, 150)
    },
    /* 修改確認按鈕*/
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
              .then(() => {
                if (this.file === '') {
                  const h = this.$createElement
                  this.$notify({
                    title: '送出成功',
                    message: h(
                      'b',
                      { style: 'color: teal' },
                      '你的個人資料已更新'
                    ),
                    type: 'success'
                  })
                  this.loadingsend = false
                  this.$router.push({
                    path: this.redirect || '/profile/profile-view'
                  })
                } else {
                  getUserInfo(getToken()).then(res => {
                    console.log(res.data)
                    const formData = new FormData()
                    formData.append('dbpicture', this.file.raw)

                    axios
                      .patch(
                        'https://www.177together.com/api/member/' +
                          res.data.id +
                          '/',
                        formData,
                        {
                          headers: {
                            Authorization: 'JWT ' + getToken(),
                            'Content-Type': 'multipart/form-data'
                          }
                        }
                      )
                      .then(() => {
                        const h = this.$createElement
                        this.$notify({
                          title: '送出成功',
                          message: h(
                            'b',
                            { style: 'color: teal' },
                            '你的個人資料已更新'
                          ),
                          type: 'success'
                        })
                        this.loadingsend = false
                        this.$router.push({
                          path: this.redirect || '/profile/profile-view'
                        })
                        location.reload()
                      })
                      .catch(() => {
                        console.log('FAILURE!!')
                      })
                  })
                }
              })
              .catch(error => {
                console.log(error.response)
                this.loadingsend = false
                if (error.response.data.toid !== '') {
                  const h = this.$createElement
                  this.$notify.error({
                    title: '送出失敗',
                    message: h(
                      'b',
                      { style: 'color: teal' },
                      '你的ToID已經被使用過，請再重新輸入一次！(3秒後幫你刷空資料)'
                    )
                  })
                  setTimeout(() => {
                    location.reload()
                  }, 3000)
                } else {
                  const h = this.$createElement
                  this.$notify.error({
                    title: '註冊失敗',
                    message: h(
                      'b',
                      { style: 'color: red' },
                      '發生了一點錯誤，請在試一次，如果一直發生請與我們聯繫，造成您的不良體驗，實在非常抱歉！ 5秒自動幫你跳轉'
                    ),
                    position: 'top-left',
                    showClose: false
                  })
                  setTimeout(() => {
                    location.reload()
                  }, 5000)
                }
              })
          })
        }
      })
    },
    changeUpload: function(file, fileList) {
      this.file = file
      console.log(this.file.raw)
      this.fileList = fileList
      this.$nextTick(() => {
        const upload_list_li = document.getElementsByClassName(
          'el-upload-list'
        )[0].children
        for (let i = 0; i < upload_list_li.length; i++) {
          const li_a = upload_list_li[i]
          const imgElement = document.createElement('img')
          imgElement.setAttribute('src', fileList[i].url)
          imgElement.setAttribute('style', 'max-width:50%;padding-left:25%')
          if (li_a.lastElementChild.nodeName !== 'IMG') {
            li_a.appendChild(imgElement)
          }
        }
      })
    },
    patchpicture() {
      if (this.file === '') {
        console.log()
      } else {
        getUserInfo(getToken()).then(res => {
          console.log(res.data)
          const formData = new FormData()
          formData.append('dbpicture', this.file.raw)

          axios
            .patch(
              'https://www.177together.com/api/member/' + res.data.id + '/',
              formData,
              {
                headers: {
                  Authorization: 'JWT ' + getToken(),
                  'Content-Type': 'multipart/form-data'
                }
              }
            )
            .catch(() => {
              console.log('FAILURE!!')
            })
        })
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
.disabled .el-upload--picture-card {
  display: none;
}
.disabled .el-icon-delete {
  display: none;
}
.personal_edit_form {
  width: 60%;
  margin: 15vh 18vw;
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
.personal_edit {
  font-size: 0;
}
.personal_edit label {
  width: 90px;
  color: #99a9bf;
  font-size: 0.8vw;
}
.personal_edit input {
  font-family: "Microsoft JhengHei";
  width: 18vw;
}
.personal_edit textarea {
  font-family: "Microsoft JhengHei";
  border: 0;
  width: 18vw;
  padding-top: 0.65rem;
}
.personal_edit .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 100%;
}
.upload {
  position: absolute;
  margin-top: -35vh;
  margin-left: 40%;
}
</style>
