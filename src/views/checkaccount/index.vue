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
import { Post_check_account } from '@/api/signup'
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

<style lang="scss" scoped>
.fake_body {
  margin: 0%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgba(0, 0, 0, 1);
  .loader {
    position: relative;
    width: 60vh;
    height: 60vh;
    border-radius: 50%;
    cursor: pointer;
    //background: linear-gradient(#14ffe9, #ffcb3b, #d900ff);
    box-shadow: 0 0 30px rgba(73, 86, 216, 0.7),
      0 0 30px rgba(73, 86, 216, 0.7) inset;
    animation: breath 2.5s ease-in-out 0s infinite alternate;
    //animation: animate 0.3s linear infinite;
    span {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      //background: linear-gradient(#14ffe9, #ffcb3b, #d900ff);
    }
    /*
    span:nth-child(1) {
      filter: blur(5px);
    }
    span:nth-child(2) {
      filter: blur(5px);
    }
    span:nth-child(3) {
      filter: blur(5px);
    }
    span:nth-child(4) {
      filter: blur(5px);
    }
    */
  }
  /*
  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  */

  @keyframes breath {
    0% {
      opacity: 1;
      box-shadow: 0 0 90vw rgba(0, 225, 255, 0.9),
        0 0 12vw rgba(0, 225, 255, 0.7) inset;
    }
    50% {
      opacity: 0.6;
      border: 1px solid rgba(59, 58, 58, 0.1);
      box-shadow: 0 0 45vw rgba(163, 186, 251, 0.8),
        0 0 6vw rgba(0, 0, 0, 0.7) inset;
    }
    100% {
      opacity: 1;
      box-shadow: 0 0 90vw rgba(0, 225, 255, 0.9),
        0 0 12vw rgba(0, 225, 255, 0.7) inset;
    }
  }

  .loader:after {
    opacity: 0.5;
    content: "";
    position: absolute;
    top: 0rem;
    left: 0rem;
    right: 0rem;
    bottom: 0rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
  }

  .title {
    z-index: 9999;
    color: #ffcb3b;
    font-weight: bold;
    font-size: 1.8rem;
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
        width: 10rem;
        margin-top: 4vh;
        margin-left: 4vh;
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
