<template>
  <div class="app-container">
    <title>
      {{ $t('route.a_profile_view') }}
    </title>
    <div>
      <el-card
        body-style="padding:3.125rem"
        class="a_admin_info"
      >
        <el-form
          :model="infoform"
          label-position="left"
          inline
          class="personal_view"
        >
          <el-form-item :label="$t('a_profile_view.email')">
            <el-input
              v-model="infoform.useraccount"
              type="textarea"
              autosize
              readonly
            />
          </el-form-item>
          <el-form-item
            :label="$t('a_profile_view.name')"
            class="label2"
          >
            <el-input
              v-model="infoform.username"
              type="text"
              readonly
            />
          </el-form-item>
          <el-form-item
            label="加入日期"
            class="label3"
          >
            <el-input
              v-model="infoform.userjoin"
              type="text"
              readonly
            />
          </el-form-item>

          <el-button
            :loading="loadingprofile_edit"
            type="primary"
            class="btn"
            @click.native.prevent="goprofile_edit"
          >
            {{ $t('a_profile_view.alter') }}
          </el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/login';
import { getToken } from '@/utils/auth';
import { formatdate_inc_time } from '@/utils/index';

export default {
  name: 'AProfileView',
  data() {
    return {
      labelPosition: 'right',
      loadingprofile_edit: false,
      infoform: {
        useraccount: '',
        username: '',
        userjoin: ''
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
        this.infoform.userjoin = formatdate_inc_time(
          info.date_joined,
          'yyyy-mm-dd HH:MM:ss'
        )
      })
    },
    goprofile_edit() {
      this.loadingprofile_edit = true
      setTimeout(() => {
        setTimeout(() => {
          this.loadingprofile_edit = false
          this.$router.push({
            path: this.redirect || '/profile/admin-profile-edit'
          })
        }, 300)
      }, 150)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
.a_admin_info {
  width: 70%;
  margin: 15vh 13vw;
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
  width: 100%;
}
</style>

