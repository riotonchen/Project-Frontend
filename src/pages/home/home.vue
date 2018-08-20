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
    <el-row type="flex" class="row-bg" justify="end">
      <el-col :span="1">
        <div class="grid-content bg-purple">
          <el-button type="text" plain>
            <a href="signup.html">註冊</a>
          </el-button>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="grid-content bg-purple">
          <el-button type="text" plain>
            <a href="login.html">登入</a>
          </el-button>
        </div>
      </el-col>
    </el-row>
    <router-view/>
  </div>
</template>

<style lang="less">
body {
  background: url("../../assets/images/background.png") no-repeat fixed;
  background-size: cover;
  font-family: Microsoft JhengHei;
  text-align: center;
}

#app {
  /*
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  */
  text-align: center;
  color: #2c3e50;
}
/*
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
*/
a {
  text-decoration: none;
  font-size: 18px;
  font-family: Microsoft JhengHei;
  color: black;
}
.router-link-active {
  //.router-link-active 指定
  color: black;
  background: #fff;
}
.el-row {
  margin-bottom: 50px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: rgba(0, 0, 0, 0);
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  padding-right: 10px;
  background-color: rgba(0, 0, 0, 0);
}
</style>
