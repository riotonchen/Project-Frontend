<template>
  <div class="b1">
    <title>
      登入2
    </title>
    <div class="title">
    <b class="txt1">177&nbsp;一起記</b></div>
    <div class="ipt1">
      <el-input v-model="input" placeholder="E-mail" />
    </div>
    <div class="ipt2">
      <el-input v-model="input" placeholder="Passward" />
    </div>
    <div class="btn3">
      <el-button type="primary " @click="onSubmit ">登入</el-button>
    </div>
    <div class="txt2">
      <p>或用其他登入:</p>
    </div>
    <el-row class="g" type="flex">

      <el-col :span="12">
        <img src="../../assets/images/google-plus.svg" class="b3-gplus">
      </el-col>
      <el-col :span="12">
        <img src="../../assets/images/facebook-c.svg" class="b3-fb">
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="9" :sm="9" :md="9" :lg="10" :xl="9">
        <div class="signup">
          <router-link to="/signup">
            註冊
          </router-link>
        </div>
      </el-col>
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <div class="login">
          <router-link to="/login">
            忘記密碼
          </router-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style>
.title {
  width: 200vmax;

  padding-right: 1.5vmax;
  padding-left: 1.5vmax;
  padding-top: 2.5vmax;
  padding-bottom: 1vmax;
}
.txt1 {
  font-size: 3.5rem;

  padding-top: 0.5rem;
}
.b1 {
  background: url("../../assets/images/watercolor.svg") no-repeat;
  -moz-background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 48.85vmax;
  font-family: "Microsoft JhengHei";
  position: relative;
  width: 200vmin;

  padding-left: 40vmax;
  padding-right: 25vmax;
  padding-top: 7vmax;
}
.b3-gplus {
  width: 6vmax;
  height: 6vmax;
  padding-right: 1vmax;
  padding-top: 2.5vmax;
}
.b3-fb {
  width: 6vmax;
  height: 6vmax;
  padding-right: 1vmax;
  padding-top: 2.5vmax;
}
.ipt1 {
  padding-right: 1.5vmax;
  padding-left: 1.5vmax;
  padding-top: 2.5vmax;
  padding-bottom: 1vmax;
}
.ipt2 {
  padding-right: 1.5vmax;
  padding-left: 1.5vmax;
  padding-top: 2.5vmax;
  padding-bottom: 1vmax;
}
.btn3 {
  padding-right: 1.5vmax;
  padding-left: 1.5vmax;
  padding-top: 2.5vmax;
}
.txt2 {
  padding-right: 1.5vmax;
  padding-left: 1.5vmax;
  padding-top: 2.5vmax;
}
.g {
  padding-right: 1.5vmax;
  padding-left: 1.5vmax;
  padding-top: 0.5vmax;
  padding-bottom: 1vmax;
}
.signup {
  text-align: right;
  font-size: 0.5rem;
  padding-top: 0.5rem;
}
.login {
  text-align: left;
  font-size: 0.5rem;
  padding-left: 0.5vmax;
  padding-top: 0.5rem;
}
</style>
