<template>
  <div class="fake_body">
    <div class="title">
      <span>尚未驗證信箱</span><br><span>快去信箱收信!!!</span>
    </div>
    <div class="loader">
      <span />
      <span />
      <span />
      <span />
    </div>
  </div>
</template>

<script>
import { removeToken } from '@/utils/auth'
export default {
  data() {
    return {
      user_hash: '',
      redirect: undefined
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
    this.cleantoken()
  },
  methods: {
    cleantoken() {
      removeToken()
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
    width: 30rem;
    height: 30rem;
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
    font-size: 3rem;
    text-align: center;
    position: absolute;
    margin-top: -3vh;
  }
  .logo {
    position: absolute;
    .logobtn {
      background-color: rgba(0, 0, 0, 0);
      border: 0;
      img {
        width: 9.375rem;
        margin-top: 4vh;
      }
    }
  }
  .check_input {
    position: absolute;
  }
}
</style>

