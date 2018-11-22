<template>
  <div class="errPage-container">

    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        <h2>你沒有權限進入此頁面</h2>
        <h6>如需要權限請找管理員處理</h6>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <router-link to="dashboard">回首頁</router-link>
          </li>
          <li class="link-type">
            <router-link to="home">回介紹頁</router-link>
          </li>
        </ul>
        <el-button icon="arrow-left" class="pan-back-btn" @click="back">返回上一頁</el-button>
      </el-col>
      <el-col :span="12" style="text-align : center;padding-top:3.75rem">
        <img :src="errGif" width="312" height="400" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'

export default {
  name: 'Page401',
  data() {
    return {
      errGif: errGif + '?' + +new Date()
    }
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/dashboard' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;

  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
    margin-top: 0.9375rem;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
    padding-top: 4vh;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
