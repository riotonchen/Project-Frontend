<template>
  <div>
    <title>
      <%= htmlWebpackPlugin.options.title %>
    </title>
    <!--
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <router-view/>
      -->
    <el-row :gutter="1" class="header">
      <el-col :xs="3" :sm="1" :md="1" :lg="1" :xl="1">
        <div class="grid-content">
          <el-button type="text" plain>
            <a href="signup.html">註冊</a>
          </el-button>
        </div>
      </el-col>
      <el-col :xs="3" :sm="1" :md="1" :lg="1" :xl="1">
        <div class="grid-content">
          <el-button type="text" plain>
            <a href="login.html">登入</a>
          </el-button>
        </div>
      </el-col>
    </el-row>
    <div class="body">
      <div class="title title1">
        <p>
          177 一起記
        </p>
      </div>
      <div class="title title2">
        <p>
          記帳
        </p>
      </div>
      <div class="title title3">
        不只是你一個人的事
      </div>
    </div>
  </div>
</template>

<style lang="less">
@font-face {
  font-family: SentryTEA;
  src: url("../../assets/fonts/SentyTEA.ttf");
}
body {
  background: url("../../assets/images/background.png") no-repeat fixed;
  background-size: cover;
  font-family: Microsoft JhengHei;
}
a {
  text-decoration: none;
  font-size: 2vmin;
  font-family: Microsoft JhengHei;
  color: #9d9d9d;
}
.router-link-active {
  //.router-link-active 指定
  color: black;
  background: #fff;
}
.grid-content {
  text-align: center;
}
.header {
  //background-color: antiquewhite;
}
.body {
  //background-color: antiquewhite;
  height: 90vh;
  margin-top: -8.5vh;
}
.title {
  //background-color: #9d9d9d;
  text-align: center;
  color: #7d7d7d;
  font-family: SentryTEA;
}
.title1 {
  font-size: 11vmin;
  width: 22vw;
  margin-left: 6vw;
  margin-top: 20vh;
  z-index: 1;
}
.title2 {
  width: 7vw;
  font-size: 8vmin;
  margin-top: -6vh;
  margin-left: 9vw;
  z-index: 2;
}
.title3 {
  width: 18vw;
  font-size: 4.2vmin;
  margin-top: -14.3vh;
  margin-left: 15.5vw;
  z-index: 3;
}
</style>
