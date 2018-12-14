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
import { removeToken } from '@/utils/auth';
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
  background: rgba(0, 0, 0, 1);
  .loader {
    position: relative;
    width: 60vh;
    height: 60vh;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 0 30px rgba(73, 86, 216, 0.7),
      0 0 30px rgba(73, 86, 216, 0.7) inset;
    animation: breath 0.7s ease-in-out 0s infinite alternate;
    //background: linear-gradient(#14ffe9, #ffcb3b, #d900ff);
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
      filter: blur(10px);
    }
    span:nth-child(3) {
      filter: blur(25px);
    }
    span:nth-child(4) {
      filter: blur(50px);
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

