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
        <el-upload
          :on-change="changeUpload"
          :auto-upload="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :file-list="fileList"
          :class="{disabled:uploadDisabled}"
          list-type="picture-card"
          action=""
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
import { formatdate_inc_time } from '@/utils/index';
import { postinformations } from '@/api/infomations/postinformations';
import { getToken } from '@/utils/auth';
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
        dismountedtime: ''
      },
      fileList: [],
      redirect: undefined
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
        console.log(new_date, old_date)
        if (new_date < this.b_activity_add.addedtime) {
          this.$message({
            message: '錯誤！結束日期不可小於開始日期',
            type: 'warning'
          })
          this.b_activity_add.dismountedtime = '';
        }
      }
    },
    deep: true
  },
  methods: {
    changeUpload: function(file, fileList) {
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
    send_data() {
      postinformations(
        getToken(),
        this.b_activity_add.name,
        this.b_activity_add.content,
        formatdate_inc_time(
          this.b_activity_add.addedtime,
          'yyyy-mm-dd HH:MM:ss.l'
        ),
        this.b_activity_add.dismountedtime,
        this.fileList
      )
        .then(res => {
          this.$notify({
            title: '成功',
            message: '活動送出成功，管理員會盡快審核您的活動，並散播給相關用戶',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push({ path: this.redirect || '/' })
          }, 3500)
        })
        .catch(() => {
          this.$notify.error({
            title: '错误',
            message: '發生了一點錯誤，請稍後再送出一次'
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

