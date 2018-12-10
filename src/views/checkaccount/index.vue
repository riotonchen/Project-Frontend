<template>
  <div class="fake_body">

    <div class="loader">
      <span />
      <span />
      <span />
      <span />
    </div>
    <transition name="el-fade-in-linear">
      <div
        v-show="logobtn"
        class="title"
      >
        <div>
          <span>177 一起記</span>
          <br>
          <span>點擊LOGO 啟用帳號</span>
        </div>
        <div class="logo">
          <el-button
            class="logobtn"
            @click="check_account()"
          >
            <img src="../../assets/images/177.svg">
          </el-button>
        </div>
      </div>
    </transition>
    <div
      style="display:flex;"
      class="tik"
    >
      <transition name="el-zoom-in-center">
        <div v-show="text3">
          <span>3</span>
        </div>
      </transition>
      <transition name="el-zoom-in-center">
        <div v-show="text2">
          <span>2</span>
        </div>
      </transition>
      <transition name="el-zoom-in-center">
        <div v-show="text1">
          <span>1</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { Post_check_account } from '@/api/signup';
export default {
  data() {
    return {
      user_hash: '',
      redirect: undefined,
      logobtn: true,
      text3: false,
      text2: false,
      text1: false
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
    this.get_hash_code()
  },
  methods: {
    get_hash_code() {
      this.user_hash = this.$route.query.hash
      console.log(this.user_hash)
    },
    check_account() {
      Post_check_account(this.user_hash)
        .then(() => {
          this.$notify({
            title: '成功',
            message: '啟用帳號完成，過3秒幫你跳轉首頁',
            type: 'success',
            duration: 3000,
            showClose: false
          })
          this.text3 = true
          this.logobtn = false
          setTimeout(() => {
            this.text3 = false
            this.text2 = true
            setTimeout(() => {
              this.text2 = false
              this.text1 = true
              setTimeout(() => {
                this.$router.push({ path: this.redirect || '/home' })
              }, 500)
            }, 1000)
          }, 1000)
        })
        .catch(error => {
          console.log(error)
          return false
        })
    }
  }
}
</script>

<style lang="scss">
.fake_body {
  margin: 0%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #000;
  .loader {
    position: relative;
    width: 50vh;
    height: 50vh;
    border-radius: 50%;
    background: linear-gradient(#14ffe9, #ffcb3b, #d900ff);
    animation: animate 0.3s linear infinite;
    span {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: linear-gradient(#14ffe9, #ffcb3b, #d900ff);
    }
    span:nth-child(1) {
      filter: blur(5px);
    }
    span:nth-child(2) {
      filter: blur(10px);
    }
    span:nth-child(3) {
      filter: blur(25px);
    }
    span:nth-child(4) {
      filter: blur(50px);
    }
  }
  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loader:after {
    content: "";
    position: absolute;
    top: 1.5625rem;
    left: 1.5625rem;
    right: 1.5625rem;
    bottom: 1.5625rem;
    background: #000;
    border-radius: 50%;
  }

  .title {
    z-index: 9999;
    color: #ffcb3b;
    font-weight: bold;
    font-size: 1.25rem;
    text-align: center;
    position: absolute;
    margin-top: -14vh;
  }
  .logo {
    position: absolute;
    .logobtn {
      background-color: rgba(0, 0, 0, 0);
      border: 0;
      img {
        width: 9.375rem;
        margin-top: 4vh;
        margin-left: -0.5vh;
      }
    }
  }
  .check_input {
    position: absolute;
  }
  .tik {
    position: absolute;
    color: #fbff00;
    z-index: 9999;
    font-weight: 900;
    font-size: 30vh;
    text-align: center;
    //margin-left: 10px;
    margin-top: -14px;
  }
}
</style>

