<template>
  <div>
    <div class="bg1">
      <el-row class="header">
        <title>
          <%= htmlWebpackPlugin.options.title %>
        </title>
        <el-row :gutter="1" class="signupin">
          <el-col :xs="2" :sm="1" :md="1" :lg="1" :xl="1">
            <div class="grid-content">
              <el-button type="text" plain>
                <a href="signup.html">註冊</a>
              </el-button>
            </div>
          </el-col>
          <el-col :xs="2" :sm="1" :md="1" :lg="1" :xl="1">
            <div class="grid-content">
              <el-button type="text" plain>
                <a href="login.html">登入</a>
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="body1">
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
          <p>
            不只是你一個人的事
          </p>
        </div>
        <div class="title title4">
          <div class="t1">
            最齊全的 記帳
          </div>
          <div class="t2">
            APP
          </div>
          <div class="t3">
            在此登場
          </div>
        </div>
      </el-row>
    </div>
    <el-row>
      <div class="carousel-bg">
        <el-carousel class="carousel" height="30vmax">
          <el-carousel-item>
            <div class="car-item-div1">
              <el-row>
                <el-col :span="12" class="carousel-ad1">
                  <img class="img1" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNDY0IDQ2NCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48cGF0aCBkPSJtNDQwIDE1MmgxNnYtMTA0YzAtOC44MzU5MzgtNy4xNjQwNjItMTYtMTYtMTZoLTI0djE2aDI0em0wIDAiIGZpbGw9IiMxY2M4ZWIiLz48cGF0aCBkPSJtODAgMGgyMzJjNC40MTc5NjkgMCA4IDMuNTgyMDMxIDggOHY0NDhjMCA0LjQxNzk2OS0zLjU4MjAzMSA4LTggOGgtMzA0Yy00LjQxNzk2OSAwLTgtMy41ODIwMzEtOC04di0zNzZ6bTAgMCIgZmlsbD0iI2M5ZGZmZiIvPjxwYXRoIGQ9Im01NiAzMDRoMTYwdjQwaC0xNjB6bTAgMCIgZmlsbD0iI2YwYmU1OSIvPjxwYXRoIGQ9Im0zMiAzNDRoMTYwdjQwaC0xNjB6bTAgMCIgZmlsbD0iI2ZmYjQxZiIvPjxwYXRoIGQ9Im01NiAzODRoMTYwdjQwaC0xNjB6bTAgMCIgZmlsbD0iI2YwYmU1OSIvPjxwYXRoIGQ9Im0zMiA0MjRoMTYwdjQwaC0xNjB6bTAgMCIgZmlsbD0iI2ZmYjQxZiIvPjxwYXRoIGQ9Im0zNjggOHYyNGgzMnYtMjRjMC00LjQxNzk2OS0zLjU4MjAzMS04LTgtOGgtMTZjLTQuNDE3OTY5IDAtOCAzLjU4MjAzMS04IDh6bTAgMCIgZmlsbD0iIzFjYzhlYiIvPjxwYXRoIGQ9Im04MCA3MnYtNzJsLTgwIDgwaDcyYzQuNDE3OTY5IDAgOC0zLjU4MjAzMSA4LTh6bTAgMCIgZmlsbD0iIzFjYzhlYiIvPjxwYXRoIGQ9Im0yNDAgMjMyYzAgMzkuNzY1NjI1LTMyLjIzNDM3NSA3Mi03MiA3MnMtNzItMzIuMjM0Mzc1LTcyLTcyIDMyLjIzNDM3NS03MiA3Mi03MiA3MiAzMi4yMzQzNzUgNzIgNzJ6bTAgMCIgZmlsbD0iI2ZmYjQxZiIvPjxwYXRoIGQ9Im0zNjAgMzJoNTZ2MTYwaC02NHYtMTUyYzAtNC40MTc5NjkgMy41ODIwMzEtOCA4LTh6bTAgMCIgZmlsbD0iI2M5ZGZmZiIvPjxwYXRoIGQ9Im0xOTIuMTgzNTk0IDE2NC4yNDYwOTRjMzAuMjA3MDMxIDIwLjIxNDg0NCA0MC41OTM3NSA1OS43ODEyNSAyNC4yMTQ4NDQgOTIuMjI2NTYyLTE2LjM3ODkwNyAzMi40NDUzMTMtNTQuMzgyODEzIDQ3LjU4MjAzMi04OC41ODIwMzIgMzUuMjgxMjUgMjMuMTI1IDE1LjY0ODQzOCA1My4yMTA5MzggMTYuNTE5NTMyIDc3LjIwMzEyNSAyLjIzNDM3NSAyMy45ODgyODEtMTQuMjg5MDYyIDM3LjU1NDY4OC00MS4xNjAxNTYgMzQuODA0Njg4LTY4Ljk0OTIxOS0yLjc0NjA5NC0yNy43ODkwNjItMjEuMzE2NDA3LTUxLjQ4MDQ2OC00Ny42NDA2MjUtNjAuNzkyOTY4em0wIDAiIGZpbGw9IiNkNDk1MWEiLz48cGF0aCBkPSJtMTc2IDE4NGgtMTZ2OS40NzI2NTZjLTExLjAxMTcxOSAzLjg3ODkwNi0xNy42MjEwOTQgMTUuMTMyODEzLTE1LjY0NDUzMSAyNi42NDA2MjUgMS45ODA0NjkgMTEuNTA3ODEzIDExLjk2ODc1IDE5LjkxMDE1NyAyMy42NDQ1MzEgMTkuODg2NzE5IDQuNDE3OTY5IDAgOCAzLjU4MjAzMSA4IDhzLTMuNTgyMDMxIDgtOCA4aC0yNHYxNmgxNnY4aDE2di05LjQ3MjY1NmMxMS4wMTE3MTktMy44Nzg5MDYgMTcuNjIxMDk0LTE1LjEzMjgxMyAxNS42NDQ1MzEtMjYuNjQwNjI1LTEuOTgwNDY5LTExLjUwNzgxMy0xMS45Njg3NS0xOS45MTAxNTctMjMuNjQ0NTMxLTE5Ljg4NjcxOS00LjQxNzk2OSAwLTgtMy41ODIwMzEtOC04czMuNTgyMDMxLTggOC04aDI0di0xNmgtMTZ6bTAgMCIgZmlsbD0iI2YwY2Y4ZSIvPjxwYXRoIGQ9Im0xMjAgNTZoMTIwYzQuNDE3OTY5IDAgOCAzLjU4MjAzMSA4IDhzLTMuNTgyMDMxIDgtOCA4aC0xMjBjLTQuNDE3OTY5IDAtOC0zLjU4MjAzMS04LThzMy41ODIwMzEtOCA4LTh6bTAgMCIgZmlsbD0iIzhjOGM4YyIvPjxwYXRoIGQ9Im0zMiAxMDRoMjU2YzQuNDE3OTY5IDAgOCAzLjU4MjAzMSA4IDhzLTMuNTgyMDMxIDgtOCA4aC0yNTZjLTQuNDE3OTY5IDAtOC0zLjU4MjAzMS04LThzMy41ODIwMzEtOCA4LTh6bTAgMCIgZmlsbD0iIzhjOGM4YyIvPjxwYXRoIGQ9Im0zMiAxMzZoODBjNC40MTc5NjkgMCA4IDMuNTgyMDMxIDggOHMtMy41ODIwMzEgOC04IDhoLTgwYy00LjQxNzk2OSAwLTgtMy41ODIwMzEtOC04czMuNTgyMDMxLTggOC04em0wIDAiIGZpbGw9IiM4YzhjOGMiLz48cGF0aCBkPSJtMjMyIDEzNmg1NmM0LjQxNzk2OSAwIDggMy41ODIwMzEgOCA4cy0zLjU4MjAzMSA4LTggOGgtNTZjLTQuNDE3OTY5IDAtOC0zLjU4MjAzMS04LThzMy41ODIwMzEtOCA4LTh6bTAgMCIgZmlsbD0iIzhjOGM4YyIvPjxwYXRoIGQ9Im0zMjAgMTkyaC00M2MtOS4zOTA2MjUtLjAwMzkwNi0xNy4wMDM5MDYgNy42MDkzNzUtMTcgMTd2MjM4Yy0uMDAzOTA2IDkuMzkwNjI1IDcuNjA5Mzc1IDE3LjAwMzkwNiAxNyAxN2g0M3ptMCAwIiBmaWxsPSIjYmJjZmVkIi8+PHBhdGggZD0ibTQ0OCAyMDhoLTE2MGMtOC44MzU5MzggMC0xNiA3LjE2NDA2Mi0xNiAxNnYyMjRjMCA4LjgzNTkzOCA3LjE2NDA2MiAxNiAxNiAxNmgxNjBjOC44MzU5MzggMCAxNi03LjE2NDA2MiAxNi0xNnYtMjI0YzAtOC44MzU5MzgtNy4xNjQwNjItMTYtMTYtMTZ6bS0xNDQgMzJoMTI4djMyaC0xMjh6bTAgMCIgZmlsbD0iI2ViZWJlYiIvPjxwYXRoIGQ9Im0zMDQgMjQwaDEyOHYzMmgtMTI4em0wIDAiIGZpbGw9IiMxY2M4ZWIiLz48cGF0aCBkPSJtNDY0IDI5NmgtMTkydjE2aDg4djY0aC04OHYxNmg4OHY3MmgxNnYtNzJoODh2LTE2aC04OHYtNjRoODh6bTAgMCIgZmlsbD0iI2ZmYjQxZiIvPjxnIGZpbGw9IiM4YzhjOGMiPjxwYXRoIGQ9Im0zMTIgMzIwdjE2aC0xNnYxNmgxNnYxNmgxNnYtMTZoMTZ2LTE2aC0xNnYtMTZ6bTAgMCIvPjxwYXRoIGQ9Im0zOTIgMzM2aDQ4djE2aC00OHptMCAwIi8+PHBhdGggZD0ibTMzMS4zMTI1IDQwMi4zNDM3NS0xMS4zMTI1IDExLjMxMjUtMTEuMzEyNS0xMS4zMTI1LTExLjMxMjUgMTEuMzEyNSAxMS4zMTI1IDExLjMxMjUtMTEuMzEyNSAxMS4zMTI1IDExLjMxMjUgMTEuMzEyNSAxMS4zMTI1LTExLjMxMjUgMTEuMzEyNSAxMS4zMTI1IDExLjMxMjUtMTEuMzEyNS0xMS4zMTI1LTExLjMxMjUgMTEuMzEyNS0xMS4zMTI1em0wIDAiLz48cGF0aCBkPSJtMzkyIDQxNmg0OHYxNmgtNDh6bTAgMCIvPjxwYXRoIGQ9Im00MDggNDM2aDE2djhoLTE2em0wIDAiLz48cGF0aCBkPSJtNDA4IDQwNGgxNnY4aC0xNnptMCAwIi8+PC9nPjwvc3ZnPgo=" /> </el-col>
                <el-col :span="12" class="carousel-ad2">
                  <p>2</p>
                </el-col>
              </el-row>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-row>
  </div>
</template>

<style lang="less">
@font-face {
  font-family: SentryTEA;
  src: url("../../assets/fonts/SentyTEA.ttf") format("woff2");
}
/*
@font-face {
  font-family: freescpt;
  src: url("../../assets/fonts/FREESCPT.TTF") format("woff2");
}
*/
@font-face {
  font-family: "Noto Sans TC";
  src: url(//fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Light.woff2)
    format("woff2");
}
body {
  //background: url("../../assets/images/background.png") no-repeat fixed;
  font-family: Microsoft JhengHei;
  margin: 0vmin;
  padding: 0vmin;
}
a {
  text-decoration: none;
  font-size: 2vmin;
  font-family: "Noto Sans TC";
  color: #9d9d9d;
}
.header > .signupin {
  //background-color: aqua;
  padding-top: 1vmin;
  padding-left: 2vmin;
}
.body1 {
  //background-color: red;
}
.footer {
  //background-color: blueviolet;
}
.bg1 {
  background: url("../../assets/images/background-right.png") no-repeat;
  //background-position-x: 100%;
  //background-position-y: 0%;
  width: 100vmin;
}
.title {
  //background-color: red;
  text-align: center;
  color: #7d7d7d;
  font-family: SentryTEA;
}
.title1 {
  //background-color: #9d9d9d;
  font-size: 15vmin;
  width: 74vmin;
  margin-left: 5vmin;
  margin-top: -3.5vmin;
}
.title2 {
  //background-color: #000000;
  width: 20vmin;
  font-size: 8vmin;
  margin-top: -13vmin;
  margin-left: 15vmin;
}
.title3 {
  //background-color: #9d9d9d;
  width: 55vmin;
  font-size: 4.5vmin;
  margin-top: -14vmin;
  margin-left: 25vmin;
}
.title4 {
  //background-color: #9d9d9d;
  font-size: 4.5vmin;
  width: 80vmin;
  margin-top: 5vmin;
  margin-left: 5vmin;
}
.title4 > .t1 {
  margin-left: -14vmin;
  margin-top: -3.3vmin;
}
.title4 > .t2 {
  //font-family: freescpt;
  margin-left: 20vmin;
  margin-top: -4.9vmin;
}
.title4 > .t3 {
  margin-left: 47vmin;
  margin-top: -5.9vmin;
}
.carousel-bg {
  text-align: center;
  //background-color: aquamarine;
  width: 80vmax;
  margin: 22vmax auto 22vmax auto;
}
.car-item-div1 {
}
.carousel-ad1 {
  //background-color: #7d7d7d;
  margin-top: 15vmin;
}
.carousel-ad1 > .img1 {
  height: 40vmin;
  width: 40vmin;
}
.img1 {
  padding-left: 25vmin;
}
</style>
