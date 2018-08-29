<template>
    <div class="navbar-all">
        <div class="navbar-in">
            <el-row type="flex" justify="space-between">
                <el-col span="0.5">
                    <img src="../assets/images/logo.png" alt="LOGO">
                </el-col>
                <el-col span="3" pull="6">
                    <a href="/">177 一起記</a>
                </el-col>
                <el-col span="1" push="6">
                    <el-button plain type="text" class="btn signup">
                        <a href="signup.html"> 註冊 </a>
                    </el-button>
                </el-col>
                <el-col span="1">
                    <el-button plain type="text" class="btn login">
                        <a href="login.html"> 登入 </a>
                    </el-button>
                </el-col>
            </el-row>
            <hr size=3 color=#00ffff style="FILTER: alpha(opacity=100,finishopacity=0,style=3)">
        </div>
    </div>
</template>

<style lang="less" scoped>
.navbar-all {
  margin: auto;
  width: 80vmax;
}
.navbar-in {
  padding-top: 2vmin;
}
img {
  width: 5vmin;
  height: 5vmin;
}
a {
  font-size: 3.3vmin;
  text-align: center;
  color: aliceblue;
}
hr {
  width: 80vmax;
}
.btn {
  //background-color: rgba(0, 0, 0, 0);
  border: 0;
  font-family: Microsoft JhengHei;
  margin-top: -0.8vmin;
  //font-size: 3.3vmin;
}
</style>
