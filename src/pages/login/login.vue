<template>
    <div>
        <title>
            <%= htmlWebpackPlugin.options.title %>
        </title>
        <h1>我是登入頁</h1>
        <div class="title">
            <p>177 一起記</p>
        </div>
        <div class="email">
            <el-input v-model="input" placeholder="e-mail"></el-input>
        </div>
        <div class="password">
            <el-input v-model="input" placeholder="password"></el-input>
        </div>
        <div>
            <el-button type="text" plain>
                建立帳戶
            </el-button>
        </div>
        <div class="button1">
            <el-button type="text" plain>
                忘記密碼
            </el-button>
        </div>
        <div class="button2">
            <el-row :type="flex" class="row-bg" justify="space-between">
                <el-col :span="6">
                    <button type="button" class="facebook"><img src="../../assets/images/computer.png" /></button>
                </el-col>
                <!--
                <el-col :span="6">
                    <div class="login"></div>
                </el-col>
                <el-button>
                    <a href=""><img src="../../assets/images/login.svg" width="50vmin" height="50vmin"></a>
                </el-button>
                <el-col :span="6">
                    <div class="gooleglus"></div>
                </el-col>
                <el-button>
                    <a href=""><img src="../../assets/images/google plus.svg" width="50vmin" height="50vmin"></a>
                </el-button>
                -->
            </el-row>
        </div>
    </div>
</template>

<style lang="less">
.signup {
  font-size: 50px;
}
body {
  //background: url("../../assets/images/background.png") no-repeat fixed;
  background-size: cover;
  font-family: Microsoft JhengHei;
  text-align: center;
}
.title {
  font-size: 5vmin;
  margin-left: 40vmin;
  margin-top: 2vmin;
}
.email {
  margin-left: 110vmin;
  margin-right: 50vmin;
  margin-top: 6vmin;
}
.password {
  margin-left: 110vmin;
  margin-right: 50vmin;
  margin-top: 6.001vmin;
}
.facebook {
  margin-left: 130vmin;
  margin-top: 7vmin;
  background-color: rgba(93, 178, 235, 0.39);
}
img {
  width: 10vmin;
  height: 10vmin;
}
</style>
