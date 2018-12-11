<template>
  <div class="cheap">
    <title>
      {{ $t('route.b_activity_add') }}
    </title>

    <el-card class="box_card">

      <div class="table_container">
        <el-form
          :label-position="labelPosition"
          :model="b_activity_add"
          label-width="140px"
          inline
          class="table_activity_add"
        >

          <el-form-item
            :label="$t('b_activity_add.commodityname')"
            prop="name"
          >
            <el-input
              v-model="b_activity_add.name"
              class="activity_table"
            />
          </el-form-item>

          <el-form-item
            :label="$t('b_activity_add.content')"
            prop="content"
          >
            <el-input
              v-model="b_activity_add.content"
              :autosize="{ minRows: 3, maxRows:3}"
              type="textarea"
              resize="none"
              style="width: 15vw"
              class="activity_table"
            />
          </el-form-item>

          <el-form-item :label="$t('b_activity_add.timestart')">
            <el-date-picker
              v-model="b_activity_add.addedtime"
              :placeholder="$t('b_activity_add.date')"
              type="date"
              style="width:15vw;min-width:7.5rem;max-width:15rem;"
            />
          </el-form-item>

          <el-form-item :label="$t('b_activity_add.timestop')">
            <el-date-picker
              v-model="b_activity_add.dismountedtime"
              :placeholder="$t('b_activity_add.date')"
              type="date"
              style="width:15vw;min-width:7.5rem;max-width:15rem;"
            />
          </el-form-item>

        </el-form>
      </div>

      <div class="upload">
        <!--
        <label>File Preview
          <input
            id="file"
            ref="file"
            type="file"
            accept="image/*"
            @change="handleFileUpload()"
          >
        </label>
        <img
          v-show="showPreview"
          :src="imagePreview"
          style="height:100px;width:100px;"
        >
        -->
        <el-upload
          ref="upload"
          :on-change="changeUpload"
          :auto-upload="false"
          :file-list="fileList"
          :class="{disabled:uploadDisabled}"
          accept="image/jpeg,image/png"
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

      <div class="cheap_btn">
        <el-button
          type="primary "
          @click="send_data()"
        >{{ $t('b_activity_add.add') }}</el-button>
      </div>
    </el-card>

  </div>
</template>
<script>
import { formatdate_inc_time } from '@/utils/index'
import { postinformations } from '@/api/infomations/postinformations'
import { getToken } from '@/utils/auth'
import { getentprofile } from '@/api/ent-profile/getentprofile'
import { getUserInfo } from '@/api/login'
import axios from 'axios'

export default {
  data() {
    const validatename = (rule, value, callback) => {
      if (value === '' || value === null) {
        return callback(new Error('名稱不能為空'))
      } else if (value.length > 10) {
        callback(new Error('名稱不可以大於 10 個字'))
      } else {
        callback()
      }
    }
    const validatecontent = (rule, value, callback) => {
      if (value === '' || value === null) {
        return callback(new Error('內容不能為空'))
      } else if (value.length > 50) {
        callback(new Error('內容不可以大於 50 個字'))
      } else {
        callback()
      }
    }
    return {
      labelPosition: 'right',
      b_activity_add: {
        name: '',
        content: '',
        addedtime: '',
        dismountedtime: '',
        imgraw: ''
      },

      fileList: [],
      redirect: undefined,
      render: [],
      imageUrl: '',

      file: '',
      showPreview: false,
      imagePreview: ''
    }
  },
  computed: {
    uploadDisabled: function() {
      return this.fileList.length > 0
    }
  },
  watch: {
    'b_activity_add.dismountedtime': {
      handler: function(new_date, old_date) {
        if (new_date < this.b_activity_add.addedtime) {
          this.$message({
            message: '錯誤！結束日期不可小於開始日期',
            type: 'warning'
          })
          this.b_activity_add.dismountedtime = ''
        }
      }
    },
    deep: true
  },
  methods: {
    /*
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
      console.log(this.file)
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        function() {
          this.showPreview = true
          this.imagePreview = reader.result
        }.bind(this),
        false
      )
      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file)
        }
      }
    },
    */
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
    onUploadChange(file) {
      const isIMAGE =
        file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isIMAGE) {
        this.$message.error('只能上传jpg/png图片!')
        return false
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!')
        return false
      }
      var reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = function(e) {
        console.log(this.result) // 图片的base64数据
      }
    },
    send_data() {
      getUserInfo(getToken()).then(res => {
        getentprofile(getToken(), res.data.account).then(res => {
          const name = this.b_activity_add.name
          const content = this.b_activity_add.content
          const addedtime = this.b_activity_add.addedtime
          const dismountedtime = this.b_activity_add.dismountedtime
          const formData = new FormData()
          formData.append('store_id', res.data[0].store_id)
          formData.append('name', name)
          formData.append('content', content)
          formData.append('status', 0)
          formData.append(
            'starttime',
            formatdate_inc_time(addedtime, 'yyyy-mm-dd')
          )
          formData.append(
            'endtime',
            formatdate_inc_time(dismountedtime, 'yyyy-mm-dd')
          )
          formData.append('syncstatus', 2)
          formData.append('photo', this.file.raw)

          axios
            .post('https://www.177together.com/api/promotion/', formData, {
              headers: {
                Authorization: 'JWT ' + getToken(),
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(() => {
              this.$notify({
                title: '成功',
                message:
                  '活動送出成功，管理員會盡快審核您的活動，並散播給相關用戶',
                type: 'success'
              })

              setTimeout(() => {
                this.$router.push({ path: this.redirect || '/' })
              }, 3500)
            })
            .catch(() => {
              console.log('FAILURE!!')
            })
        })
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.disabled .el-upload--picture-card {
  display: none;
}
.disabled .el-icon-delete {
  display: none;
}

.cheap_btn {
  float: right;
  margin-right: 5%;
  margin-top: 2%;
}
.box_card {
  width: 80%;
  padding-bottom: 5%;
  margin: 12vh 10vw;
  position: relative;
}
.upload {
  position: absolute;
  margin-top: -25%;
  margin-left: 60%;
}
.table_activity_add {
  font-size: 0;
  padding-top: 5%;
}
.table_activity_add label {
  width: 90px;
  color: #99a9bf;
  font-size: 0.8vw;
}
.table_activity_add input {
  font-family: "Microsoft JhengHei";
  width: 100%;
}
.table_activity_add textarea {
  font-family: "Microsoft JhengHei";
  width: 100%;
  padding-top: 0.65rem;
}
.table_activity_add .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 100%;
}
</style>

