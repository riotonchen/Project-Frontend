<template>
  <div class="personal_container">
    <title>
      {{ $t('route.c_profile_view') }}
    </title>
    <div class="card_info">
      <!--個人資料檢視-->
      <el-card body-style="padding:3.125rem">
        <el-row>
          <el-col
            :xs="24"
            :sm="12"
            :lg="12"
          >
            <el-form
              :model="infoform"
              label-position="left"
              inline
              class="personal_view"
            >
              <el-form-item :label="$t('c_profile_view.email')">
                <el-input
                  v-model="infoform.useraccount"
                  type="textarea"
                  autosize
                  readonly
                />
              </el-form-item>
              <el-form-item
                :label="$t('c_profile_view.name')"
                class="label2"
              >
                <el-input
                  v-model="infoform.username"
                  type="text"
                  readonly
                />
              </el-form-item>
              <el-form-item
                label="ToID"
                class="label3"
              >
                <el-input
                  v-model="infoform.usertoid"
                  type="text"
                  readonly
                />
              </el-form-item>
            </el-form>
          </el-col>
          <el-col
            :sm="12"
            :lg="12"
            class="hidden-sm-and-down"
          >
            <div>
              <img
                :src="userinfo_picture"
                class="userpicture"
              >
            </div>
          </el-col>
        </el-row>

        <el-button
          :loading="loadingprofile_edit"
          type="primary"
          class="btn"
          @click.native.prevent="goprofile_edit"
        >
          {{ $t('c_profile_view.alter') }}
        </el-button>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/login'
import { getToken } from '@/utils/auth'
import store from '@/store'
export default {
  data() {
    return {
      labelPosition: 'right',
      loadingprofile_edit: false,
      infoform: {
        useraccount: '',
        username: '',
        usertoid: ''
      },
      userinfo_picture: ''
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
      this.userinfo_picture = store.getters.dbpicture
    },
    /* 點擊修改按鈕*/
    goprofile_edit() {
      this.loadingprofile_edit = true /* 載入個人資料修改頁面*/
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
.card_info {
  width: 60%;
  margin: 15vh 19vw;
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
  width: 100vw;
}
.personal_view textarea {
  font-family: "Microsoft JhengHei";
  border: 0;
  width: 100vw;
  padding-top: 1.25rem;
}
.personal_view .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 100%;
}
.userpicture {
  position: absolute;
  border-radius: 20px;
  margin-left: 1.5vw;
  margin-top: 1.5vw;
  height: 16rem;
  width: 16rem;
}
</style>

